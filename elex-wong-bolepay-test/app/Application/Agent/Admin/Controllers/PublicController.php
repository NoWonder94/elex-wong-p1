<?php

namespace App\Application\Agent\Admin\Controllers;

use App\Application\Agent\Admin\Services\AgentService;
use Session, Redirect, Helper, Request;

class PublicController extends BaseController {
	
    public function login() {
    	return $this->display();
    }

    public function dologin() {
        $admin = AgentService::instance()->login(Request::get('name'), Request::get('pwd'), Request::get('code'));
        $this->setAdminAuth($admin);
        return $this->success('', Helper::url('Index/index'));
    }

	public function logout() {
		Session::flush();
		return Redirect::to(Helper::url("Public/login"));
	}
}