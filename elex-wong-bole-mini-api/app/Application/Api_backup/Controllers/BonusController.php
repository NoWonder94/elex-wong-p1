<?php
namespace App\Application\Site\Api\Controllers;

use App\Application\Site\Api\Services\UserBonusService;
use Request;

class BonusController extends AuthController {
	public function waitreceive() {
        $result = UserBonusService::instance()->waitReceive($this->user);
        $this->success($result);
    }

    public function get() {
        $result = UserBonusService::instance()->getBonus($this->user, (int)Request::get('id'));
        $this->success($result);
    }

    public function receive() {
        $result = UserBonusService::instance()->receive($this->user, (int)Request::get('id'), (int)Request::get('template_id'), trim(Request::get('platform')));
        $this->success($result);
    }

    public function lists() {
    	$result = UserBonusService::instance()->lists(
    		$this->userId, 
    		$this->request('begin_time', ''), 
    		$this->request('end_time', ''), 
    		$this->request('platform', ''), 
			$this->request('type', ''), 
    		(int)Request::get('page')
    	);
    	$this->success($result);
    }

    public function exchange(IntegralCreateRequest $request) {
    	$result = UserIntegralService::instance()->exchange($this->user, $request->all());
    	$this->success($result);
    }
}