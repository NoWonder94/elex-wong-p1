<?php
namespace App\Application\Agent\Api\Controllers;

use App\Application\Agent\Api\Services\WithdrawService;
use App\Application\Agent\Api\Services\WithdrawPlatformService;

use Request, Lang, Validator, SystemSetting;

class WithdrawController  extends BaseController {

    public function create() {
        $rules = [
            'channel_id' => ['required'],
            'trade_no'   => ['required', 'max:64'],
            'money'      => ['required', 'gt:0'],
            'ip'         => ['required', 'ip'],
            'notify_url' => ['required', 'url'],
            'name' 		 => ['required'],
            'account' 	 => ['required'],
        ];

        $data = Request::all();
        $validator = Validator::make($data, $rules, Lang::get('common.withdraw.validators'));
        $this->checkValidator($validator);
		if($data['channel_id'] == 10001){
			if(!preg_match('/^(1[0-9]{10})|(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/',$data['account'])){
				$this->throwException(['common.withdraw.account_error', $data['account']]);
			}
		}
		
		if($data['channel_id'] == 10002){
			if(empty($data['bank'])){
				$this->throwException('common.withdraw.bank_required');
			}
			if(!preg_match('/^\d+$/',$data['account'])){
				$this->throwException('common.withdraw.account_error');
			}
		}
        if (!SystemSetting::checkClientIp($data['ip'])) {
            $this->throwException(['common.order.client_ip_bad', $data['ip']]);
        }

        $result  = WithdrawService::instance()->created($this->agent, $data);
        $this->success($result);
    }

    public function moneys() {
        $rules = [
            'channel_id' => ['required']
        ];

        $data = Request::all();
        $validator = Validator::make($data, $rules, Lang::get('common.order.validators'));
        $this->checkValidator($validator);

        $result  = WithdrawPlatformService::instance()->getMoneys($this->agent, $data['channel_id']);
        $this->success($result);
    }
}