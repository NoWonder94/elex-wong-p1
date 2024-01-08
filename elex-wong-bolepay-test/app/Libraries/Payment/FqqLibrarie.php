<?php
namespace App\Libraries\Payment;

use App\Models\System\Bank;
use App\Services\Agent\OrderService;
use Http, Storage, Time, Helper;

/**
 * 付七七
 */
class FqqLibrarie extends BaseLibrarie {
    protected $type = '';

    public function notify($data) {

        if (!isset($data['sign'])) {
            exit;
        }

        if($data['callbacks'] != 'CODE_SUCCESS'){
            exit;
        }
		
		if($data['appid'] != $this->payment['data']['pid']){
            exit;
        }

        $sign = $data['sign'];
        unset($data['sign']);
        if ($sign != $this->getSign($data)) {
            exit;

        }

        $money = (float)$data['amount_true'];
        if ($money <= 0) {
            exit;
        }
        try {
            OrderService::instance()->pay($data['out_trade_no'], $money);
        } catch (\Exception $e) {
            return 'error';
        }
        return 'success';
    }


    public function create(&$order) {
        $data['appid'] = $this->payment['data']['pid'];
		$data['pay_type'] = $this->type;
		$data['amount'] = sprintf("%.2f", floatval($order->money));
		$data['callback_url'] = Helper::urlByPlatform('system', 'callback#pay/notify', ['channel' => $order->channel_id]);
        $data['success_url'] = Helper::urlByPlatform('agent', 'www#pay/succ');
		$data['error_url'] = Helper::urlByPlatform('agent', 'www#pay/fail');
        $data['out_uid'] = rand(1,9999);
        $data['out_trade_no'] = $order->sn;
		$data['version'] = 'v1.1';
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
        if($result['code'] != 200){
            $this->throwException('', '', $result['msg']);
        }
        $order->data = $result;
		if(isset($result['data']['amount_true'])){
			$order->money = $result['data']['amount_true'];
		}
        return ['url' => $result['url'], 'qrcode' => $result['data']['qrcode']];
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
        return strtoupper(md5($sign));
    }


}