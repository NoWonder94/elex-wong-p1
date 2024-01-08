<?php

namespace App\Application\Admin\Controllers;

use App\Application\Admin\Services\AdminService;
use Session, Redirect, Helper, Request, DB;

class PublicController extends BaseController {
	
    public function login() {
    	return $this->display();
    }

    public function dologin() {
        $admin = AdminService::instance()->login(Request::get('name'), Request::get('pwd'));
        //$this->systemService->navs();
        //$this->systemService->getAdminNavs($admin);
        $this->setAdminAuth($admin);
        return $this->success('', Helper::url('Index/index'));
    }

	public function logout() {
		Session::flush();
		return Redirect::to(Helper::url("Public/login"));
	}
}