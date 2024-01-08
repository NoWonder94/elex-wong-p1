<?php
namespace App\Application\Site\Api\Controllers;

use App\Application\Site\Api\Services\UserWithdrawService;
use App\Application\Site\Api\Requests\WithdrawCreateRequest;
use Request;

class WithdrawController extends AuthController {
	public function lists() {
    	$result = UserWithdrawService::instance()->lists(
    		$this->userId, 
    		$this->request('begin_time', ''), 
    		$this->request('end_time', ''), 
    		(int)Request::get('status'),
    		(int)Request::get('page')
    	);
    	$this->success($result);
    }

    public function submit(WithdrawCreateRequest $request) {
    	$result = UserWithdrawService::instance()->create($this->user, $request->all());
    	$this->success($result);
    }

    public function balance() {
    	$result = UserWithdrawService::instance()->lockBalance($this->userId);
    	$this->success(['balance' => $this->user->balance, 'lock' => $result]);
    }
}