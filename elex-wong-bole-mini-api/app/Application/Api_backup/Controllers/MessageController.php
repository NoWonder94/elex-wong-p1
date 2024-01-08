<?php
namespace App\Application\Site\Api\Controllers;

use App\Application\Site\Api\Services\UserNoticeService;
use Request;

class MessageController extends AuthController {
    public function lists() {
		$result = UserNoticeService::instance()->lists($this->userId, (int)Request::get('page'));
		$this->success($result);
    }

    public function read() {
		$ids = trim(Request::get('id'));
		if (empty($ids)) {
			$this->success();
		}

    	UserNoticeService::instance()->readUserNotice($this->userId, $ids);
		$this->success();
    }

    public function delete() {
		$ids = trim(Request::get('id'));
		if (empty($ids)) {
			$this->success();
		}

    	UserNoticeService::instance()->removeUserNotice($this->userId, $ids);
		$this->success();
    }
}