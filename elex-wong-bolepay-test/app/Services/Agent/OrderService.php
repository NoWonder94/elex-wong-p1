<?php
namespace App\Services\Agent;

use App\Models\Agent\Order;
use App\Models\Agent\OrderFeeOld;
use App\Models\Agent\OrderNotify;
use App\Models\Agent\OrderFinish;
use App\Services\System\AgentService;
use App\Services\System\AddressLogService;
use App\Services\System\AddressService;
use App\Traits\AgentTrait;
use App\Utils\Calc;
use Time, Http, Helper;

class OrderService extends EloquentService {
    use AgentTrait;

    public function getBySn($sn) {
        return Order::where('sn', $sn)->first();
    }

    public function getOrderBySn($sn) {
        return Order::where('sn', $sn)->disableQueryBigDB()->first();
    }

    public function pay($sn, float $money, $dataClosure = null, $preClosure = null, $successClosure = null,$from_address = '',$hash = '') {
        $order = Order::where('sn', $sn)->where('pay_time', 0);
        $connection = $order->getConnection();
        $connection->beginTransaction();
        try{
            //锁定存款数据
            $order = $order->lockForUpdate()->first();
            if (!$order) {
                return;
            }

            $is_finish = false;
            if ($preClosure instanceof \Closure) {
                call_user_func_array($preClosure, [&$order, &$money, &$is_finish]);
            }

            if ($money <= 0) {
                $this->throwException('common.order.money_insufficient');
            }

            $order->pay_money = $money;
            if ($order->pay_time == 0) {
                $order->pay_time = UTC_TIME;
            }
            $order->status = 1;
            $order->finish_status = 1;

            if ($order->service_rate > 0) {
                $service_fee        = Calc::div(Calc::mul($money, $order->service_rate, 2), 100, 2);
                $order->service_fee = $service_fee;
                $order->agent_money = Calc::sub($money, $service_fee, 2);
            } else {
                $order->agent_money = $money;
            }

            if ($is_finish) {
                $order->finish_time   = UTC_TIME;
                $order->finish_status = 2;
            } else {
                switch ($order->finish_type) {
                    case 1:
                        $order->finish_time   = UTC_TIME;
                        $order->finish_status = 2;
                        break;

                    case 2:
                        $order->finish_time = UTC_TIME + 86400;
                        break;

                    case 3:
                        $week = Time::getWeek();
                        if($week >= 5){
                            $order->finish_time = UTC_TIME + 86400 * (8 - $week);
                        }else{
                            $order->finish_time = UTC_TIME + 86400;
                        }
                        break;
                }
            }

            //$order->finish_next_time = $order->finish_time;

            if ($dataClosure instanceof \Closure) {
                call_user_func_array($dataClosure, [&$order]);
            }

            $result = $order->save();
            if ($result > 0) {
                $agent = AgentService::instance()->getCacheById($order->agent_id);
                $this->updateByOrderPay($agent, $order);
                $this->updateAgentFees($sn);
                if((int)$order->address_id > 0){
                    AddressLogService::instance()->created('USDT',$from_address,$order->address_id,$order->address,$hash,$order->address_amount,$order->sn,'order');
                    AddressService::instance()->updateIncome($order->address, $order->address_amount);
                }
                if ($successClosure instanceof \Closure) {
                    call_user_func_array($successClosure, [$order]);
                }

                $orderNotify = new OrderNotify;
                $orderNotify->id = $order->id;
                $orderNotify->order_sn = $order->sn;
                $orderNotify->notify_status = 1;
                $orderNotify->notify_num = 1;
                $orderNotify->notify_time = UTC_TIME;
                $orderNotify->notify_next_time = UTC_TIME + 10;
                $orderNotify->save();

                if ($order->finish_status == 1) {
                    $orderFinish = new OrderFinish;
                    $orderFinish->id = $order->id;
                    $orderFinish->order_sn = $order->sn;
                    $orderFinish->finish_status = 0;
                    $orderFinish->finish_num = 0;
                    $orderFinish->finish_time = 0;
                    $orderFinish->finish_next_time = $order->finish_time;
                    $orderFinish->save();
                }
            }
            $connection->commit();
        } catch(\Exception $e){
            $connection->rollback();
            throw $e;
        }

        if ($result > 0) {
            Http::ansync(Helper::urlByPlatform('system', 'callback#Order/notify', ['sn' => $sn]));
        }
    }

