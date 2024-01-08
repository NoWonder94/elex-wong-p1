<?php 
namespace App\Application\Agent\Api\Services;

use App\Models\Builders\AgentBuilder;
use App\Models\Agent\Order;
use App\Utils\Calc;
use Helper, Time, Lang;

class OrderService extends \App\Services\Agent\OrderService {

    public function getByTradeNo($agent, $tradeNo) {
        $order = Order::where('agent_id', $agent->id)->where('trade_no', $tradeNo)->first();
        if (!$order) {
            $this->throwException('common.order.order_no_exist');
        } else {
            if ($order->pay_time == 0) {
                $order = Order::where('agent_id', $agent->id)->where('trade_no', $tradeNo)->disableQueryBigDB()->first();
            }

            return [
                'sn'         => $order->sn,
                'money'      => (float)$order->pay_money,
                'pay_time'   => Time::toDate($order->pay_time),
                'pay_status' => $order->pay_time > 0
            ];
        }
    }

    public function created($agent, $data) {
        $paymentLibrarie = PaymentService::instance()->getByChannelId($agent, $data['channel_id']);
        if (!$paymentLibrarie) {
            $this->throwException('common.order.payment_channel_error');
        }

        $payment = $paymentLibrarie->payment;
        $create_fee = (float)$payment['create_fee'];

        //如果有支付创建费用
        if ($create_fee > 0 && $agent->money < $create_fee) {
            $this->throwException('common.order.create_fee_min');
        }

        //根据es库判定
        $check = Order::where('agent_id', $agent->id)->where('trade_no', $data['trade_no'])->count();
        if ($check > 0) {
            $this->throwException('common.order.trade_no_exist');
        }

        $money = (float)$data['money'];

        //检测金额
        $paymentLibrarie->check($agent->id, $money);

        //根据数据库判定
        $check = Order::where('agent_id', $agent->id)->where('trade_no', $data['trade_no'])->disableQueryBigDB()->count('id');
        if ($check > 0) {
            $this->throwException('common.order.trade_no_exist');
        }

        $order = new Order();
        $order->getConnection()->beginTransaction();
        try{
            $order->sn               = Helper::getSn();
            $order->parent_agent_id  = $agent->parent_id;
            $order->agent_id         = $agent->id;
            $order->agent_name       = $agent->name;
            $order->agent_ids        = $agent->getAgentIds();
            $order->trade_no         = $data['trade_no'];
            $order->money            = $money;
            $order->agent_money      = $money;
            $order->platform         = $payment['type'];
            $order->channel          = $payment['channel'];
            $order->channel_id       = $payment['id'];
            $order->finish_type      = $agent->finish_type;
            $order->service_rate     = $payment['rate'];
            $order->create_fee       = $create_fee;
            $order->notify_url       = $data['notify_url'];
            $order->client_ip        = $data['ip'];
            $order->server_ip        = CLIENT_IP;
            $order->expire_time      = 0;
            $order->create_date      = UTC_DAY;
            $order->create_time      = UTC_TIME;

            if (isset($data['return_url'])) {
                $order->return_url = $data['return_url'];
            }
            $order->save();
			
            //获取可转通道
            $toPaymentLib = PaymentService::instance()->getToPayment($payment,$money);

            if($toPaymentLib){//有可转通道
                $toPayment = $toPaymentLib->payment;
                $order->to_platform = $toPayment['type'];
                $order->to_channel          = $toPayment['channel'];
                $order->to_channel_id       = $toPayment['id'];
                //为了正确的回调地址，改为实际跳转的通道编号
                $order->channel_id = $toPayment['id'];
                //调用支付API
                $result = $toPaymentLib->create($order);
                //改回提交的通道编号
                $order->channel_id = $payment['id'];
            }else{
                //调用支付API
                $result = $paymentLibrarie->create($order);
            }
            $order->save();

            $this->updateByOrderCreate($agent, $order);

            $this->updateAgentFees($order->sn);

            $result['sn']  = $order->sn;
            $result['money']  = $order->money;
            if ($order->expire_time > 0) {
                $result['expire_time']  = Time::toDate($order->expire_time);
            }

            if (!isset($result['url'])) {
                $result['url'] = Helper::url('www#Pay/order', ['sn' => $order->sn]);
            }
            if(!empty($order->address)){
                $result['address'] = $order->address;
                $result['address_amount'] = $order->address_amount;
            }

            $order->getConnection()->commit();

            return $result;
        } catch(\Exception $e){
            $order->getConnection()->rollback();
            throw $e;
        }
    }
}