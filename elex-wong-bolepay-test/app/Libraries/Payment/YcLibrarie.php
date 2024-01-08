<?php
namespace App\Libraries\Payment;

use App\Models\System\Bank;
use App\Services\Agent\OrderService;
use App\Utils\Strings;
use Http, Storage, Time, Helper;

/**
 * 云彩支付
 */
class YcLibrarie extends BaseLibrarie {
    protected $type = '';

    public function notify($data) {

        if (!isset($data['signature'])) {
            exit;
        }

        if($data['status'] != 'SUCCESS'){
            exit;
        }

        $sign = $data['signature'];
        if ($sign != $this->getSign($data)) {
            exit;

        }

        $money = (float)$data['amount'];
        if ($money <= 0) {
            exit;
        }
        try {
            OrderService::instance()->pay($data['outOrderNo'], $money);
        } catch (\Exception $e) {
            return 'error';
        }
        return 'OK';
    }



    public function create(&$order) {
        $data['amount'] = floatval($order->money);
        $data['outOrderNo'] = $order->sn;
        $data['orderDesc'] = 'vip recharge';
        $data['timestamp'] = intval(Time::getMicrotime() * 1000);
        $data['nonceStr'] = Strings::randString(11);
        $data['notifyUrl'] = Helper::urlByPlatform('system', 'callback#pay/notify', ['channel' => $order->channel_id]);
        $data['appId'] = $this->payment['data']['pid'];
        $data['payType'] = $this->type;
        $data['userUnqueNo'] = md5($order->agent_id);
        $data['attach'] = $order->channel_id;
        $data['signature'] = $this->getSign($data);

        $result = Http::post($this->payment['data']['url'],$data);
        $log = [
            'url'  => $this->payment['data']['url'],
            'data' => $data,
            'result' => $result
        ];
        $this->apiLog($log);
        $result = json_decode($result, true);
        if(!$result){
            $this->throwException('', '', 'api return error');
        }
        if($result['code'] != 0){
            $this->throwException('', '', $result['msg']);
        }
        $result['qrcode'] = $this->createQrcode($result['data'], $order->sn);
        $order->data = $result;
        return ['url' => $result['data'], 'qrcode' => $result['qrcode']];
    }


    protected function getSign($data){
        $params=array(
            "outOrderNo" => $data['outOrderNo'],
            "amount" => $data['amount'],
            "payType" => $data['payType'],
            "attach" => $data['attach']
        );
        //把key，从小到大排序
        ksort($params);
        //封装成url参数
        $paramUrl = "?".http_build_query($params, '' , '&');
        $md5Value=strtolower(md5($paramUrl.$this->payment['data']['pid'].$data['timestamp'].$data['nonceStr']));
        return strtoupper(sha1($md5Value.$this->payment['data']['secret']));
    }


}