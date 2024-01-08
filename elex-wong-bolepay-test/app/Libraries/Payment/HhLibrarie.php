<?php
namespace App\Libraries\Payment;

use App\Models\System\Bank;
use App\Services\Agent\OrderService;
use Http, Storage, Time, Helper;

/**
 * 浩瀚科技
 */
class HhLibrarie extends BaseLibrarie {
    protected $type = '';

    public function notify($data) {

        if (!isset($data['sign'])) {
            exit;
        }

        if($data['orderstatus'] != 1){
            exit;
        }
		
		if($data['partner'] != $this->payment['data']['pid']){
            exit;
        }

        $sign = $data['sign'];
        unset($data['sign']);
        if ($sign != $this->getCallSign($data)) {
            exit;

        }

        $money = (float)$data['paymoney'];
        if ($money <= 0) {
            exit;
        }
        try {
            OrderService::instance()->pay($data['ordernumber'], $money);
        } catch (\Exception $e) {
            return 'error';
        }
        return 'ok';
    }


    public function create(&$order) {
        $data['partner'] = $this->payment['data']['pid'];
		$data['banktype'] = $this->type;
		$data['paymoney'] = sprintf("%.2f", floatval($order->money));
		$data['ordernumber'] = $order->sn;
		$data['callbackurl'] = Helper::urlByPlatform('system', 'callback#pay/notify/' . $order->channel_id, [], 'xg');
        $data['sign'] = $this->getSign($data);
		$url = $this->payment['data']['url'] . '?' . http_build_query($data);
		$ci = curl_init();
        curl_setopt($ci, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($ci, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ci, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ci, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ci, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
        curl_setopt($ci, CURLOPT_HEADER, false);
        curl_setopt($ci, CURLOPT_TIMEOUT, 10);
        curl_setopt($ci, CURLOPT_URL, $url);
        $response = curl_exec($ci);
        $headers  = curl_getinfo($ci);
        curl_close ($ci);
		$log = [
            'url'  => $url,
            'result' => $response,
			'header' => $headers
        ];
        $this->apiLog($log);
        if ($headers['http_code'] != 302) {
            $response = empty($response) ? false : json_decode($response, true);
            if (!$response || !isset($response['code'])) {
                $this->throwException('', '', 'api return error');
            }

            $this->throwException('', '', $response['message']);
        }
        $result['url'] = $headers['redirect_url'];
        $result['qrcode'] = $this->createQrcode($result['url'], $order->sn);
        $order->data = $result;
		
        return ['url' => $result['url'], 'qrcode' => $result['qrcode']];
    }

    protected function getSign($data) {
        $sign = '';
        foreach ($data as $key => $val) {
            if ($val === '') {
                continue;
            }
            $sign .= '&' . $key . '=' . $val;
        }
        $sign = substr($sign,1) . $this->payment['data']['key'];
        return md5($sign);
    }
	
	protected function getCallSign($data) {
        $sign = "partner={$data['partner']}&";
		$sign .= "ordernumber={$data['ordernumber']}&";
		$sign .= "orderstatus={$data['orderstatus']}&";
		$sign .= "paymoney={$data['paymoney']}";
        $sign .= $this->payment['data']['key'];
        return md5($sign);
    }


}