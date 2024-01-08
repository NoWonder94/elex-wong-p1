<?php
namespace App\Libraries\Payment;

use App\Models\System\Bank;
use App\Services\Agent\OrderService;
use Http, Storage, Time, Helper;

/**
 * 大发支付
 */
class DfLibrarie extends BaseLibrarie {
    protected $type = '';

    public function notify($data) {

        if (
		!isset($data['sign']) || 
		$data['code'] != 'success' || 
		$data['status'] != 'succ' || 
		$data['merch_id'] != $this->payment['data']['pid']
		) {
            exit;
        }

        $sign = $data['sign'];
        unset($data['sign']);
        if ($sign != $this->getSign($data)) {
            exit;

        }

        $money = (float)$data['amount'];
        if ($money <= 0) {
            exit;
        }
        try {
            OrderService::instance()->pay($data['order_id'], $money);
        } catch (\Exception $e) {
            return 'error';
        }
        return 'success';
    }


    public function create(&$order) {
        $data['merch_id'] = $this->payment['data']['pid'];
		$data['product'] = $this->type;
		$data['order_id'] = $order->sn;
		$data['amount'] = sprintf("%.2f", floatval($order->money));
		$data['notify_url'] = Helper::urlByPlatform('system', 'callback#pay/notify', ['channel' => $order->channel_id]);
        $data['sign'] = $this->getSign($data);
        $result = @json_decode(Http::post($this->payment['data']['url'],$data),true);
		$log = [
            'url'  => $this->payment['data']['url'],
            'data' => $data,
            'result' => $result
        ];
        $this->apiLog($log);
        if(!$result){
            $this->throwException('', '', 'api return error');
        }
        if($result['code'] != 'success'){
            $this->throwException('', '', $result['msg']);
        }
        $order->data = $result;
        return ['url' => $result['pay_url'], 'qrcode' => ''];
    }

    protected function getSign($data) {
        $sign = '';
        ksort($data);
        reset($data);
        foreach ($data as $key => $val) {
            if ($val === '') {
                continue;
            }
            $sign .= $key . '=' . $val . '&';
        }
        $sign .= 'key=' . $this->payment['data']['key'];
        return md5($sign);
    }


}