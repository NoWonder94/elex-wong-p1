<?php

namespace App\Application\System\Admin\Controllers;

use App\Application\System\Admin\Services\AdminService;
use Session, Redirect, Helper, Request;

class PublicController extends BaseController {
	
    public function login() {
    	return $this->display();
    }

    public function dologin() {
        $admin = AdminService::instance()->login(Request::get('name'), Request::get('pwd'), Request::get('code'));
        $this->setAdminAuth($admin);
        return $this->success('', Helper::url('Index/index'));
    }

	public function logout() {
		Session::flush();
		return Redirect::to(Helper::url("Public/login"));
	}
}