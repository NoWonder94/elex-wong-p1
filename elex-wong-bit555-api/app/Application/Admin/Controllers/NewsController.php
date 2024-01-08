<?php

namespace App\Application\Admin\Controllers;
use App\Application\Admin\Services\NewsService;
use Request;

class NewsController extends AuthController {
	public function getList() {
		$rules 			= [
			'title'		=> 'nullable',
			'status'	=> 'nullable|integer|between:0,1',
			'page'		=> 'nullable|integer|min:1',
			'page_size'	=> 'nullable|integer|min:1',
    	];
    	$this->validate($rules);

		$result = NewsService::instance()->getList(
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

		$result = NewsService::instance()->getDetail(
			Request::post('id')
		);

		$this->success($result);
	}

	public function create() {
		$rules 				= [
			'img'			=> 'required|string',
			'title'			=> 'required|string',
			'description'	=> 'required|string',
			'status'		=> 'required|integer|between:0,1',
			'is_top'		=> 'required|integer|between:0,1'
    	];
    	$this->validate($rules);

		$result = NewsService::instance()->create(
			Request::post('img'),
			Request::post('title'),
			Request::post('description'),
			Request::post('status'),
			Request::post('is_top')
		);

		$this->success($result);
	}

	public function update() {
		$rules 				= [
			'id'			=> 'required|integer|min:0',
			'img'			=> 'required|string',
			'title'			=> 'required|string',
			'description'	=> 'required|string',
			'status'		=> 'required|integer|between:0,1',
			'is_top'		=> 'required|integer|between:0,1'
    	];
    	$this->validate($rules);

		$result = NewsService::instance()->update(
			Request::post('id'),
			Request::post('img'),
			Request::post('title'),
			Request::post('description'),
			Request::post('status'),
			Request::post('is_top')
		);

		$this->success($result);
	}

	public function delete() {
		$rules 		= [
			'id'	=> 'required|integer|min:0',
		];

		$result = NewsService::instance()->delete(
			Request::post('id')
		);

		$this->success($result);
	}
}