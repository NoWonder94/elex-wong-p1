<?php
namespace App\Application\Agent\Api\Controllers;

use App\Application\Agent\Api\Services\OrderService;
use App\Application\Agent\Api\Services\PaymentService;
use Request, Lang, Validator, SystemSetting;

class PayController  extends BaseController {

	public function create() {
        $rules = [
            'channel_id' => ['required'],
            'trade_no'   => ['required', 'max:64'],
            'money'      => ['required', 'gt:0'],
            'ip'         => ['required', 'ip'],
            'notify_url' => ['required', 'url'],
            'return_url' => ['url'],
        ];

        $data = Request::all();

        $validator = Validator::make($data, $rules, Lang::get('common.order.validators'));
        $this->checkValidator($validator);

        if (!SystemSetting::checkClientIp($data['ip'])) {
            $this->throwException(['common.order.client_ip_bad', $data['ip']]);
        }

        $result  = OrderService::instance()->created($this->agent, $data);
    	$this->success($result);
    }

    public function moneys() {
        $rules = [
            'channel_id' => ['required']
        ];

        $data = Request::all();
        $validator = Validator::make($data, $rules, Lang::get('common.order.validators'));
        $this->checkValidator($validator);

        $result  = PaymentService::instance()->getMoneys($this->agent, $data['channel_id']);
        $this->success($result);
    }
}