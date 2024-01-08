<?php
namespace App\Application\System\Api\Controllers;

use App\Application\System\Api\Services\BankService;
use Request;

class BankController extends BaseController {

    public function get() {
    	$data = BankService::instance()->getById((int)Request::get('id'));
    	$this->success($data);
    }

    public function getReceive() {
        $data = BankService::instance()->getReceive(Request::get('type'));
        $this->success($data);
    }

    public function updateDepositCount() {
        BankService::instance()->updateDepositCount((int)Request::get('id'));
        $this->success();
    }
	
	public function checkIp() {
		$data = BankService::instance()->checkIp((int)Request::get('id'), CLIENT_IP);
    	$this->success($data);
	}

    public function setRunStatus() {
        BankService::instance()->setRunStatus((int)Request::get('id'),
    		(int)Request::get('status'), 
    		trim(Request::get('msg'))
    	);
    	$this->success();
    }

    public function setAppStatus() {
        BankService::instance()->setAppStatus((int)Request::get('id'),
    		(int)Request::get('status'), 
    		trim(Request::get('msg'))
    	);
    	$this->success();
    }
}