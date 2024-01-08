<?php

namespace App\Application\Www\Controllers;

use App\Application\Www\Services\SiteAdminService;
use Lang, Request, Helper;

class IndexController extends AuthController {
    public function index() {
    	return $this->display();
    }

    public function repwd() {
    	return $this->display();
    }

    public function dopwd() {
        $result = SiteAdminService::instance()->changePwd($this->adminId , Request::get('old_pwd'), Request::get('new_pwd'));
        $this->createLog();
        $this->setAdminAuth(null);
        return $this->success(Lang::get('root::common.update_success'), Helper::url("Public/login"));
    }
}