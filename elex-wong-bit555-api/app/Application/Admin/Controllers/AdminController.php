<?php

namespace App\Application\Admin\Controllers;
use App\Application\Admin\Services\AdminService;
use Request;

class AdminController extends AuthController {
	public function getList() {
		$rules 			= [
			'name'		=> 'nullable',
			'status'	=> 'nullable|integer|between:0,1',
			'page'		=> 'nullable|integer|min:1',
			'page_size'	=> 'nullable|integer|min:1',	
    	];
    	$this->validate($rules);

		$result = AdminService::instance()->getList(
			Request::post('name'),
			Request::post('status'),
			Request::post('page') ? Request::post('page') : DEFAULT_PAGE,
			Request::post('page_size') ? Request::post('page_size') : DEFAULT_PAGE_SIZE
		);

		$this->success($result);
	}
	public function create() {
		$rules 				= [
			'name'				=> 'required|string',
			'pwd'				=> 'required|string',
			'confirm_pwd'		=> 'required|string',
			'status'			=> 'required|integer|between:0,1'
    	];
    	$this->validate($rules);

		$result = AdminService::instance()->create(
			Request::post('name'),
			Request::post('pwd'),
			Request::post('confirm_pwd'),
			Request::post('status')
		);

		$this->success($result);
	}

	public function login() {
		$rules 		= [
			'name'	=> 'required',
			'pwd'	=> 'required'
    	];
    	$this->validate($rules);

		$result = AdminService::instance()->login(
			Request::post('name'),
			Request::post('pwd')
		);
		$this->refreshToken($result);

		$this->success($result);
	}

	public function getDetail() {
		$this->success($this->info);
	}

	public function update() {
		$rules 			= [
			'name'		=> 'nullable',
			'pwd'	=> 'nullable',
			'confirm_pwd'	=> 'nullable',
			'status'	=> 'nullable|integer|between:0,1'
    	];
    	$this->validate($rules);

		$result = AdminService::instance()->update(
			$this->info['id'],
			Request::post('name'),
			Request::post('pwd'),
			Request::post('confirm_pwd'),
			Request::post('status')
		);

		$this->success($result);
	}

	public function logout() {
		AdminService::instance()->logout(
			$this->info['id']
		);

		$this->success();
	}

	public function delete(){
		$rules 				= [
			'id'	=> 'required|integer|min:1'
    	];
    	$this->validate($rules);

		$result = AdminService::instance()->delete(
			Request::post('id')
		);

		$this->success($result);
	}
}