<?php 
namespace App\Libraries\Payment;

use App\Services\Agent\OrderService;
use Http, Helper, Request;

/**
 * 金流商支付
 */
class JlsLibrarie extends BaseLibrarie {
	protected $type = '';
   
    
    public function notify($data) {
        if (!isset($data['status'])) {
            exit;
        }

        if ($data['status'] != 'SuccessPay') {
            exit;
        }

        $sign = $this->checkSign($data);

        if ($sign != $data['sign']) {
            exit;
        }

        if ($data["actualAmount"] <= 0) {
            exit;
        }

        try {
        	OrderService::instance()->pay($data['merchantOrderNo'], $data["actualAmount"]);
        } catch (\Exception $e) {
            return 'error';
        }
        
        return 'success';
    }

    public function create(&$order) {
        $data['merchantNum'] 		= $this->payment['data']['mch_id'];
        $data['merchantOrderNo'] 	= $order->sn;
        $data['money'] 				= sprintf("%.0f", floatval($order->money));
        $data['ip'] 				= $order->client_ip;
        $data['payWay'] 			= $this->type;
        $data['payWayId'] 			= $this->typeId;
        $data['return_url']    		= Helper::urlByPlatform('system', 'callback#pay/notify', ['channel' => $order->channel_id]);
        $data['sign'] 				= $this->getSign($data);	
		$result                     = @json_decode(Http::post($this->payment['data']['url'], $data), true);
        $log                        = [
            'url'                   => $this->payment['data']['url'],
            'data'                  => $data,
            'result'                => $result
        ];
        $this->apiLog($log);

        if (!$result) {
            $this->throwException('', '', 'api return error');
        }

        if ($result['code'] != 200) {
            $this->throwException('', '', 'api return ' . $result['message']);
        }

        $order->data = $result;

        return ['url' => $result['url'], 'qrcode' => null];
    }

    protected function getSign($data) {
        return md5($data["merchantNum"] . $data["money"] . $this->payment['data']['mch_key']);
    }

    protected function checkSign($data) {
    	return md5($data["orderNo"] . $data["merchantOrderNo"] . $data["actualAmount"] . $this->payment['data']['mch_key']);
    }
}