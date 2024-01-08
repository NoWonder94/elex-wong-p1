<?php 
namespace App\Libraries\Payment;

use App\Services\Agent\OrderService;
use Http, Helper, Request, Time;

/**
 * SEP支付
 */
class SepLibrarie extends BaseLibrarie {
	protected $type = '';

    public function notify($data) {
        if (!isset($data['success'])) {
            exit;
        }

        if ($data['success'] != 1) {
            return 'success';
        }

        if (!isset($data['signature'])) {
            exit;
        }

        if (!isset($data['merchantId']) || $data['merchantId'] != $this->payment['data']['mch_id']) {
            exit;
        }

        $sign = $data['signature'];

        unset($data['signMethod'], $data['signature']);

        if ($sign != $this->getSign($data)) {
            exit;
        }

        $money = floatval($data['txnAmt'] / 100);
        if ($money <= 0) {
            exit;
        }

        try {
            OrderService::instance()->pay($data['merOrderId'], $money);
        } catch (\Exception $e) {
            return 'error';
        }
        return 'success';
    }

    public function create(&$order) {
        $allow_moneys = $this->getMoneys();
        /*if (array_search(floatval($order->money), $allow_moneys) === false) {
            $this->throwException('common.order.money_qrcode_error');
        }*/

        $data['sendTime'] = Time::toDate(UTC_TIME, 'YmdHis');
        $data['merchantId'] = $this->payment['data']['mch_id'];
        $data['merOrderId'] = $order->sn;
        $data['txnAmt'] = floatval($order->money) * 100;
        $data['sendIp'] = $order->client_ip;
        $data['frontUrl'] = Helper::urlByPlatform('agent', 'www#pay/succ');
        $data['backUrl'] = Helper::urlByPlatform('system', 'callback#pay/notify', ['channel' => $order->channel_id]);
        $data['gateway'] = $this->type;
        $data['subject'] = 'VIP基础服务';
        $data['body'] = 'VIP基础服务';
        $data['signature'] = $this->getSign($data);
        $data['signMethod'] = 'MD5';
        $data['subject'] = base64_encode($data['subject']);
        $data['body'] = base64_encode($data['body']);
        
        return $this->requestCreate($data, $order);
    }

    protected function requestCreate($data, $order) {
        $url = $this->payment['data']['api_url'];

        $log = [
            'url'  => $url,
            'data' => $data
        ];


        $ci = curl_init();
        curl_setopt($ci, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($ci, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ci, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ci, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ci, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
        curl_setopt($ci, CURLOPT_HEADER, false);
        curl_setopt($ci, CURLOPT_TIMEOUT, 10);
        curl_setopt($ci, CURLOPT_POST, TRUE);
        curl_setopt($ci, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ci, CURLOPT_URL, $url);

        $response = curl_exec($ci);
        $headers  = curl_getinfo($ci);
        curl_close ($ci);

        $log['headers'] =  $headers;
        $log['response'] =  $response;

        $this->apiLog($log);

        if ($headers['http_code'] != 302) {
            $response = empty($response) ? false : json_decode($response, true);
            if (!$response || !isset($response['success'])) {
                $this->throwException('', '', 'api return error');
            }

            $this->throwException('', '', $response['msg']);
        }
        $result = [];
        $result['url'] = $headers['redirect_url'];
        $result['qrcode'] = $this->createQrcode($result['url'], $order->sn);

        $order->data = $result;

        return ['url' => $result['url'], 'qrcode' => $result['qrcode']];
    }

    public function getMoneys() {
        $data = file_get_contents('http://api.kvqym.com/resolve/getOrderNum');
        $data = @json_decode($data, true);
        $data = $data ? $data : [];
        $moneys = [];
        foreach ($data as $money => $num) {
            if ($num > 0) {
                $moneys[] = (float)$money / 100;
            }
        }
        sort($moneys);
        return $moneys;
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
        $sign = substr($sign, 1) . $this->payment['data']['api_key'];
        return base64_encode(md5($sign));
    }
}