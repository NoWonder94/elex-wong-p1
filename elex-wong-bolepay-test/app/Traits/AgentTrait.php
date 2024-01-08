<?php
namespace App\Traits;

use App\Models\Agent\ApiWithdraw;
use App\Models\Agent\Order;
use App\Models\System\Agent;
use App\Models\System\AgentLock;
use App\Models\Agent\OrderFee;
use App\Models\Agent\ApiWithdrawFee;
use App\Services\Agent\MoneyLogService;
use App\Services\Agent\StatisticService;
use App\Services\System\StatisticService as SystemStatisticService;
use App\Services\System\AgentService;
use App\Services\Agent\PaymentService;
use App\Services\Agent\WithdrawPlatformService;
use App\Utils\Calc;
use Illuminate\Database\Query\Expression;
use Lang;

trait AgentTrait {

    protected function lockAgent($id) {
        AgentLock::where('id', $id)->lockForUpdate()->first();
    }

    protected function updateMoney($agentId, float $amount) {
        if ($amount == 0) {
            return;
        }

        $current_money = Agent::where('id', $agentId)->value('money');

        $query = Agent::where('id', $agentId);
        $money = abs($amount);

        if ($amount < 0) {
            if ($current_money < $money) {
                $this->throwException('common.money_insufficient');
            }
            $new_money = Calc::sub($current_money, $money, 2);
            $query->where('money', '>=', $money);
            $data['money'] = new Expression("money - {$money}");
        } else {
            $data['money'] = new Expression("money + {$money}");
            $new_money = Calc::add($current_money, $money, 2);
        }

        $result = $query->update($data);
        if ($result < 1) {
            $this->throwException('common.update_money_error');
        }
        return $new_money;
    }

    protected function updateFrozenMoney($agentId, float $amount) {
        if ($amount == 0) {
            return;
        }

        $query = Agent::where('id', $agentId);
        $money = abs($amount);

        if ($amount < 0) {
            $query->where('frozen_money', '>=', $money);
            $data['frozen_money'] = new Expression("frozen_money - {$money}");
        } else {
            $data['frozen_money'] = new Expression("frozen_money + {$money}");
        }

        $result = $query->update($data);
        if ($result < 1) {
            $this->throwException('common.agent.update_frozen_money_error');
        }
    }

    protected function updateWithdrawMoney($agentId, float $amount) {
        if ($amount == 0) {
            return;
        }

        $query = Agent::where('id', $agentId);

        $data['withdraw_money'] = new Expression("withdraw_money + {$amount}");

        $result = $query->update($data);
        if ($result < 1) {
            $this->throwException('common.agent.update_withdraw_money_error');
        }
    }

