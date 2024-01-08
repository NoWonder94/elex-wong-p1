<?php
namespace App\Application\Agent\Api\Controllers;

use App\Application\Agent\Api\Services\OrderService;
use Request, Lang, Validator;

class OrderController  extends BaseController {

	public function query() {
        $rules = [
            'trade_no'   => ['required', 'max:64']
        ];

        $data = Request::all();

        $validator = Validator::make($data, $rules, Lang::get('common.order.validators'));
        $this->checkValidator($validator);

        $result  = OrderService::instance()->getByTradeNo($this->agent, $data['trade_no']);
    	$this->success($result);
    }
}