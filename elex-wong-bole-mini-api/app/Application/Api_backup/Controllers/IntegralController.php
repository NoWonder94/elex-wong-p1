<?php
namespace App\Application\Site\Api\Controllers;

use App\Application\Site\Api\Services\UserIntegralService;
use App\Application\Site\Api\Requests\IntegralCreateRequest;
use Request;

class IntegralController extends AuthController {
	public function balance() {
        $platform = trim(Request::get('platform'));
        if (empty($platform)) {
            $this->success(0);
        }
        
        $result = UserIntegralService::instance()->getPlatformIntegral($this->userId, $platform);
        $this->success($result);
    }

    public function lists() {
    	$result = UserIntegralService::instance()->lists(
    		$this->userId, 
    		$this->request('begin_time', ''), 
    		$this->request('end_time', ''), 
    		$this->request('platform', ''), 
    		(int)Request::get('type'),
    		(int)Request::get('page')
    	);
    	$this->success($result);
    }

    public function exchange(IntegralCreateRequest $request) {
    	$result = UserIntegralService::instance()->exchange($this->user, $request->all());
    	$this->success($result);
    }
}