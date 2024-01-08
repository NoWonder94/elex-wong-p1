<?php
namespace App\Libraries\Payment;

use App\Models\System\Bank;
use App\Services\Agent\OrderService;
use Http, Storage, Time, Helper;

/**
 * 欢乐支付
 */
class HlLibrarie extends BaseLibrarie {
    protected $type = '';

    public function notify($data) {

        if (!isset($data['sign'])) {
            exit;
        }

        if($data['success'] != 'true'){
            exit;
        }

        $sign = $data['sign'];
        unset($data['sign']);
        if ($sign != $this->getSign($data)) {
            exit;

        }

        $money = (float)$data['realAmount'];
        if ($money <= 0) {
            exit;
        }
        try {
            OrderService::instance()->pay($data['paymentReference'], $money);
        } catch (\Exception $e) {
            return 'error';
        }
        return 'success';
    }


    public function create(&$order) {
        $data['merchant'] = $this->payment['data']['pid'];
		$data['amount'] = sprintf("%.2f", floatval($order->money));
		$data['paymentType'] = $this->type;
		$data['username'] = rand(1,9999);
		$data['callback'] = Helper::urlByPlatform('system', 'callback#pay/notify', ['channel' => $order->channel_id]);
        $data['paymentReference'] = $order->sn;
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
        if($result['success'] != 'true'){
            $this->throwException('', '', $result['message']);
        }
        $order->data = $result;
		if(isset($result['data']['revisedPrice'])){
			$order->money = $result['data']['revisedPrice'];
		}
        return ['url' => $result['data']['redirect'], 'qrcode' => ''];
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