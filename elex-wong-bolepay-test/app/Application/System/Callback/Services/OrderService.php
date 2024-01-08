<?php 
namespace App\Application\System\Callback\Services;

use App\Models\Agent\Order;
use App\Models\Agent\OrderNotify;
use App\Models\Agent\OrderFinish;
use App\Models\System\Address;
use App\Services\System\PaymentService;
use App\Utils\Calc;
use Config, Time, Helper, Strings, Http;

class OrderService extends \App\Services\Agent\OrderService {

    public function expires() {
        Order::where('status', 0)
            ->where('expire_time', '>', 0)
            ->where('expire_time', '<', UTC_TIME)
            ->onlyUpdateBigDB()
            ->update([
                'status' => -1
            ]);
    }

    public function finishs() {
        try
        {
            OrderFinish::where('finish_status', 1)
                ->where('finish_time', '<', UTC_TIME - 30)
                ->update([
                    'finish_status' => 0
                ]);

            $list = OrderFinish::where('finish_next_time', '<', UTC_TIME)
                        ->where('finish_status', 0)
                        ->orderBy('finish_num', 'ASC')
                        ->limit(50)
                        ->get()
                        ->getKeyList('order_sn');
            if (count($list) < 1) {
                return;
            }

            $sns = $list->keys()->toArray();
            OrderFinish::whereIn('order_sn', $sns)
                ->where('finish_status', 0)
                ->onlyUpdateBigDB()
                ->update([
                    'finish_status' => 1,
                    'finish_time' => UTC_TIME,
                    'finish_num' => [1, '+='],
                    'finish_next_time' => UTC_TIME + 5
                ]);

            foreach ($list as $order) {
                $data = ['sn' => $order->order_sn];
                $url  = Helper::url('Order/finish', $data);
                Http::ansync($url);
            }
        } catch(\Exception $e){}
    }

    public function notifys() {
        try
        {
            OrderNotify::where('notify_status', 1)
                       ->where('notify_time', '<', UTC_TIME - 30)
                        ->update([
                            'notify_status' => 0
                        ]);

            $list = OrderNotify::where('notify_num', '<', 10)
                ->where('notify_next_time', '<', UTC_TIME)
                ->where('notify_status', 0)
                ->orderBy('notify_num', 'ASC')
                ->limit(50)
                ->get()
                ->getKeyList('order_sn');

            if (count($list) < 1) {
                return;
            }

            $sns = $list->keys()->toArray();
            OrderNotify::whereIn('order_sn', $sns)
                ->where('notify_status', 0)
                ->update([
                    'notify_status' => 1,
                    'notify_time' => UTC_TIME,
                    'notify_next_time' => function($field, &$params) {
                        $params['times'] = [0, 10, 20, 30, 60, 120, 300, 600, 900, 1800, 3600];
                        return "{$field} = " . UTC_TIME . " + (ctx._source.notify_num > 9 ? 3600 : params.times[ctx._source.notify_num + 1])";
                    },
                    'notify_num' => [1, '+=']
                ]);

            foreach ($list as $order) {
                $data = ['sn' => $order->order_sn];
                $url  = Helper::url('Order/notify', $data);
                Http::ansync($url);
            }
        } catch(\Exception $e){}
    }

