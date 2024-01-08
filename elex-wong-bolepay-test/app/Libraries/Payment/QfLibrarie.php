<?php
namespace App\Libraries\Payment;

use App\Models\System\Bank;
use App\Services\Agent\OrderService;
use Http, Storage, Time, Helper;

/**
 *	清风支付
 */
class QfLibrarie extends BaseLibrarie {
    protected $type = '';

    public function notify($data) {
        if (!isset($data['sign'])) {
            exit;
        }
		
		if (!in_array($data['status'],[2,3])) {
            exit;
        }

		if($data['mchId'] != $this->payment['data']['pid'] || $data['appId'] != $this->payment['data']['appid']){
            exit;
        }

        $sign = $data['sign'];
        unset($data['sign'],$data['reqAmount']);
        if ($sign != $this->getSign($data)) {
            exit;

        }

        $money = (float)round($data['amount'] / 100,2);
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


    public function create(&$order) {
        $data['mchId'] = $this->payment['data']['pid'];
		$data['appId'] = $this->payment['data']['appid'];
		$data['productId'] = $this->type;
		$data['mchOrderNo'] = $order->sn;
		$data['currency'] = 'cny';
		$data['amount'] = floatval($order->money) * 100;
		$data['returnUrl'] = Helper::urlByPlatform('agent', 'www#pay/succ');
		$data['notifyUrl'] = Helper::urlByPlatform('system', 'callback#pay/notify/' . $order->channel_id, [], 'xg');
		$data['subject'] = 'VIP recharge';
		$data['body'] = 'VIP recharge';
        $data['sign'] = $this->getSign($data);
        $response = json_decode(Http::post($this->payment['data']['url'], $data),true);
		$log = [
            'url'  => $this->payment['data']['url'],
            'data' => $data,
			'result' => $response
        ];
        
        $this->apiLog($log);
		if(empty($response)){
			$this->throwException('', '', 'api return error');
		}
		
		if($response['retCode'] != 'SUCCESS'){
			$this->throwException('', '', $response['retMsg']);
		}
        $result['url'] = $response['payParams']['url'];
        $result['qrcode'] = $this->createQrcode($result['url'], $order->sn);
        $order->data = $result;
        return $result;
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