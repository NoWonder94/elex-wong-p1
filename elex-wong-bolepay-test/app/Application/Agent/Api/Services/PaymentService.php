<?php 
namespace App\Application\Agent\Api\Services;

use App\Services\System\PaymentService as SystemPaymentService;
use App\Models\Agent\Order;
use App\Utils\Calc;

class PaymentService extends \App\Services\Agent\PaymentService {

    public function getByChannelId($agent, $channelId) {
        $agent_payments  = $this->getPayments($agent, false);
        if (!isset($agent_payments[$channelId])) {
            $this->throwException('common.order.payment_not_exist');
        }

        $payment = $agent_payments[$channelId];

        if ($payment['status'] != 1) {
            $this->throwException('common.order.payment_close');
        }

        if ($payment['confirm_status'] != 1) {
            $this->throwException('common.order.payment_confirm');
        }

        $librarie = '\App\Libraries\Payment\\' . $payment['code'] . 'Librarie';
        return new $librarie($payment);
    }

    public function getMoneys($agent, $channelId) {
        $agent_payments  = $this->getPayments($agent, false);
        if (!isset($agent_payments[$channelId])) {
            $this->throwException('common.order.payment_not_exist');
        }

        $payment = $agent_payments[$channelId];

        if ($payment['status'] != 1) {
            $this->throwException('common.order.payment_close');
        }

        if ($payment['confirm_status'] != 1) {
            $this->throwException('common.order.payment_confirm');
        }

        $librarie = '\App\Libraries\Payment\\' . $payment['code'] . 'Librarie';
        $librarie = new $librarie($payment);
        return $librarie->getMoneys();
    }

    public function getToPayment($payment, $money){
        if(count($payment['rules']) < 1 && count($payment['agent_rules']) < 1){
            return false;
        }
        $rules = count($payment['agent_rules']) > 0 ? $payment['agent_rules'] : $payment['rules'];
        $system_payments = SystemPaymentService::instance()->getCacheByCode('payments');
        $to_payment = null;
        $no_range = [];
        //有金额范围的切量
        foreach($rules as $val){
            if($val['is_range'] == 1){
                $sys_payment = $system_payments[$val['channel_id']];
                if($money >= floatval($val['min_amount']) &&
                    $money < floatval($val['max_amount']) &&
                    $sys_payment['status'] == 1
                ){
                    if (isset($sys_payment['data']['fixed_amounts']) && !in_array($money, $sys_payment['data']['fixed_amounts'])) {
                        continue;
                    }

                    if ($sys_payment['min_money'] > 0 && $sys_payment['min_money'] > $money) {
                        continue;
                    }

                    if ($sys_payment['max_money'] > 0 && $sys_payment['max_money'] < $money) {
                        continue;
                    }
                    $channels = [
                        ['channel_id' => $payment['id'],'rate' => 100 - $val['rate']],
                        ['channel_id' => $val['channel_id'],'rate' => $val['rate']]
                    ];
                    $key = $this->getRand(array_column($channels,'rate'));
                    if($channels[$key]['channel_id'] != $payment['id']){
                        $to_payment = $sys_payment;
                    }
                    break;
                }else{
                    continue;
                }
            }else{
                $no_range[] = $val;
            }
        }
        //没有金额范围限制的切量
        if(!$to_payment && count($no_range) > 0){
            $rate = 0;
            foreach($no_range as $val){
                $rate += $val['rate'];
                $sys_payment = $system_payments[$val['channel_id']];
                if($sys_payment['status'] != 1){
                    continue;
                }
                if (isset($sys_payment['data']['fixed_amounts']) && !in_array($money, $sys_payment['data']['fixed_amounts'])) {
                    continue;
                }

                if ($sys_payment['min_money'] > 0 && $sys_payment['min_money'] > $money) {
                    continue;
                }

                if ($sys_payment['max_money'] > 0 && $sys_payment['max_money'] < $money) {
                    continue;
                }
                $channels[] = [
                    'channel_id' => $val['channel_id'],
                    'rate' => $val['rate']
                ];
            }
            $channels[] = [
                'channel_id' => $payment['id'],
                'rate' => 100 - $rate
            ];

            $key = $this->getRand(array_column($channels,'rate'));
            if($channels[$key]['channel_id'] != $payment['id']){
                $to_payment = $system_payments[$channels[$key]['channel_id']];
            }

        }
        if(!$to_payment){
            return false;
        }
        $librarie = '\App\Libraries\Payment\\' . $to_payment['code'] . 'Librarie';
        return new $librarie($to_payment);

    }

    protected function getRand($proArr) { 
        $result = ''; 

        //概率数组的总概率精度 
        $proSum = array_sum($proArr); 

        //概率数组循环 
        foreach ($proArr as $key => $proCur) { 
            $randNum = mt_rand(1, $proSum); 
            if ($randNum <= $proCur) { 
                $result = $key; 
                break; 
            } else { 
                $proSum -= $proCur; 
            } 
        } 
        unset ($proArr); 

        return $result; 
    } 
}