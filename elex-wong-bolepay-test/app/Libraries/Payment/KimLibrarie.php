<?php 
namespace App\Libraries\Payment;

use App\Services\Agent\OrderService;
use Http, Helper, Request, Time;

/**
 * Kim支付
 */
class KimLibrarie extends BaseLibrarie {
	protected $type = '';

    public function notify($data) {
        if (!isset($data['sign'])) {
            exit;
        }

        $sign = $data['sign'];

        unset($data['sign']);

        if ($sign != $this->getSign($data)) {
            exit;
        }

        $money = $this->getOrderMoney($data['order_sn']);
        if ($money <= 0) {
            exit;
        }

        try {
            OrderService::instance()->pay($data['order_sn'], $money);
        } catch (\Exception $e) {
            return 'error';
        }
        return 'success';
    }

    public function getOrderMoney($sn) {

        $data['uid'] = $this->payment['data']['uid'];
        $data['order_sn'] = $sn;
        $data['sign'] = $this->getSign($data);

        $result = Http::get($this->payment['data']['api_url'] . 'order/detail', $data);

        $result = empty($result) ? false : json_decode($result, true);
        if (!$result || !isset($result['status'])) {
            $this->throwException('', '', 'order query error');
        }

        if ($result['status'] != 200) {
            $this->throwException('', '', 'order query ' . $result['message']);
        }

        if ($result['data']['status'] != 'Completed') {
            $this->throwException('', '', 'order not completed ');
        }

        return (float)$result['data']['payment_amount'];
    }

    public function check($agentId, $money) {
        if (!in_array($money, $this->payment['data']['fixed_amounts'])) {
            $this->throwException(['common.order.fixed_amount_error', implode(' , ', $this->payment['data']['fixed_amounts'])]);
        }
        parent::check($agentId, $money);
    }

    public function create(&$order) {
        $data['uid'] = $this->payment['data']['uid'];
        $data['order_sn'] = $order->sn;
        $data['amount'] = floatval($order->money);
        $data['payment_method'] = $this->type;
        $data['notify_url'] = Helper::urlByPlatform('system', 'callback#pay/notify', ['channel' => $order->channel_id], 'xg');
        $data['sign'] = $this->getSign($data);

        $url = $this->payment['data']['api_url'] . 'order/create';
        $log = [
            'url'  => $url,
            'data' => $data
        ];

        $result = Http::post($url, $data);

        $log['result'] =  $result;
        $this->apiLog($log);

        $result = empty($result) ? false : json_decode($result, true);
        if (!$result || !isset($result['status'])) {
            $this->throwException('', '', 'api return error');
        }

        if ($result['status'] != 200) {
            $this->throwException('', '', 'api return ' . $result['message']);
        }

        $result['url'] = $result['pay_url'];
        unset($result['pay_url']);

        $result['qrcode'] = $this->createQrcode($result['url'], $order->sn);

        $order->data = $result;

        return ['url' => $result['url'], 'qrcode' => $result['qrcode']];
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
        return md5(md5(substr($sign, 1)) . $this->payment['data']['secret']);
    }
}