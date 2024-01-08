<?php
namespace App\Libraries\Payment;

use App\Models\System\Bank;
use App\Services\Agent\OrderService;
use Http, Storage, Time, Helper;

/**
 * 多闪支付
 */
class DsLibrarie extends BaseLibrarie {
    protected $type = '';

    public function notify($data) {

        if (!isset($data['sign'])) {
            exit;
        }

        if($data['returncode'] != '00'){
            exit;
        }
		
		if($data['memberid'] != $this->payment['data']['pid']){
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
            OrderService::instance()->pay($data['orderid'], $money);
        } catch (\Exception $e) {
            return 'error';
        }
        return 'OK';
    }


    public function create(&$order) {
        $data['pay_memberid'] = $this->payment['data']['pid'];
		$data['pay_orderid'] = $order->sn;
		$data['pay_applydate'] = Time::toDate(UTC_TIME);
		$data['pay_bankcode'] = $this->type;
		$data['pay_notifyurl'] = Helper::urlByPlatform('system', 'callback#pay/notify', ['channel' => $order->channel_id]);
        $data['pay_callbackurl'] = Helper::urlByPlatform('agent', 'www#pay/succ');
		$data['pay_amount'] = sprintf("%.2f", floatval($order->money));
        $data['pay_md5sign'] = $this->getSign($data);
		$data['pay_productname'] = 'VIP recharge';
		$data['pay_post'] = 'json';
		$data['pay_ip'] = $order->client_ip;
		$result = Http::post($this->payment['data']['url'],$data);
        $result = @json_decode($result,true);
		
		$log = [
            'url'  => $this->payment['data']['url'],
            'data' => $data,
            'result' => $result
        ];
        $this->apiLog($log);
        if(!$result){
            $this->throwException('', '', 'api return error');
        }
        if($result['status'] != 'success'){
            $this->throwException('', '', $result['msg']);
        }
        $order->data = $result;
		$sdk = isset($result['sdk']) ? $result['sdk'] : '';
        return ['url' => $result['data'], 'qrcode' => '', 'sdk' => $sdk];
    }

    protected function getSign($data) {
        $sign = '';
        ksort($data);
        reset($data);
        foreach ($data as $key => $val) {
            if ($val === '') {
                continue;
            }
            $sign .= $key . '=' . $val . '&';
        }
        $sign .= 'key=' . $this->payment['data']['key'];
        return strtoupper(md5($sign));
    }


}