<?php 
namespace App\Libraries\Payment;

use App\Services\Agent\OrderService;
use Http, Helper;

/**
 * BangBang
 */
class BbLibrarie extends BaseLibrarie {
	protected $type = '';

    public function notify($data) {
        if (!isset($data['result_code'])) {
            exit;
        }

        if ($data['result_code'] != 0) {
            return 'OK';
        }

        if (!isset($data['sign']) || strlen($data['sign']) != 32) {
            exit;
        }

        if (!isset($data['mch_id']) || $data['mch_id'] != $this->payment['data']['mch_id']) {
            exit;
        }

        $sign = $data['sign'];
        unset($data['sign']);

        if ($sign != $this->getSign($data)) {
            exit;
        }

        $money = (float)$data['amount_fee'];
        if ($money <= 0) {
            exit;
        }

        try {
            OrderService::instance()->pay($data['trade_id'], $money);
        } catch (\Exception $e) {
            return 'ERROR';
        }
        return 'OK';
    }

    public function create(&$order) {
        $data['mch_id'] = $this->payment['data']['mch_id'];
        $data['fee'] = (float)$order->money;
        $data['pay_type'] = $this->type;
        $data['trade_id'] = $order->sn;
        $data['ip'] = $order->client_ip;
        $data['notify_url'] = Helper::urlByPlatform('system', 'callback#pay/bbnotify');
        $data['attach'] = $order->channel_id;
        if (!empty($order->return_url)) {
            $data['return_url'] = $order->return_url;
        }
        $data['sign'] = $this->getSign($data);

        $url = $this->payment['data']['api_url'];
        $log = [
            'url'  => $url,
            'data' => $data
        ];

        $result = Http::post($url, $data);

        $log['result'] =  $result;
        $this->apiLog($log);

        $result = empty($result) ? false : json_decode($result, true);
        if (!$result || !isset($result['errCode'])) {
            $this->throwException('', '', 'api return error');
        }

        if ($result['errCode'] != 0) {
            $this->throwException('', '', 'api return ' . $result['errMsg']);
        }

        $result = $result['data'];

        $result['url'] = $result['pay_url'];
        unset($result['pay_url']);

        $result['qrcode'] = $this->createQrcode($result['url'], $order->sn);

        $order->bank_trade_no = $result['order_id'];
        $order->data = $result;

        return ['url' => $result['url'], 'qrcode' => $result['qrcode']];
    }

    public function withdraw($withdraw){
        $data['mch_id'] = $this->payment['data']['mch_id'];
        $data['fee'] = floatval($withdraw->really_money) + 3;
        $data['bank_name'] = preg_replace("/\s|　/","",$withdraw->bank->bank);
        $data['card'] = preg_replace("/\s|　/","",$withdraw->bank->bank_no);
        $data['payee'] = preg_replace("/\s|　/","",$withdraw->bank->payee);
        $data['sign'] = $this->getSign($data);
        $url = $this->payment['data']['withdraw_url'];
        $log = [
            'url'  => $url,
            'data' => $data
        ];
        $result = Http::post($url, $data);
        $log['result'] =  $result;
        $this->apiLog($log);

        $result = empty($result) ? false : json_decode($result, true);
        if (!$result || !isset($result['errCode'])) {
            $this->throwException('', '', 'api return error');
        }

        if ($result['errCode'] != 0) {
            $this->throwException('', '', $result['errMsg']);
        }
        return true;
    }

    protected function getSign($data) {
        ksort($data);
        reset($data);

        $sign = '';
        foreach ($data as $key => $val) {
            if ($val === '') {
                continue;
            }
            $sign .= '&' . $key . '=' . $val;
        }
        $sign = $this->payment['data']['api_key'] . substr($sign, 1) . $this->payment['data']['api_key'];
        return strtoupper(md5($sign));
    }
}