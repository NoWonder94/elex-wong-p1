<?php
namespace App\Application\System\Api\Controllers;

use App\Application\System\Api\Services\BankLogService;
use Request;

class BankLogController extends BaseController {

	public function check() {
    	$data = BankLogService::instance()->check((int)Request::get('bank_id'), Request::get('sn'));
    	$this->success($data);
    }
	
    public function save() {
    	$data = BankLogService::instance()->saved(Request::all());
    	$this->success($data);
    }

    public function updateStatus() {
        ignore_user_abort(true);
        BankLogService::instance()->updateStatus((int)Request::get('bank_id'), Request::get('sn'));
        $this->success();
    }
}