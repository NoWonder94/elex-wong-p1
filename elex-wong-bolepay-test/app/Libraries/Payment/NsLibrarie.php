<?php 
namespace App\Libraries\Payment;

use App\Services\Agent\OrderService;
use Http, Helper, Request;

/**
 * 南山支付
 */
class NsLibrarie extends BaseLibrarie {
	protected $type = '';
	protected $is_fixed = false;

    public function notify($data) {
        if (!isset($data['result_code'])) {
            exit;
        }

        if ($data['result_code'] != 'SUCCESS') {
            exit;
        }

        if (!isset($data['sign']) || strlen($data['sign']) != 32) {
            exit;
        }

        if (!isset($data['mch_id']) || $data['mch_id'] != $this->payment['data']['mch_id']) {
            exit;
        }

        $sign = md5($data["result_code"] . $data["mch_id"] . $data["out_trade_no"] . $data["transaction_id"] . $data["total_fee"] . $this->payment['data']['secret_key']);

        if ($sign != $data['sign']) {
            exit;
        }

        $money = floatval($data['total_fee'] / 100);
        if ($money <= 0) {
            exit;
        }

        try {
            OrderService::instance()->pay($data['out_trade_no'], $money, function($order) use ($data) {
                $order->bank_trade_no = $data['transaction_id'];
            });
        } catch (\Exception $e) {
            return 'error';
        }
        return 'success';
    }

    public function create(&$order) {
		$money = floatval($order->money);
		if($this->is_fixed){
			$money = $this->getMoney($money);
		}
        $data['mch_id'] = $this->payment['data']['mch_id'];
        $data['out_trade_no'] = $order->sn;
        $data['total_fee'] = $money * 100;
        $data['notify_url'] = Helper::urlByPlatform('system', 'callback#pay/jsonnotify',['channel' => $order->channel_id]);
        $data['callback_url'] = Helper::urlByPlatform('agent', 'www#pay/succ');
        $data['trade_type'] = $this->type;
        $data['send_type'] = 'callback';
        //$data['terminal'] = '1';
        $data['ip'] = $order->client_ip;
        $data['sign'] = md5($data["mch_id"] . $data["out_trade_no"] . $data["total_fee"] . $data["notify_url"] . $this->payment['data']['secret_key']);
        $url = $this->payment['data']['api_url'];
        $result = Http::post($url, $data);
        $log = [
            'url'  => $url,
            'data' => $data,
            'result' => $result
        ];
        $this->apiLog($log);

        $result = empty($result) ? false : json_decode($result, true);
        if (!$result || !isset($result['status'])) {
            $this->throwException('', '', 'api return error');
        }

        if ($result['status'] != 1) {
            $this->throwException('', '', $result['error']);
        }

        $result = $result['data'];

        $result['url'] = $result['payurl'];
        unset($result['payurl']);

        $result['qrcode'] = $this->createQrcode($result['url'], $order->sn);

        //$order->money = $result['price'];
        $order->data = $result;

        return ['url' => $result['url'], 'qrcode' => $result['qrcode']];
    }

}