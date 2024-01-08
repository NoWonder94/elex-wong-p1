<?php
namespace App\Application\Site\Api\Controllers;

use App\Application\Site\Api\Services\UserTransferService;
use App\Application\Site\Api\Requests\TransferCreateRequest;
use Request;

class TransferController extends AuthController {
	public function lists() {
    	$result = UserTransferService::instance()->lists(
    		$this->userId, 
    		$this->request('begin_time', ''), 
    		$this->request('end_time', ''), 
    		$this->request('platform', ''), 
    		(int)Request::get('type'),
    		(int)Request::get('page')
    	);
    	$this->success($result);
    }

    public function submit(TransferCreateRequest $request) {
    	$result = UserTransferService::instance()->create($this->user, $request->all());
    	$this->success($result);
    }
}