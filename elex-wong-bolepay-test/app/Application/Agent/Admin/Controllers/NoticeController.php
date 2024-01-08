<?php
namespace App\Application\Agent\Admin\Controllers;

use Request;

class NoticeController extends EloquentController {
    protected $pageSize = 20;

    public function index() {
        return $this->authIndex();
    }

    public function receive() {
        return $this->successData($this->getService()->receiveNotice());
    }

    public function read() {
        $this->getService()->readNotice(Request::get('id'));
        return $this->successData();
    }
}