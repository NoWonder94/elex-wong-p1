<?php 
namespace App\Libraries\Payment;

use Http;

/**
 * SEP微信扫码
 */
class SepWechatLibrarie extends SepLibrarie {
    protected $type = 'wxpay';

    protected function requestCreate($data, $order) {
        $url = $this->payment['data']['api_url'];
        $log = [
            'url'  => $url,
            'data' => $data
        ];

        $response = Http::post($url, $data, [], 25);

        $log['response'] =  $response;

        $this->apiLog($log);

        $result = empty($response) ? false : json_decode($response, true);
        if (!$result || !isset($result['success'])) {
            $this->throwException('', '', 'api return error');
        }

        if ($result['success'] != 1) {
            $this->throwException('', '', $result['msg']);
        }

        $result['qrcode'] = $this->createQrcode($result['payLink'], $order->sn);

        $order->data = $result;

        return ['qrcode' => $result['qrcode']];
    }
}