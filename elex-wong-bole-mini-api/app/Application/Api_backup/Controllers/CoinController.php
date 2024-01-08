<?php
namespace App\Application\Site\Api\Controllers;

use App\Application\Site\Api\Services\UserCoinService; 
use Request;

class CoinController extends AuthController {
    public function goods() {
    	$result = UserCoinService::instance()->goods((int)Request::get('page'));
		$this->success($result);
    }

    public function exchange() {
		UserCoinService::instance()->exchange(
			$this->user,
			(int)Request::get('id'),
            $this->request('mobile', ''),
            $this->request('remark', '')
		);

		$this->success();
    }

    public function lists() {
    	$result = UserCoinService::instance()->lists(
    		$this->userId, 
    		$this->request('begin_time', ''), 
    		$this->request('end_time', ''), 
    		(int)Request::get('type'),
    		(int)Request::get('page')
    	);
    	$this->success($result);
    }
}