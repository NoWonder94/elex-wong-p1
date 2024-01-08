<?php
namespace App\Application\Admin\Controllers;

use App\Application\Admin\Services\AdminService;
use Redirect, Helper, Session, AppException;

abstract class AuthController extends BaseController {

	public function __construct() {
		parent::__construct();

        //初始化帐号权限
        $admin_auth = Session::get('admin_auth');
        if (!$admin_auth) {
            $this->redirectLogin();
        }
        
        //获取最新帐号信息
        try {
            $admin = AdminService::instance()->auth($admin_auth['id'], $admin_auth['pwd']);
        } catch(AppException $e) {
            $this->setAdminAuth(null);
            $e->setUrl(Helper::url('Public/login'));
            throw $e;
        }
        $this->setAdminAuth($admin);
	}

    protected function redirectLogin() {
        $this->setAdminAuth(null);
        $this->setReturnUrl();
        if ($this->isAjax) {
            die(Helper::jsonEncode(['status' => false, 'login' => true]));
        } else {
            Redirect::to(Helper::url('Public/login'))->send();
        }
    }

    protected function createLog() {}
}