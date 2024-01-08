<?php
namespace App\Application\Site\Api\Controllers;

use App\Application\Site\Api\Services\PaymentService;
use App\Application\Site\Api\Services\UserDepositService;
use App\Application\Site\Api\Requests\DepositCreateRequest;
use Request;

class DepositController extends AuthController {
    public function payments() {
    	$payments = PaymentService::instance()->lists($this->token['client'], $this->user);
    	$this->success($payments);
    }

    public function lists() {
    	$result = UserDepositService::instance()->lists(
    		$this->userId, 
    		$this->request('begin_time', ''), 
    		$this->request('end_time', ''), 
    		(int)Request::get('payment_id'),
    		(int)Request::get('status'),
    		(int)Request::get('page')
    	);
    	$this->success($result);
    }

    public function submit(DepositCreateRequest $request) {
    	$result = UserDepositService::instance()->create($this->user, $this->token['client'], $request->all());
    	$this->success($result);
    }
}