    public function test($sn, $preClosure = null) {

        $order = Order::where('sn', $sn)->where('pay_time', 0);
        $connection = $order->getConnection();
        $connection->beginTransaction();
        try{
            //锁定存款数据
            $order = $order->lockForUpdate()->first();
            if (!$order) {
                return;
            }

            $order->status  = 1;
            $order->is_test = 1;
            $order->pay_time = UTC_TIME;
            $order->service_fee = 0;
            $order->finish_time   = UTC_TIME;
            $order->finish_status = 2;

            if ($preClosure instanceof \Closure) {
                call_user_func_array($preClosure, [&$order]);
            }
            $result = $order->save();
            $connection->commit();
        } catch(\Exception $e){
            $connection->rollback();
            throw $e;
        }

        if ($result > 0) {
            usleep(100);
            $this->notify($sn, true);
        }
    }

    public function finish($sn, $dataClosure = null) {
        $order = Order::where('sn', $sn)->where('finish_status', 1);
        $is_rollback = true;
        $connection = $order->getConnection();
        $connection->beginTransaction();
        try{
            //锁定存款数据
            $order = $order->lockForUpdate()->first();
            if (!$order) {
                $this->throwException('common.order.no_exist');
            }

            $order->finish_status = 2;
            $order->finish_time = UTC_TIME;

            if ($dataClosure instanceof \Closure) {
                call_user_func_array($dataClosure, [&$order]);
            }

            $result = $order->save();
            if ($result > 0) {
                $agent = AgentService::instance()->getCacheById($order->agent_id);
                $this->updateByOrderFinish($agent, $order);
            }
            $connection->commit();
            $is_rollback = false;

            if ($result > 0) {
                OrderFinish::where('order_sn', $order->sn)->update([
                    'finish_status' => 2
                ]);
            }
        } catch(\Exception $e){
            if ($is_rollback) {
                $connection->rollback();
            }

            try{
                OrderFinish::where('order_sn', $order->sn)->update([
                    'finish_status' => $order->finish_status == 2 ? 2 : 0
                ]);
            } catch(\Exception $ex){
                \Log::info($ex->getTraceAsString());
            }
            throw $e;
        }
    }

    public function notify($sn, $isForce = false) {
        $order = Order::where('sn', $sn)->where('status', 1)->first();
        if (!$order) {
            $order = Order::where('sn', $sn)->where('status', 1)->disableQueryBigDB()->first();
        }

        if (!$order) {
            return false;
        }

        $data = [
            'sn'         => $order->sn,
            'trade_no'   => $order->trade_no,
            'money'      => (float)$order->pay_money,
            'pay_time'   => Time::toDate($order->pay_time)
        ];
        if($order->address_id > 0){
            $data['address_amount'] = $order->address_amount;
            $data['address_rate'] = $order->address_rate;
        }

        if ($order->is_test == 1) {
            $data['money'] = $order->money;
        } elseif (!$isForce && $order->pay_money < $order->money) {
            return false;
        }

        $agent = AgentService::instance()->getCacheById($order->agent_id);
        $data  = AgentService::instance()->formatRequestArgs($agent, $data);
        $response = Http::post($order->notify_url, $data, [], 20);
        $response = $response ? strtoupper(trim($response)) : '';
        switch ($response) {
            case 'PAY_SUCCESS':
                $this->updateNotifyStatus($order, 1);
                return true;
                break;

            case 'PAY_FAIL':
                $this->updateNotifyStatus($order, -1);
                return true;
                break;

            default:
                $this->updateNotifyStatus($order, 0);
                \Log::info("notify_url:" . $order->notify_url);
                \Log::info("notify_data:" . http_build_query($data));
                \Log::info("notify_response:" . $response);
                return false;
                break;
        }
    }

    public function updateAgentFees($sn) {
        $order_fees = OrderFeeOld::where('order_sn', $sn)->disableQueryBigDB()->orderBy('agent_level', 'DESC')->get();
        Order::where('sn', $sn)->onlyUpdateDB()->update(['agent_fees' => json_encode($order_fees->toArray())]);
    }

    public function updateNotifyStatus($order, $status) {
        sleep(2);
        if ($status != 0) {
            Order::where('sn', $order->sn)->update([
                'notify_status' => 1,
                'notify_time'   => UTC_TIME,
                'trade_status'  => $status
            ]);

            OrderNotify::where('order_sn', $order->sn)->update([
                'notify_status' => 2
            ]);
        } else {
            OrderNotify::where('order_sn', $order->sn)->update([
                'notify_status' => 0
            ]);
        }
    }
}