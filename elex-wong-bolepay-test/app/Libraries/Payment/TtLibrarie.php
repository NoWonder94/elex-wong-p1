<?php
namespace App\Libraries\Payment;

use App\Models\System\Bank;
use App\Services\Agent\OrderService;
use App\Utils\Strings;
use Http, Storage, Time, Helper;

/**
 * 天天支付
 */
class TtLibrarie extends BaseLibrarie {
    protected $type = '';

    public function notify($data) {
        $data = json_decode($data['return_type'],true);
        if (!isset($data['sign'])) {
            exit;
        }

        if($data['msg'] != '支付成功'){
            exit;
        }

        $sign = $data['sign'];
        if ($sign != $this->getCallSign($data)) {
            exit;

        }

        $money = (float)$data['price'];
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
        $data['price'] = floatval($order->money);
        $data['order_id'] = $order->sn;
        $data['mark'] = 'VIP recharge';
        $data['notify_url'] = Helper::urlByPlatform('system', 'callback#pay/notify', ['channel' => $order->channel_id]);
        $data['app_id'] = $this->payment['data']['pid'];
        $data['time'] = UTC_TIME;
        $data['orderDesc'] = 'vip recharge';
        $data['sign'] = $this->getSign($data);
        $data['pay_method'] = $this->type;

        $result = Http::post($this->payment['data']['api_url'],$data);
        $log = [
            'url'  => $this->payment['data']['api_url'],
            'data' => $data,
            'result' => $result
        ];
        $this->apiLog($log);
        $result = json_decode($result, true);
        if(!$result){
            $this->throwException('', '', 'api return error');
        }
        if($result['Status'] != 1){
            $this->throwException('', '', $result['Message']);
        }
        $result['qrcode'] = $this->createQrcode($result['Result']['payurl'], $order->sn);
        $order->data = $result;
        return ['url' => $result['Result']['payurl'], 'qrcode' => $result['qrcode']];
    }


    protected function getSign($data){
        $sign = "app_id={$data['app_id']}&" . 
        "mark={$data['mark']}&" .
        "notify_url={$data['notify_url']}&" .
        "order_id={$data['order_id']}&" .
        "price={$data['price']}&" .
        "time={$data['time']}&" .
        "key={$this->payment['data']['key']}";
        return md5(strtoupper($sign));
    }

    protected function getCallSign($data){
        $sign = "api_id={$data['api_id']}&" .
        "mark={$data['mark']}&" .
        "msg={$data['msg']}&" .
        "order_id={$data['order_id']}&" .
        "pay_time={$data['pay_time']}&" .
        "price={$data['price']}&" .
        "key={$this->payment['data']['key']}";

        return md5(strtoupper($sign));
    }


}