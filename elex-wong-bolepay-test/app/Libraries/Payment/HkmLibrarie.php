<?php 
namespace App\Libraries\Payment;

use App\Services\Agent\OrderService;
use Http, Helper;

/**
 * Hkm
 */
class HkmLibrarie extends BaseLibrarie {
	protected $type = '';

    public function notify($data) {
        if (!isset($data['status'])) {
            exit;
        }

        if ($data['status'] != 2) {
            return 'success';
        }

        if (!isset($data['sign'])) {
            exit;
        }

        if (!isset($data['merchantid']) || $data['merchantid'] != $this->payment['data']['mch_id']) {
            exit;
        }

        $sign = $data['sign'];
        unset($data['sign']);

        if ($sign != $this->getSign($data)) {
            exit;
        }

        $money = $data['income'];
        if ($money <= 0) {
            exit;
        }

        try {
            OrderService::instance()->pay($data['orderid'], $money);
        } catch (\Exception $e) {
            return 'error';
        }
        return 'success';
    }

    public function create(&$order) {
        $config = $this->payment['data'];
        $data['merchantid'] = $config['mch_id'];
        $data['orderid'] = $order->sn;
        $data['client_ip'] = $order->client_ip;
        $data['paytype'] = $this->type;
        $data['notify_url'] = Helper::urlByPlatform('system', 'callback#pay/notify/' . $order->channel_id, [], 'xg');
        $data['return_url'] = Helper::urlByPlatform('agent', 'www#pay/succ');
        $data['money'] = (float)$order->money;
        $data['sign'] = $this->getSign($data);
        $data['format'] = 'json';

        $url = $config['api_url'];
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

        if ($result['status'] != 1) {
            $this->throwException('', '', 'api' . $result['msg']);
        }

        $result = $result['data'];
        $order->bank_trade_no = $result['trade_no'];
        $order->data = $result;

        return ['url' => $result['qr_code'], 'qrcode' => $this->createQrcode($result['qr_code'], $order->sn)];
    }

    protected function getSign($data) {
        $data['merchantKey'] = $this->payment['data']['mch_key'];
        ksort($data);
        reset($data);

        $sign = '';
        foreach ($data as $key => $val) {
            if ($val === '') {
                continue;
            }
            $sign .= '&' . $key . '=' . $val;
        }

        return md5(substr($sign, 1));
    }
}