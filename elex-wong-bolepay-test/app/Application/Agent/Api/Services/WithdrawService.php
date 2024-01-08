<?php
namespace App\Application\Agent\Api\Services;

use App\Models\Builders\AgentBuilder;
use App\Models\Agent\ApiWithdraw;
use App\Utils\Calc;
use Helper, Time, Lang;

class WithdrawService extends \App\Services\Agent\ApiWithdrawService {

    public function getByTradeNo($agent, $tradeNo) {
        $withdraw = ApiWithdraw::where('agent_id', $agent->id)->where('trade_no', $tradeNo)->first();
        if (!$withdraw) {
            $this->throwException('common.order.order_no_exist');
        } else {
            if ($withdraw->status == 0) {
                $withdraw = ApiWithdraw::where('agent_id', $agent->id)->where('trade_no', $tradeNo)->disableQueryBigDB()->first();
            }

            return [
                'sn'         => $withdraw->sn,
                'money'      => (float)$withdraw->money,
                'status' 	=> $withdraw->status
            ];
        }
    }

    public function created($agent, $data) {
        $paymentLibrarie = WithdrawPlatformService::instance()->getByChannelId($agent, $data['channel_id']);
        if (!$paymentLibrarie) {
            $this->throwException('common.withdraw.payment_channel_error');
        }
        $payment = $paymentLibrarie->payment;

        //根据es库判定
        $check = ApiWithdraw::where('agent_id', $agent->id)->where('trade_no', $data['trade_no'])->count();
        if ($check > 0) {
            $this->throwException('common.withdraw.trade_no_exist');
        }

        $money = (float)$data['money'];

        //检测金额
        $paymentLibrarie->check($agent->id, $money);

        //根据数据库判定
        $check = ApiWithdraw::where('agent_id', $agent->id)->where('trade_no', $data['trade_no'])->disableQueryBigDB()->count('id');
        if ($check > 0) {
            $this->throwException('common.withdraw.trade_no_exist');
        }
        $service_fee = (float)Calc::div(Calc::mul($money, $payment['rate'], 2), 100, 2);//费率
        $service_fee = (float)Calc::add($service_fee,$payment['rate_money'],2);//笔费
        if($agent->money < $service_fee + $money){
            $this->throwException('common.withdraw.money_insufficient');
        }

        $withdraw = new ApiWithdraw();
        $withdraw->getConnection()->beginTransaction();
        try{
			if(isset($data['bank']) && !empty($data['bank'])){
				$withdraw->bank = 'bank';
				$withdraw->bank_name = $data['bank'];
			}else{
				$withdraw->bank = 'alipay';
			}
            $withdraw->sn               = Helper::getSn();
            $withdraw->parent_agent_id  = $agent->parent_id;
            $withdraw->agent_id         = $agent->id;
            $withdraw->agent_name       = $agent->name;
            $withdraw->agent_ids        = $agent->getAgentIds();
            $withdraw->trade_no         = $data['trade_no'];
            $withdraw->money            = $money;
            $withdraw->channel_id       = $payment['id'];
            $withdraw->bank_no       	= $data['account'];
            $withdraw->payee       		= $data['name'];
            $withdraw->service_fee		= $service_fee;
            $withdraw->service_rate     = $payment['rate'];
            $withdraw->service_rate_money     = $payment['rate_money'];
            $withdraw->notify_url       = $data['notify_url'];
            $withdraw->client_ip        = $data['ip'];
            $withdraw->server_ip        = CLIENT_IP;
            $withdraw->create_date      = UTC_DAY;
            $withdraw->create_time      = UTC_TIME;
            $withdraw->save();
            //调用支付API
            $paymentLibrarie->create($withdraw);

            $this->updateByWithdrawCreate($agent, $withdraw);

            $result['sn']  = $withdraw->sn;
            $result['money']  = $withdraw->money;
            $result['fee']  = $service_fee;

            $withdraw->getConnection()->commit();

            return $result;
        } catch(\Exception $e){
            $withdraw->getConnection()->rollback();
            throw $e;
        }
    }
}