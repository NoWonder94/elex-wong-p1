<?php

namespace App\Application\Admin\Controllers;
use App\Application\Admin\Services\SystemService;
use Request;

class SystemController extends AuthController {
	public function notifyAll() {
		$rules 				= [
			'table_name'	=> 'required|string',
			'table_id'		=> 'required|integer|min:1',
    	];
    	$this->validate($rules);

		$result = SystemService::instance()->notifyAll(
			Request::post('table_name'),
			Request::post('table_id')
		);
		if ($result) {
			$this->success();
		} else {
			$this->error();
		}
	}
}