    protected function updateByOrderCreate($agent, $order) {
        $order_money = $order->money;
        $total_create_fee  = $order->create_fee;

        //更新代理统计
        StatisticService::instance()->paymentStatistic($agent->id, $order->channel, $order->channel_id, [
            'order_num' => 1,
            'order_money' => $order_money,
            'create_fee_outlay' => $total_create_fee,
            'fee_outlay' => $total_create_fee
        ]);

        //如果有支付创建费用
        if ($total_create_fee > 0) {
            //锁定代理
            //$this->lockAgent($agent->id);

            $amount = -$total_create_fee;

            //扣除后余额
            $balance = $this->updateMoney($agent->id, $amount);

            //写入日志
            MoneyLogService::instance()->created($agent, $amount, $balance, $order->sn, 'order', Lang::format('common.order.create_fee', $order->sn));
        }

        $parent_ids = array_reverse($agent->getParentIds());
        $parent_num = count($parent_ids);
        $id = $agent->id;

        foreach ($parent_ids as $level => $pid) {
            $payment = PaymentService::instance()->getPayment($id, $order->channel_id);
            if (!$payment) {
                continue;
            }
            $create_fee = (float)$payment['create_fee'];

            $total_create_fee = Calc::sub($total_create_fee, $create_fee, 2);

            $parent_agent = AgentService::instance()->getCacheById($pid);

            $orderFee = new OrderFee;
            $orderFee->agent_id     = $pid;
            $orderFee->agent_name   = $parent_agent->name;
            $orderFee->order_sn     = $order->sn;
            $orderFee->agent_level  = $parent_num - $level;
            $orderFee->service_rate = (float)$payment['rate'];
            $orderFee->create_fee   = $create_fee;
            $orderFee->save();

            //更新父代理统计
            StatisticService::instance()->paymentStatistic($pid, $order->channel, $order->channel_id, [
                'order_num' => 1,
                'order_money' => $order_money,
                'create_fee_income' => $create_fee,
                'fee_income' => $create_fee
            ]);

            if ($create_fee > 0) {
                //$this->lockAgent($pid);

                //更新金额
                $balance = $this->updateMoney($pid, $create_fee);

                //写入日志
                /*if ($agent->parent_id == $pid) {
                    $remark = Lang::format('common.order.business_create_fee', [$agent->name, $order->sn]);
                } else {
                    $remark = Lang::format('common.order.proxy_create_fee', $order->sn);
                }*/

                $remark = Lang::format('common.order.agent_create_fee', $order->sn);

                MoneyLogService::instance()->created($parent_agent, $create_fee, $balance, $order->sn, 'order', $remark);
            }
            $id = $pid;
        }

        if ($total_create_fee < 0) {
            $this->throwException('common.fee_calc_error');
        }

        //更新系统统计
        if((int)$order->to_channel_id > 0){
            $channel = $order->to_channel;
            $channel_id = $order->to_channel_id;
        }else{
            $channel = $order->channel;
            $channel_id = $order->channel_id;
        }
        SystemStatisticService::instance()->paymentStatistic($channel, $channel_id, [
            'order_num' => 1,
            'order_money' => $order_money,
            'create_fee' => $total_create_fee,
            'fee_income' => $total_create_fee
        ]);
    }

    protected function updateByOrderPay($agent, $order) {
        $pay_money   = $order->pay_money;
        $total_service_fee = $order->service_fee;
        $proxy_fee = 0;

        //锁定代理
        //$this->lockAgent($order->agent_id);

        $amount = $order->agent_money;

        //如果为即时到帐
        if ($order->finish_status == 2) {
            //增加余额
            $balance = $this->updateMoney($agent->id, $amount);

            //写入日志
            MoneyLogService::instance()->created($agent, $amount, $balance, $order->sn, 'order', Lang::format('common.order.finish_add_money', $order->sn));
        } else {
            //增加冻结金额
            $this->updateFrozenMoney($agent->id, $amount);
        }

        //更新统计
        StatisticService::instance()->paymentStatistic($order->agent_id, $order->channel, $order->channel_id, [
            'pay_num' => 1,
            'pay_money' => $pay_money,
            'server_fee_outlay' => $total_service_fee,
            'fee_outlay' => $total_service_fee
        ], $order->create_date);

        $order_fees = OrderFee::where('order_sn', $order->sn)->get();
        foreach ($order_fees as $order_fee) {
            //$order_fee->finish_time = $order->finish_time;
            //$order_fee->finish_status = $order->finish_status;

            $service_fee  = (float)Calc::div(Calc::mul($pay_money, $order_fee->service_rate, 2), 100, 2);
            $proxy_fee    = Calc::add($proxy_fee, $service_fee, 2);

            $order_fee->service_fee = $service_fee;
            $order_fee->save();

            $update_data = [
                'pay_num' => 1,
                'pay_money' => $pay_money
            ];

            //如果已解冻
            if ($order->finish_status == 2) {
                $this->updateParentByOrderFinish($agent, $order, $order_fee, $update_data, true);
            } else {
                //增加冻结金额
                $this->updateFrozenMoney($order_fee->agent_id, $service_fee);
            }

            StatisticService::instance()->paymentStatistic($order_fee->agent_id, $order->channel, $order->channel_id, $update_data, $order->create_date);
        }

        $system_service_fee = Calc::sub($total_service_fee, $proxy_fee, 2);
        if ($system_service_fee < 0) {
            $this->throwException('common.fee_calc_error');
        }

        Order::where('id', $order->id)->update(['proxy_fee' => floatval($proxy_fee) * 100]);

        //更新系统统计
        if((int)$order->to_channel_id > 0){
            $channel = $order->to_channel;
            $channel_id = $order->to_channel_id;
        }else{
            $channel = $order->channel;
            $channel_id = $order->channel_id;
        }
        SystemStatisticService::instance()->paymentStatistic($channel, $channel_id, [
            'pay_num' => 1,
            'pay_money' => $pay_money,
            'server_fee' => $system_service_fee,
            'fee_income' => $system_service_fee
        ], $order->create_date);
    }

