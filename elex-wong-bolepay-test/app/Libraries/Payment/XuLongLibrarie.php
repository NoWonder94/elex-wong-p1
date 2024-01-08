<?php
namespace App\Libraries\Payment;
use App\Services\Agent\OrderService;
use Helper, Http;

class XuLongLibrarie extends BaseLibrarie {
    protected $type = '';

    public function notify($data) {
        //$request = file_get_contents('php://input');

        $status = $data['state'];
        if ($status != 1) {
            exit;
        }

        $money = (float)$data['amount'];
        if ($money <= 0) {
            exit;
        }

        try {
            OrderService::instance()->pay($data['orderNo'], $money);
        } catch (\Exception $e) {
            return 'error';
        }

        return 'success';
    }

    public function create(&$order) {
        $data['merchantNum']    = $this->payment['data']['pid'];
        $data['orderNo']        = $order->sn;
        $data['amount']         = sprintf("%.2f", floatval($order->money));
        $data['notifyUrl']      = Helper::urlByPlatform('system', 'callback#pay/notify', ['channel' => $order->channel_id]);
        $data['returnUrl']      = Helper::urlByPlatform('agent', 'www#pay/succ');
        $data['payType']        = $this->type;
        $data['attch']          = null;
        $data['sign']           = $this->getSign($data);
        $result                 = @json_decode(Http::post($this->payment['data']['url'], $data), true);
        $log                    = [
            'url'               => $this->payment['data']['url'],
            'data'              => $data,
            'result'            => $result
        ];
        $this->apiLog($log);

        if (!$result) {
            $this->throwException('', '', 'api return error');
        }

        if ($result['success'] != 1 && $result['code'] != 200) {
            $this->throwException('', '', $result['msg']);
        }

        $order->data = $result;

        return ['url' => $result['data']['payUrl'], 'qrcode' => ''];
    }

    protected function getSign($data) {
        return md5($data['merchantNum'] . $data['orderNo'] . $data['amount'] . $data['notifyUrl'] . $this->payment['data']['key']);
    }
}