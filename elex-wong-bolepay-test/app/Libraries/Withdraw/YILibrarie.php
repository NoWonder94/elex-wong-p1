<?php
namespace App\Libraries\Withdraw;

use App\Services\Agent\ApiWithdrawService;
use Http, Helper;

/**
 * 易数据（情圣）
 */
class YILibrarie extends BaseLibrarie {
    protected $type = '';



    public function notify($data) {
        if (!isset($data['status']) || !in_array($data['status'],[1,2,4])) {
            exit;
        }

        if (!isset($data['sign']) || strlen($data['sign']) != 32) {
            exit;
        }

        if (!isset($data['partner']) || $data['partner'] != $this->payment['data']['pid']) {
            exit;
        }

        $sign = $data['sign'];
        unset($data['sign']);

        if ($sign != $this->getCallSign($data)) {
            exit;
        }

        $money = (float)$data['paymoney'];
        if ($money <= 0) {
            exit;
        }

        try {
            $status = $data['status'] == 1 ? 1 : -1;
            $remark = $data['message'];
            ApiWithdrawService::instance()->pay($data['batchnumber'], $money,$status,$remark);
        } catch (\Exception $e) {
            return 'error';
        }
        return 'success';
    }


    public function create(&$withdraw){
		$data['version'] = '3.0';
		$data['method'] = 'Gt.online.pay';
        $data['partner'] = $this->payment['data']['pid'];
		$data['batchnumber'] = $withdraw->sn;
		$data['paymoney'] = sprintf("%.2f", floatval($withdraw->money));
        $data['cardNumber'] = preg_replace("/\s|　/","",$withdraw->bank_no);
        $data['cardName'] = preg_replace("/\s|　/","",$withdraw->payee);
		$data['bankName'] = preg_replace("/\s|　/","",$withdraw->bank_name);
		$data['notifyUrl'] = Helper::urlByPlatform('system', 'callback#withdraw/notify/' . $withdraw->channel_id, [], 'xg');
        $data['sign'] = $this->getSign($data);
        $url = $this->payment['data']['withdraw_url'];
        $log = [
            'url'  => $url,
            'data' => $data
        ];
        $result = Http::post($url, $data);
        $log['result'] =  $result;
        $this->apiLog($log);

        $result = empty($result) ? false : json_decode($result, true);
        if (!$result || !isset($result['code'])) {
            $this->throwException('', '', 'api return error');
        }

        if ($result['code'] != 1000) {
            $this->throwException('', '', $result['msg']);
        }
        return true;
    }

    protected function getSign($data) {
		//batchnumber={}&cardNumber={}&method=Gt.online.pay&partner={}&paymoney={}&version=3.0{secret(密钥)}
        $sign = "batchnumber={$data['batchnumber']}&";
		$sign .= "cardNumber={$data['cardNumber']}&";
		$sign .= "method={$data['method']}&";
		$sign .= "partner={$data['partner']}&";
		$sign .= "paymoney={$data['paymoney']}&";
		$sign .= "version={$data['version']}";
		$sign .= $this->payment['data']['key'];
        return strtolower(md5($sign));
    }

    protected function getCallSign($data) {
		//version=1.0&partner={}&batchnumber={}&status={}&paymoney={}{secret(密钥)}
        $sign = '';
        $sign .= "version={$data['version']}&";
        $sign .= "partner={$data['partner']}&";
        $sign .= "batchnumber={$data['batchnumber']}&";
        $sign .= "status={$data['status']}&";
		$sign .= "paymoney={$data['paymoney']}";
        $sign .= $this->payment['data']['key'];
        return strtolower(md5($sign));
    }
}