<?php

namespace App\Application\Admin\Controllers;
use App\Application\Admin\Models\Admin;
use Lang;

class AuthController extends BaseController {
	private $pathException = [
		'Admin/login',
	];

	public function __construct() {
		parent::__construct();

		if (!in_array(CONTROLLER_NAME . '/' . ACTION_NAME, $this->pathException)) {
			$this->verifyUserToken();
		}
	}

	public function verifyUserToken() {
		$this->loginStatus = -1;
		if ($this->token['uid'] <= 0) {
			$this->error([], Lang::get('lang.90004'));
		}

		$this->info = Admin::findById($this->token['uid'], true);
		if (empty($this->info)) {
			$this->error([], Lang::get('lang.90005'));
		}

		if ($this->info['login_time'] < $this->token['time']) {
			$this->error([], Lang::get('lang.90006'));
		}

		if ($this->info['logout_time'] >= $this->token['time']) {
			$this->error([], Lang::get('lang.90007'));
		}

		$this->loginStatus = 1;
	}

	public function refreshToken($info) {
		$this->info 			= $info;
		$this->token['uid'] 	= $info['id'];
		$this->token['time'] 	= UTC_CURRENT_TIME;
		$this->isShowToken 		= true;
		$this->loginStatus 		= 1;
	}
}
