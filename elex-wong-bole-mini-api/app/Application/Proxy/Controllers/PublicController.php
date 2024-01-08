<?php

namespace App\Application\Proxy\Controllers;

use App\Services\SystemConfigService;
use App\Application\Proxy\Services\ProxyService;
use App\Models\Site\User;
use Session, Redirect, Helper, Request, DB;

class PublicController extends BaseController {

    public function login() {
        return $this->display();
    }

    public function reg() {
        return $this->display();
    }

    public function promo() {
        $code = $_REQUEST['code'];
        if (preg_match('/(Android|iPhone|iPod|iPad|Windows Phone|MQQBrowser)/i', $_SERVER['HTTP_USER_AGENT'])) {
            $link = SystemConfigService::instance()->getByCode('wap_link');
        } else {
            $link = SystemConfigService::instance()->getByCode('pc_link');
        }
        $link = isset($link['val']) ? $link['val'] : '';
        header('Location:'.$link.'?code='.$code);
    }

    // public function start() {
    //     return $this->display();
    // }

    public function dologin() {
        $proxy = ProxyService::instance()->login(Request::get('name'), Request::get('pwd'));
        $this->setProxyAuth($proxy);
        return $this->success('', Helper::url('Index/index'));
    }

    public function doreg() {
        exit;
        $admin = ProxyService::instance()->reg(Request::get('name'), Request::get('pwd'));
        return $this->success('', Helper::url('Index/index'));
    }

    // public function dostart() {
    //     $admin = ProxyService::instance()->start(Request::get('name'));
    //     return $this->success('', Helper::url('Index/index'));
    // }

	public function logout() {
		Session::flush();
		return Redirect::to(Helper::url("Public/login"));
	}
}
