<?php
namespace App\Application\Site\Api\Controllers;

use App\Application\Site\Api\Services\UserService;
use App\Application\Site\Api\Services\UserNoticeService;
use App\Services\Site\GamePlatformService;
use Request;

class UserController extends AuthController {
    public function get() {
    	$user = $this->user->toArray();
    	$user['msg_count'] = UserNoticeService::instance()->receiveNotice($this->user);
    	$this->success($user);
    }

    public function syncreg() {
    	GamePlatformService::instance()->syncReg($this->user);
        $this->success();
    }

    public function repwd() {
    	$oldpwd  = trim(Request::get('oldpwd'));
    	$newpwd  = trim(Request::get('newpwd'));
        if (empty($oldpwd)) {
            $this->error('common.user.old_pwd_error', 'oldpwd');
        }

        if (empty($newpwd) || strlen($newpwd) < 6 || strlen($newpwd) > 20) {
            $this->error('common.user.new_pwd_error', 'newpwd');
        }

        UserService::instance()->updatePwd($this->user, $oldpwd, $newpwd);
        $this->resetToken(0);
        $this->success();
    }
}