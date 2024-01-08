<?php

namespace App\Application\Api\Controllers\Crypto;
use App\Application\Api\Services\Crypto\GuidesService;
use App\Application\Api\Controllers\BaseController;
use Request;

class GuidesController extends BaseController {
	public function getList() {
		$rules 			= [
			'title'		=> 'nullable',
			'status'	=> 'nullable|integer|between:0,1',
			'page'		=> 'nullable|integer|min:1',
			'page_size'	=> 'nullable|integer|min:1',
    	];
    	$this->validate($rules);

		$result = GuidesService::instance()->getList(
			Request::post('title'),
			Request::post('status'),
			Request::post('page') ? Request::post('page') : DEFAULT_PAGE,
			Request::post('page_size') ? Request::post('page_size') : DEFAULT_PAGE_SIZE
		);

		$this->success($result);
	}

	public function getDetail() {
		$rules 		= [
			'id'	=> 'required|integer|min:1'
    	];
    	$this->validate($rules);

		$result = GuidesService::instance()->getDetail(
			Request::post('id')
		);

		$this->success($result);
	}
}