<?php

namespace App\Application\Api\Controllers;
use Hash;
use App\Services\EmailService;

class TestController extends BaseController {
	public function test() {
		echo Hash::make('123456');
		exit;
	}

	public function mail() {
		$result = EmailService::instance()->sendOTP( 'kelvin@poseitech.com','123456' );
		$this->success($result,' Email Send');
	}
}