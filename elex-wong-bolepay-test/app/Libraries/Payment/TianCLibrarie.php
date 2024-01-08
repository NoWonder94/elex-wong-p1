<?php 
namespace App\Libraries\Payment;

use App\Services\Agent\OrderService;
use Http, Helper, Time;

/**
 * TianCPay
 */
class TianCLibrarie extends BaseLibrarie {
	protected $type = '';

    public function notify($data) {
        if (!isset($data['trading_code'])) {
            exit;
        }

        if ($data['trading_code'] != '00') {
            return 'OK';
        }

        if (!isset($data['sign_md5']) || strlen($data['sign_md5']) != 32) {
            exit;
        }

        if (!isset($data['customer_no']) || $data['customer_no'] != $this->payment['data']['customer_no']) {
            exit;
        }

        $sign = $data['sign_md5'];
        unset($data['sign_md5'], $data['append_fields']);

        if ($sign != $this->getSign($data)) {
            exit;
        }

        $money = (float)$data['amount'];
        if ($money <= 0) {
            exit;
        }

        try {
            OrderService::instance()->pay($data['customer_order'], $money, function($order) use ($data) {
                $order->bank_trade_no = $data['trading_num'];
            });
        } catch (\Exception $e) {
            return 'ERROR';
        }
        return 'OK';
    }

    public function check($agentId, $money) {
        if (isset($this->payment['data']['fixed_amounts']) && !in_array($money, $this->payment['data']['fixed_amounts'])) {
            $this->throwException(['common.order.fixed_amount_error', implode(' , ', $this->payment['data']['fixed_amounts'])]);
        }
        parent::check($agentId, $money);
    }

    public function create(&$order) {
        $data['customer_no']    = $this->payment['data']['customer_no'];
        $data['customer_order'] = $order->sn;
        $data['produce_date']   = Time::toDate(UTC_TIME);
        $data['bank_code'] = $this->type;
        $data['notify_url'] = Helper::urlByPlatform('system', 'callback#pay/notify', ['channel' => $order->channel_id]);
        $data['callback_url'] = Helper::urlByPlatform('agent', 'www#pay/succ');
        $data['amount'] = (float)$order->money;
        $data['sign_md5'] = $this->getSign($data);
        $data['goods_name'] = 'VIP基础服务';

        $url = $this->payment['data']['api_url'];
        $log = [
            'url'  => $url,
            'data' => $data
        ];

        $content = Http::post($url, $data);

        $log['result'] =  $content;
        $this->apiLog($log);

        $data = empty($content) ? false : json_decode($content, true);
        if ($data) {
            if (isset($data['status']) && $data['status'] == 'error') {
                $this->throwException('', '', $data['msg']);
            }
            $this->throwException('', '', 'api return error');
        }

        $result = [
            'url' => Helper::url('www#Pay/order', ['sn' => $order->sn]),
            'html' => $content,
        ];
        $result['qrcode'] = $this->createQrcode($result['url'], $order->sn);

        $order->data = $result;

        unset($result['html']);

        return $result;
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