<?php 
namespace App\Libraries\Payment;

use App\Services\Agent\OrderService;
use Http, Helper;

/**
 * PDD
 */
class PddLibrarie extends BaseLibrarie {
	protected $type = '';

    public function notify($data) {
        if (!isset($data['status'])) {
            exit;
        }

        if ($data['status'] != 1) {
            return 'allpay_success';
        }

        if (!isset($data['sign'])) {
            exit;
        }

        if (!isset($data['mer_no']) || $data['mer_no'] != $this->payment['data']['mer_no']) {
            exit;
        }

        $sign = $data['sign'];
        unset($data['sign']);

        if (!$this->checkSign($data, $sign)) {
            exit;
        }

        $money = (int)$data['money'] / 100;
        if ($money <= 0) {
            exit;
        }

        try {
            OrderService::instance()->pay($data['trans_id'], $money, function($order) use ($data) {
                $order->bank_trade_no = $data['order_id'];
            });
        } catch (\Exception $e) {
            return 'error';
        }
        return 'allpay_success';
    }

    public function check($agentId, $money) {
        if (!in_array($money, $this->payment['data']['fixed_amounts'])) {
            $this->throwException(['common.order.fixed_amount_error', implode(' , ', $this->payment['data']['fixed_amounts'])]);
        }
        parent::check($agentId, $money);
    }

    public function create(&$order) {
        $config = $this->payment['data'];
        $data['mer_no'] = $config['mer_no'];
        $data['mer_user_no'] = $config['mer_user_no'];
        $data['trans_id'] = $order->sn;
        $data['pay_time'] = UTC_TIME;
        $data['notify_url'] = Helper::urlByPlatform('system', 'callback#pay/notify', ['channel' => $order->channel_id]);
        $data['front_url'] = Helper::urlByPlatform('agent', 'www#pay/succ');
        $data['body'] = 'iphone11 pro max';
        $data['spbill_create_ip'] = $order->client_ip;
        $data['version'] = '1.0.0';
        $data['sign_type'] = 'RSA';
        $data['data'] = json_encode([
            'money' => (float)$order->money * 100,
            'pay_type' => $this->type,
            'trade_type' => 'T1'
        ]);
        $data['data'] = openssl_encrypt($data['data'], 'AES-128-CBC', $config['aes_key'], 0, 'alpayaesivvector');
        $data['sign'] = $this->generateSign($data);

        $url = $config['api_url'] . 'transPayJ';
        $log = [
            'url'  => $url,
            'data' => $data
        ];

        $result = Http::post($url, $data);

        $log['result'] =  $result;
        $this->apiLog($log);

        $result = empty($result) ? false : json_decode($result, true);
        if (!$result || !isset($result['success'])) {
            $this->throwException('', '', 'api return error');
        }

        if (!$result['success']) {
            $this->throwException('', '', $result['desc']);
        }

        $result = [
            'url' => $result['content']
        ];

        $result['qrcode'] = $this->createQrcode($result['url'], $order->sn);

        $order->data = $result;

        return $result;
    }

    protected function getSign($data, $type = 'pay') {
        ksort($data);
        reset($data);

        $sign = '';
        foreach ($data as $key => $val) {
            if ($val === '') {
                continue;
            }
            $sign .= '&' . $key . '=' . $val;
        }
        return substr($sign, 1);
    }

    private function checkSign($data, $sign) {
        $sign = base64_decode(urldecode($sign));
        $ssl_key = openssl_pkey_get_public($this->payment['data']['public_key']);
        $result = openssl_verify($this->getSign($data), $sign, $ssl_key, OPENSSL_ALGO_SHA1);
        openssl_free_key($ssl_key);
        return $result == 1;
    }

    private function generateSign($data) {
        $ssl_key = openssl_pkey_get_private($this->payment['data']['private_key']);
        openssl_sign($this->getSign($data), $result, $ssl_key, OPENSSL_ALGO_SHA1);
        openssl_free_key($ssl_key);
        return base64_encode($result);
    }
}