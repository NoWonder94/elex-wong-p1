<?php

namespace App\Application\Admin\Controllers;
use App\Application\Admin\Services\UserService;
use Request;

class UserController extends AuthController {
	public function getList() {
		$rules 			= [
			'email'		=> 'nullable',
			'status'	=> 'nullable|integer|between:0,1'
    	];
    	$this->validate($rules);

		$result = UserService::instance()->getList(
			Request::post('email'),
			Request::post('status')
		);

		$this->success($result);
	}
	public function getDetail() {
		$rules 		= [
			'id'	=> 'required|integer|min:1'
    	];
    	$this->validate($rules);

		$result = UserService::instance()->getDetail(
			Request::post('id')
		);

		$this->success($result);
	}
    public function create() {
        $rules = [
            'avatar'    => 'nullable|string',
            'name'      => 'nullable|string',
            'pwd'       => 'required|string',
            'email'     => 'required|string',
            'status'	=> 'nullable|integer|between:0,1'
        ];

        $this->validate($rules);

        $result = UserService::instance()->create(
            Request::post('avatar'),
            Request::post('name'),
            Request::post('pwd'),
            Request::post('email'),
            Request::post('status') ? Request::post('status') : 1
        );

        $this->success($result);

    }

	public function update() {
		$rules 			= [
			'id'		=> 'required',
			'name'		=> 'nullable',
			'old_pwd'	=> 'nullable',
			'new_pwd'	=> 'nullable',
			'email'	    => 'nullable',
			'status'	=> 'nullable|integer|between:0,1'
    	];
    	$this->validate($rules);

		$result = UserService::instance()->update(
			Request::post('id'),
			Request::post('avatar'),
			Request::post('name'),
			Request::post('old_pwd'),
			Request::post('new_pwd'),
			Request::post('email'),
			Request::post('status')
		);

		$this->success($result);
	}

	public function delete(){
		$rules 			= [
			'id'		=> 'required',
    	];
    	$this->validate($rules);

		$result = UserService::instance()->delete(
			Request::post('id')
		);

		$this->success($result);
	}
}
