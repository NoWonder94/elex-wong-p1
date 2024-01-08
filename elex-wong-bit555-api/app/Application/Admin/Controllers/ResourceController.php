<?php

namespace App\Application\Admin\Controllers;
use App\Services\ResourceService;
use Request;

class ResourceController extends AuthController {
	public function upload() {
		$rules 			= [
			'type'		=> 'required',
			'resource'	=> 'required',
    	];
    	$this->validate($rules);

		$result = ResourceService::instance()->upload(
			Request::post('type'),
			Request::post('resource')
		);

		$this->success($result);
	}
}