	public function updateByBankLog($bankLog, $bank) {
		if (Order::where('bank_log_sn', $bankLog->sn)->count() > 0) {
			return 1;
		}

		$sn    = null;
        $money = $bankLog->deposit * 100;

		switch ($bank->auto_type) {
            case 0://银行单号
                $sn = $this->getSnByBankLog($bank, function(&$where) use($bankLog, $money) {
                    $where .= 'AND bank_trade_no = ' . Helper::quote($bankLog->trade_no) . " AND money <= {$money}";
                });
                break;

            case 1://订单号
                $sn = $this->getSnByBankLog($bank, function(&$where) use($bankLog, $money) {
                    $where .= 'AND sn = ' . Helper::quote($bankLog->trade_no) . " AND money <= {$money}";
                });
                break;

            case 2://付款码
                $sn = $this->getSnByBankLog($bank, function(&$where) use($bankLog, $money) {
                    $where .= 'AND bank_pay_code = ' . Helper::quote($bankLog->remark) . " AND money = {$money} AND expire_time >= " . UTC_TIME;
                });
                break;

            case 3://金额唯一
                $sn = $this->getSnByBankLog($bank, function(&$where) use($bankLog, $money) {
                    $where .= "AND money = {$money} AND expire_time >= " . UTC_TIME;
                });
                break;

            case 4://付款码&金额唯一
                $sn = $this->getSnByBankLog($bank, function(&$where) use($bankLog, $money) {
                    $where .= 'AND bank_pay_code = ' . Helper::quote($bankLog->remark) . " AND money = {$money} AND expire_time >= " . UTC_TIME;
                });

                if (!$sn) {
                    $sn = $this->getSnByBankLog($bank, function(&$where) use($bankLog, $money) {
                        $where .= "AND money = {$money} AND expire_time >= " . UTC_TIME;
                    });
                }
                break;
        }

		if ($sn) {
		    $this->pay($sn, $bankLog->deposit, function(&$order) use ($bankLog) {
                $order->bank_log_sn = $bankLog->sn;
            });
			return 1;
		} elseif($sn === false) {
			return -2;
		} else {
		    return -1;
        }
	}

	public function getSnByBankLog($bank, $whereClosure) {
		$prefix = Config::get('database.connections.elasticsearch.prefix');

		$where = "bank_receive_id = {$bank->id} AND status <> 1 ";

        call_user_func_array($whereClosure, [&$where]);

        $sql = "SELECT sn FROM {$prefix}agent_order WHERE {$where} LIMIT 2";

        $list = \DB::connection('elasticsearch')->sql($sql);

        if (count($list) == 0) {
            return null;
        }

        if (count($list) > 1) {
            return false;
        }

        return $list[0];
	}
        
        public function addressNotifys(){
            $address = Order::where('address_id','>',0)
                ->where('expire_time','>',UTC_TIME)
                ->where('status',0)
		->orderBy('create_time','asc')
                ->limit(100)
                ->pluck('address')
                ->toArray();
            if(count($address) < 1){
                return false;
            }
            $address = array_unique($address);
            foreach($address as $val){
                $url  = Helper::url('Order/addressNotify', ['address' => $val]);
                Http::ansync($url);
            }
            return true;
        }
        
         public function addressNotify($address){
            try{
                 if(empty($address)){
                     return false;
                 }
                 $count = Order::where('address_id','>',0)
                                ->where('expire_time','>',UTC_TIME)
                                ->where('status',0)
                                ->where('address',$address)
                                ->count();
                 if((int)$count < 1){
                     return false;
                 }
                 $offset = $count * 3;
                 $order = Order::where('address_id','>',0)
                                ->where('expire_time','>',UTC_TIME)
                                ->where('status',0)
                                ->where('address',$address)
                                ->first();
                 $channel_id = $order->to_channel_id > 0 ? $order->to_channel_id : $order->channel_id;
                 $pay_lib = PaymentService::instance()->getLibrarieById($channel_id);
                 $list = $pay_lib->queryTxns($address,$offset);
                 if(count($list) < 1){
                     return false;
                 }
                 foreach($list as $key => $val){
                     if($val['confirmations'] >= 12 && $val['to'] == $address){
                         $curent_amount = Calc::div($val['value'], pow(10,$val['tokenDecimal']), 6);
                         $check = Order::where('address_id','>',0)
                                        ->where('expire_time','>',UTC_TIME)
                                        ->where('status',0)
                                        ->where('address',$address)
                                        ->where('address_amount',$curent_amount)
                                        ->first();			
                         if($check){
                            $this->pay($check->sn, $check->money,null,null,null,$val['from'],$val['hash']);
                         }
                     }
                 }
            } catch (\Exception $e){
                return false;
            }
            return true;
         }
}