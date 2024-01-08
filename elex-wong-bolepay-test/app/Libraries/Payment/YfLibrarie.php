<?php
namespace App\Libraries\Payment;

use App\Models\System\Bank;
use App\Services\Agent\OrderService;
use Http, Storage, Time, Helper;

/**
 * 一飞支付
 */
class YfLibrarie extends BaseLibrarie {
    protected $type = '';

    public function notify($data) {

        if (!isset($data['sign'])) {
            exit;
        }

        if($data['status'] != 'true'){
            exit;
        }
		
		if($data['mch_id'] != $this->payment['data']['pid']){
            exit;
        }

        $sign = $data['sign'];
        unset($data['sign']);
        if ($sign != $this->getSign($data)) {
            exit;

        }

        $money = (float)$data['amount'];
        if ($money <= 0) {
            exit;
        }
        try {
            OrderService::instance()->pay($data['out_trade_no'], $money);
        } catch (\Exception $e) {
            return 'error';
        }
        return 'success';
    }


    public function create(&$order) {
		$data['version'] = 'V1.0';
        $data['mch_id'] = $this->payment['data']['pid'];
		$data['trade_type'] = $this->type;
		$data['out_trade_no'] = $order->sn;
		$data['amount'] = sprintf("%.2f", floatval($order->money));
		$data['attach'] = 'VIP recharge';
		$data['body'] = 'VIP recharge';
		$data['mch_create_ip'] = $order->client_ip;
		$data['notify_url'] = Helper::urlByPlatform('system', 'callback#pay/notify', ['channel' => $order->channel_id]);
        $data['return_url'] = Helper::urlByPlatform('agent', 'www#pay/succ');
        $data['sign'] = $this->getSign($data);
        $result = @json_decode(Http::post($this->payment['data']['url'],$data),true);
		$log = [
            'url'  => $this->payment['data']['url'],
            'data' => $data,
            'result' => $result
        ];
        $this->apiLog($log);
        if(!$result){
            $this->throwException('', '', 'api return error');
        }
        if($result['code'] != 0){
            $this->throwException('', '', $result['msg']);
        }
        $order->data = $result;
        return ['url' => $result['data']['payUrl'], 'qrcode' => ''];
    }

    protected function getSign($data) {
        $sign = '';
        ksort($data);
        reset($data);
        foreach ($data as $key => $val) {
            if ($val === '') {
                continue;
            }
            $sign .= '&' . $key . '=' . $val;
        }
        $sign = substr($sign,1) . $this->payment['data']['key'];
        return strtoupper(md5($sign));
    }


}