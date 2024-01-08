<?php
namespace App\Libraries\Payment;

use App\Services\Agent\OrderService;
use Http, Helper, Request, Time;

/**
 * 果子支付
 */
class GuoZiLibrarie extends BaseLibrarie {
    protected $type = '';
    protected $isQrcode = false;

    public function notify($data) {
        file_put_contents('/mnt/www/storage/xx.log', print_r($_SERVER,true), FILE_APPEND);
        if(!$this->checkNotifyIp()){
            exit;
        }

        if (!isset($_SERVER['HTTP_SIGN'])) {
            exit;
        }

        $sign = $_SERVER['HTTP_SIGN'];

        if ($sign != $this->getSign(file_get_contents('php://input'), false)) {
            exit;
        }

        if($data['paid'] != true){
            exit;
        }

        $money = floatval($data['amount_real']) / 100;
        if ($money <= 0) {
            exit;
        }

        try {
            OrderService::instance()->pay($data['order_no'], $money);
        } catch (\Exception $e) {
            return 'fail';
        }
        return 'ok';
    }

    public function getOrderMoney($sn) {
        $data['mch_id'] = $this->payment['data']['mch_id'];
        $data['order_no'] = $sn;
        $data['nonce_str'] = time();
        $headers[] = 'sign: ' . $this->getSign($data);

        $url = $this->payment['data']['api_url'] . 'charges';
        $log = [
            'url'  => $url,
            'headers' => $headers,
            'data' => $data
        ];

        $result = Http::post($url, json_encode($data), [], 10, $headers);

        $log['result'] =  $result;
        $this->apiLog($log);

        $result = empty($result) ? false : json_decode($result, true);

        if (!$result) {
            $this->throwException('', '', 'order query error');
        }

        if (isset($result['state']) && $result['state'] != 'fail') {
            $this->throwException('', '', 'order query ' . $result['msg']);
        }

        if (!isset($result['order_no']) || $result['order_no'] != $sn) {
            $this->throwException('', '', 'order sn error');
        }

        if (!$result['paid']) {
            $this->throwException('', '', 'order not completed ');
        }

        return floatval($result['amount_real']) / 100;
    }

    public function create(&$order) {
        $data['mch_id'] = $this->payment['data']['mch_id'];
        $data['order_no'] = $order->sn;
        $data['channel'] = $this->type;
        $data['amount'] = floatval($order->money) * 100;
        $data['client_ip'] = $order->client_ip;
        $data['subject'] = 'VIP1';
        $data['body'] = 'VIP1';
        $data['notify_url'] = Helper::urlByPlatform('system', 'callback#pay/jsonnotify/' . $order->channel_id, [], 'xg');

        $headers[] = 'sign: ' . $this->getSign($data);

        $url = $this->payment['data']['api_url'] . 'charges';
        $log = [
            'url'  => $url,
            'headers' => $headers,
            'data' => $data
        ];

        $result = Http::post($url, json_encode($data), [], 10, $headers);

        $log['result'] =  $result;

        $this->apiLog($log);

        $result = empty($result) ? false : json_decode($result, true);
        if (!$result || !isset($result['state'])) {
            $this->throwException('', '', 'api return error');
        }

        if ($result['state'] != 'ok') {
            $this->throwException('', '', 'api return ' . $result['msg']);
        }

        if ($this->isQrcode) {
            $result['qrcode'] = $this->createQrcode($result['data']['credential']['pay_url'], $order->sn);
        }

        $order->bank_trade_no = $result['data']['order_no'];
        $order->data = $result;

        if (isset($result['data']['credential']['sdk_str'])) {
            return ['url' => '', 'sdk' => $result['data']['credential']['sdk_str']];
        } else {
            return ['url' => $result['data']['credential']['pay_url'], 'qrcode' => $result['qrcode']];
        }
    }

    protected function getSign($data, $isJson = true) {
        if ($isJson) {
            return strtoupper(md5(json_encode($data) . $this->payment['data']['api_key']));
        } else {
            return strtoupper(md5($data . $this->payment['data']['api_key']));
        }
    }

    protected function checkNotifyIp(){
        $ips = trim($this->payment['data']['notify_ip']);
        $ips = empty($ips) ? [] : explode(',', $ips);
        if (count($ips) > 0 && in_array(CLIENT_IP, $ips)) {
            return false;
        }
        return true;
    }
}