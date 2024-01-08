<?php 
namespace App\Libraries\Payment;

use App\Services\Agent\WithdrawService;
use Http, Helper;

/**
 * 永利代付
 */
class YlLibrarie extends BaseLibrarie {
	protected $type = '';

    public function notify($data) {
        return 'success';
    }
	
	public function withdrawNotify($data) {
        if (!isset($data['orderstatus'])) {
            exit;
        }

        if (!isset($data['sign']) || strlen($data['sign']) != 32) {
            exit;
        }

        if (!isset($data['appid']) || $data['appid'] != $this->payment['data']['pid']) {
            exit;
        }

        $sign = $data['sign'];
        unset($data['sign']);

        if ($sign != $this->getCallSign($data)) {
            exit;
        }

        $money = (float)$data['amount'];
        if ($money <= 0) {
            exit;
        }

        try {
			$status = $data['orderstatus'] == 1 ? 2 : -1;
			if($status == 2){
				$remark = '转账流水号：' . $data['order_id'];
			}else{
				$remark = $data['apiremark'];
			}
            WithdrawService::instance()->notify($data['out_biz_no'], $money,$status,$remark);
        } catch (\Exception $e) {
            return 'error';
        }
        return 'success';
    }

    public function create(&$order) {
        return ['url' => '', 'qrcode' => ''];
    }

    public function withdraw($withdraw){
        $data['appid'] = $this->payment['data']['pid'];
		$data['recipients'] = preg_replace("/\s|　/","",$withdraw->bank->bank_no);
		$data['name'] = preg_replace("/\s|　/","",$withdraw->bank->payee);
        $data['amount'] = floatval($withdraw->really_money);
        $data['order_id'] = $withdraw->sn;
		$data['mode'] = 1;
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

        if ($result['code'] != 0) {
            $this->throwException('', '', $result['msg']);
        }
        return true;
    }

    protected function getSign($data) {
        $sign = '';
        foreach ($data as $key => $val) {
            if ($val === '') {
                continue;
            }
            $sign .= $key . '=' . $val . '&';
        }
        $sign .= '_token=' . $this->payment['data']['key'];
        return strtoupper(md5($sign));
    }
	
	protected function getCallSign($data) {
        $sign = '';
		$sign .= "appid={$data['appid']}&";
		$sign .= "orderstatus={$data['orderstatus']}&";
		$sign .= "amount={$data['amount']}&";
		$sign .= "endtime={$data['endtime']}&";
        $sign .='_token=' . $this->payment['data']['key'];
        return strtoupper(md5($sign));
    }
}