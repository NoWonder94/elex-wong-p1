<?php
namespace App\Application\Site\Api\Controllers;

use App\Application\Site\Api\Services\UserBankService;
use App\Application\Site\Api\Requests\BankCreateRequest;
use Request;

class BankController extends AuthController {
    public function lists() {
		$result = UserBankService::instance()->lists($this->userId);
		$this->success($result);
	} 
	
	public function create(BankCreateRequest $request) {
		$result = UserBankService::instance()->create($this->user, $request->all());
		$this->success($result);
	}

    public function delete() {
		UserBankService::instance()->delete($this->userId, (int)Request::get('id'));
		$this->success();
	}
}