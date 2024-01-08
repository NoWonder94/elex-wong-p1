<?php
namespace App\Libraries\Payment;

use App\Models\System\Bank;
use App\Services\Agent\OrderService;
use Http, Storage, Time, Helper;

/**
 *	八戒支付
 */
class BjLibrarie extends BaseLibrarie {
    protected $type = '';

    public function notify($data) {

        if (!isset($data['sign'])) {
            exit;
        }
		if($data['appid'] != $this->payment['data']['pid']){
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
            OrderService::instance()->pay($data['order_no'], $money);
        } catch (\Exception $e) {
            return 'error';
        }
        return 'success';
    }


    public function create(&$order) {
        $data['appid'] = $this->payment['data']['pid'];
		$data['order_no'] = $order->sn;
		$data['amount'] = sprintf("%.2f", floatval($order->money));
		$data['notify_url'] = Helper::urlByPlatform('system', 'callback#pay/notify', ['channel' => $order->channel_id]);
		$data['return_url'] = Helper::urlByPlatform('agent', 'www#pay/succ');
		$data['pay_code'] = $this->type;
        $data['sign'] = $this->getSign($data);
        $response = json_decode(Http::post($this->payment['data']['url'], $data),true);
		$log = [
            'url'  => $this->payment['data']['url'],
            'data' => $data,
			'result' => $response
        ];
        
        $this->apiLog($log);
		if(empty($response)){
			$this->throwException('', '', 'api return error');
		}
		
		if($response['code'] != 1){
			$this->throwException('', '', $response['msg']);
		}
        $result['url'] = $response['pay_url'];
        $result['qrcode'] = $this->createQrcode($result['url'], $order->sn);
        $order->data = $result;
        return $result;
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
        return md5($sign);
    }


}