    protected function updateByOrderFinish($agent, $order) {
        //锁定代理
        //$this->lockAgent($order->agent_id);

        $amount = $order->agent_money;

        //减少冻结金额
        $this->updateFrozenMoney($agent->id, -$amount);

        //增加余额
        $balance = $this->updateMoney($agent->id, $amount);

        //写入日志
        MoneyLogService::instance()->created($agent, $amount, $balance, $order->sn, 'order', Lang::format('common.order.finish_add_money', $order->sn));

        $order_fees = OrderFee::where('order_sn', $order->sn)->get();
        foreach ($order_fees as $order_fee) {
            //$order_fee->finish_status = 2;
            //$order_fee->finish_time = UTC_TIME;
            //$order_fee->save();

            $update_data = [];
            $this->updateParentByOrderFinish($agent, $order, $order_fee, $update_data);

            if (count($update_data) > 0) {
                StatisticService::instance()->paymentStatistic($order_fee->agent_id, $order->channel, $order->channel_id, $update_data, $order->create_date);
            }
        }
    }

    protected function updateParentByOrderFinish($agent, $order, $orderFee, &$update_data, $isPayFinish = false) {
        $service_fee  = $orderFee->service_fee;

        if ($service_fee > 0) {
            $update_data['server_fee_income'] = $service_fee;
            $update_data['fee_income'] = $service_fee;

            //$this->lockAgent($orderFee->agent_id);

            if (!$isPayFinish) {//如果结算类型不是立即到帐
                //减少冻结金额
                $this->updateFrozenMoney($orderFee->agent_id, -$service_fee);
            }

            //更新金额
            $balance = $this->updateMoney($orderFee->agent_id, $service_fee);

            //写入日志
            /*if ($agent->parent_id == $orderFee->agent_id) {
                $remark = Lang::format('common.order.business_service_fee', [$agent->name, $order->sn]);
            } else {
                $remark = Lang::format('common.order.proxy_service_fee', $order->sn);
            }*/

            $remark = Lang::format('common.order.agent_service_fee', $order->sn);

            $parent_agent = AgentService::instance()->getCacheById($orderFee->agent_id);
            MoneyLogService::instance()->created($parent_agent, $service_fee, $balance, $order->sn, 'order', $remark);
        }
    }


    protected function updateByWithdrawCreate($agent, $withdraw) {
        $withdraw_money = $withdraw->money;
        $freeze_money = Calc::add($withdraw_money,$withdraw->service_fee);

        //预扣余额
        $balance = $this->updateMoney($withdraw->agent_id, -$freeze_money);

        $remark = Lang::format('common.api_withdraw.freeze_money', $withdraw->sn);
        MoneyLogService::instance()->created($agent, -$withdraw_money, $balance, $withdraw->sn, 'api_withdraw', $remark);

        $remark = Lang::format('common.api_withdraw.freeze_service_fee', $withdraw->sn);
        MoneyLogService::instance()->created($agent, -$withdraw->service_fee, $balance, $withdraw->sn, 'api_withdraw', $remark);

        //更新代理统计
        StatisticService::instance()->apiWithdrawStatistic($agent->id, $withdraw->channel_id, [
            'api_withdraw_num' => 1,
            'api_withdraw_money' => $withdraw_money
        ]);
        $parent_ids = array_reverse($agent->getParentIds());
        $parent_num = count($parent_ids);
        $id = $agent->id;
        $agent_fees = [];
        foreach ($parent_ids as $level => $pid) {
            $payment = WithdrawPlatformService::instance()->getPayment($id, $withdraw->channel_id);
            if (!$payment) {
                continue;
            }

            $parent_agent = AgentService::instance()->getCacheById($pid);
            $agent_fees[] = [
                'agent_id' => $pid,
                'agent_name' => $parent_agent->name,
                'agent_level' => $parent_num - $level,
                'service_rate' => $payment['rate'],
                'service_rate_money' => $payment['rate_money']
            ];
            /*$orderFee = new ApiWithdrawFee();
            $orderFee->agent_id     = $pid;
            $orderFee->agent_name   = $parent_agent->name;
            $orderFee->withdraw_sn   = $withdraw->sn;
            $orderFee->agent_level  = $parent_num - $level;
            $orderFee->service_rate = (float)$payment['rate'];
            $orderFee->save();*/

            //更新父代理统计
            StatisticService::instance()->apiWithdrawStatistic($pid, $withdraw->channel_id, [
                'api_withdraw_num' => 1,
                'api_withdraw_money' => $withdraw_money
            ]);

            $id = $pid;
        }
        if(!empty($agent_fees)){
            $withdraw->agent_fees = $agent_fees;
            $withdraw->save();
        }

        SystemStatisticService::instance()->apiWithdrawStatistic($withdraw->channel_id, [
            'api_withdraw_num' => 1,
            'api_withdraw_money' => $withdraw_money
        ]);
    }


