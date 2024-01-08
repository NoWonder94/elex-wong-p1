<?php
namespace App\Libraries\Payment;

use App\Models\System\Bank;
use App\Services\Agent\OrderService;
use Http, Storage, Time, Helper;

/**
 * 无双支付
 */
class WsLibrarie extends BaseLibrarie {
    protected $type = '';

    public function notify($data) {

        if (!isset($data['Signature'])) {
            exit;
        }

        if($data['trade_status'] != 'success'){
            exit;
        }
		

        $sign = $data['Signature'];
        unset($data['Signature']);
        if ($sign != $this->getSign($data)) {
            exit;

        }

        $money = (float)$data['totalAmount'];
        if ($money <= 0) {
            exit;
        }
        try {
            OrderService::instance()->pay($data['outTradeNo'], $money);
        } catch (\Exception $e) {
            return 'error';
        }
        return 'success';
    }


    public function create(&$order) {
        $data['promoterId'] = $this->payment['data']['pid'];
		$data['outTradeNo'] = $order->sn;
		$data['totalAmount'] = sprintf("%.2f", floatval($order->money));
		$data['tradeType'] = $this->type;
		$data['noticeUrl'] = Helper::urlByPlatform('system', 'callback#pay/notify', ['channel' => $order->channel_id]);
        $header = [
			'X-ClientId:' . $this->payment['data']['cid'],
			'X-Signature:' . $this->getSign($data)
		];
        $result = @json_decode(Http::post($this->payment['data']['url'],$data,[],10,$header),true);
		$log = [
			'header' => $header,
            'url'  => $this->payment['data']['url'],
            'data' => $data,
            'result' => $result
        ];
        $this->apiLog($log);
        if(!$result){
            $this->throwException('', '', 'api return error');
        }
        if($result['code'] != '10000'){
            $this->throwException('', '', $result['msg']);
        }
        $order->data = $result;
        return ['url' => $result['pay_url'], 'qrcode' => ''];
    }

    protected function getSign($data) {
        $sign = '';
        ksort($data);
        foreach ($data as $key => $val) {
            $sign .= $key . '=' . $val . '&';
        }
        $sign .= 'key=' . $this->payment['data']['key'];
        return strtoupper(base64_encode(hash('sha256',$sign,true)));
    }


}