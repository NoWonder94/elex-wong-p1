<?php 
namespace App\Libraries\Payment;

use App\Services\Agent\OrderService;
use Http, Helper,Time;

/**
 * 传承
 */
class CcLibrarie extends BaseLibrarie {
	protected $type = '';

    public function notify($data) {
        
        if (!isset($data['sign'])) {
            exit;
        }

        if (!isset($data['memberid']) || $data['memberid'] != $this->payment['data']['pid']) {
            exit;
        }

        $sign = $data['sign'];
        unset($data['sign']);
		unset($data['attach']);

        if ($sign != $this->getSign($data)) {
            exit;
        }

        $money = (float)$data['amount'];
        if ($money <= 0) {
            exit;
        }

        try {
            OrderService::instance()->pay($data['orderid'], $money);
        } catch (\Exception $e) {
            return 'error';
        }
        return 'OK';
    }

    public function create(&$order) {
        $config = $this->payment['data'];
        $data['pay_memberid'] = $config['pid'];
		$data['pay_orderid'] = $order->sn;
		$data['pay_applydate'] = Time::toDate(UTC_TIME);
        $data['pay_bankcode'] = $this->type;
        $data['pay_notifyurl'] = Helper::urlByPlatform('system', 'callback#pay/notify', ['channel' => $order->channel_id]);
        $data['pay_callbackurl'] = Helper::urlByPlatform('agent', 'www#pay/succ');
        $data['pay_amount'] = (float)$order->money;
		$data['pay_md5sign'] = $this->getSign($data);
        $data['pay_productname'] = 'VIP Recharge';
        $url = $config['api_url'];
        $response = Http::post($url, $data);
		$log = [
            'url'  => $url,
            'data' => $data,
			'result' => $response
        ];
        
        $this->apiLog($log);
		if(empty($response)){
			$this->throwException('', '', 'api return error');
		}
		$res = json_decode($response, true);
		
		if(is_array($res) && isset($res['status'])){
			$this->throwException('', '', $res['msg']);
		}
		$result['html'] = $response;
        $result['url'] = Helper::urlByPlatform('agent', 'www#pay/order',['sn' => $order->sn]);
        $result['qrcode'] = $this->createQrcode($result['url'], $order->sn);
        $order->data = $result;
		unset($result['html']);
        return $result;
    }

    protected function getSign($data, $type = 'pay') {
        ksort($data);
        reset($data);

        $sign = '';
        foreach ($data as $key => $val) {
            if ($val === '') {
                continue;
            }
            $sign .=  $key . '=' . $val . '&';
        }
		$sign .= 'key=' . $this->payment['data']['key'];
        return strtoupper(md5($sign));
    }

    
}