    protected function updateByWithdrawPay($agent, $withdraw) {
        $pay_money   = $withdraw->money;
        $total_service_fee = $withdraw->service_fee;
        $proxy_fee = 0;
        //更新统计
        StatisticService::instance()->apiWithdrawStatistic($withdraw->agent_id, $withdraw->channel_id, [
            'api_withdraw_pay_num' => 1,
            'api_withdraw_pay_money' => $pay_money,
            'api_withdraw_fee' => $total_service_fee
        ], $withdraw->create_date);
        $agent_fees = $withdraw->agent_fees;
        foreach ($agent_fees as $key=>$order_fee) {

           $service_fee  = (float)Calc::div(Calc::mul($pay_money, $order_fee['service_rate'], 2), 100, 2);
           $service_fee = (float)Calc::add($service_fee,$order_fee['service_rate_money'],2);//笔费
            $proxy_fee    = Calc::add($proxy_fee, $service_fee, 2);

            $agent_fees[$key]['service_fee'] = $service_fee;

            $update_data = [
                'api_withdraw_pay_num' => 1,
                'api_withdraw_pay_money' => $pay_money
            ];

            if ($service_fee > 0) {
                $update_data['api_withdraw_income'] = $service_fee;
                //更新金额
                $balance = $this->updateMoney($order_fee['agent_id'], $service_fee);

                $remark = Lang::format('common.api_withdraw.agent_service_fee', $withdraw->sn);

                $parent_agent = AgentService::instance()->getCacheById($order_fee['agent_id']);
                MoneyLogService::instance()->created($parent_agent, $service_fee, $balance, $withdraw->sn, 'api_withdraw', $remark);
            }
            StatisticService::instance()->apiWithdrawStatistic($order_fee['agent_id'], $withdraw->channel_id, $update_data, $withdraw->create_date);
        }

        $system_service_fee = Calc::sub($total_service_fee, $proxy_fee, 2);
        if ($system_service_fee < 0) {
            $this->throwException('common.fee_calc_error');
        }

        ApiWithdraw::where('id', $withdraw->id)->update([
            'proxy_fee' => floatval($proxy_fee) * 100,
            'agent_fees' => json_encode($agent_fees)
        ]);

        SystemStatisticService::instance()->apiWithdrawStatistic($withdraw->channel_id, [
            'api_withdraw_pay_num' => 1,
            'api_withdraw_pay_money' => $pay_money,
            'api_withdraw_fee' => $total_service_fee,
            'api_withdraw_income' => $system_service_fee
        ], $withdraw->create_date);
    }


    protected function updateByWithdrawFail($agent, $withdraw) {
        $total_money = Calc::add($withdraw->money,$withdraw->service_fee,2);
        $balance = $this->updateMoney($agent->id, $total_money);

        $remark = Lang::format('common.api_withdraw.failed_money', $withdraw->sn);
        MoneyLogService::instance()->created($agent, $withdraw->money, $balance, $withdraw->sn, 'api_withdraw', $remark);

        $remark = Lang::format('common.api_withdraw.failed_service_fee', $withdraw->sn);
        MoneyLogService::instance()->created($agent, $withdraw->service_fee, $balance, $withdraw->sn, 'api_withdraw', $remark);

    }
}