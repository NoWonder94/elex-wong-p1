<?php 
namespace App\Libraries\Payment;

use App\Services\Agent\OrderService;
use Http, Helper, Request, Time;

/**
 * 兜兜支付
 */
class DouDouLibrarie extends BaseLibrarie {
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

        $money = $this->getOrderMoney($data['mchOrderNo']);
        if ($money <= 0) {
            exit;
        }

        try {
            OrderService::instance()->pay($data['mchOrderNo'], $money);
        } catch (\Exception $e) {
            return 'error';
        }
        return 'success';
    }

    public function getOrderMoney($sn) {

        $data['mchId'] = $this->payment['data']['mch_id'];
        $data['appId'] = $this->payment['data']['app_id'];
        $data['mchOrderNo'] = $sn;
        $data['sign'] = $this->getSign($data);

        $url = $this->payment['data']['api_url'] . 'pay/query_order';
        $log = [
            'url'  => $url,
            'data' => $data
        ];

        $result = Http::post($url, $data);

        $log['result'] =  $result;
        $this->apiLog($log);


        $result = empty($result) ? false : json_decode($result, true);
        if (!$result || !isset($result['retCode'])) {
            $this->throwException('', '', 'order query error');
        }

        if ($result['retCode'] != 'SUCCESS') {
            $this->throwException('', '', 'order query ' . $result['retMsg']);
        }

        if ($result['mchOrderNo'] != $sn) {
            $this->throwException('', '', 'order sn error');
        }

        if (!in_array($result['status'], [2, 3])) {
            $this->throwException('', '', 'order not completed ');
        }

        return floatval($result['amount']) / 100;
    }

    public function check($agentId, $money) {
        if (!in_array($money, $this->payment['data']['fixed_amounts'])) {
            $this->throwException(['common.order.fixed_amount_error', implode(' , ', $this->payment['data']['fixed_amounts'])]);
        }
        parent::check($agentId, $money);
    }

    public function create(&$order) {
        $data['mchId'] = $this->payment['data']['mch_id'];
        $data['appId'] = $this->payment['data']['app_id'];
        $data['productId'] = (int)$this->type;
        $data['currency'] = 'cny';
        $data['mchOrderNo'] = $order->sn;
        $data['amount'] = floatval($order->money) * 100;
        $data['notifyUrl'] = Helper::urlByPlatform('system', 'callback#pay/notify/' . $order->channel_id, [], 'xg');
        $data['subject'] = 'VIP1';
        $data['body'] = 'VIP1';
        $data['sign'] = $this->getSign($data);

        $url = $this->payment['data']['api_url'] . 'pay/create_order';
        $log = [
            'url'  => $url,
            'data' => $data
        ];

        $result = Http::post($url, $data);


        $log['result'] =  $result;
        $this->apiLog($log);

        $result = empty($result) ? false : json_decode($result, true);
        if (!$result || !isset($result['retCode'])) {
            $this->throwException('', '', 'api return error');
        }

        if ($result['retCode'] != 'SUCCESS') {
            $this->throwException('', '', 'api return ' . $result['retMsg']);
        }

        $result['qrcode'] = $this->createQrcode($result['payParams']['codeUrl'], $order->sn);

        $order->bank_trade_no = $result['payOrderId'];
        $order->data = $result;

        return ['url' => $result['payParams']['codeUrl'], 'qrcode' => $result['qrcode']];
    }

    protected function getSign($data) {
        ksort($data);
        reset($data);

        $sign = '';
        foreach ($data as $key => $val) {
            if ($val === '') {
                continue;
            }
            $sign .=  $key . '=' . $val . '&';
        }
        $sign = $sign . 'key=' . $this->payment['data']['api_key'];
        return strtoupper(md5($sign));
    }


    
}