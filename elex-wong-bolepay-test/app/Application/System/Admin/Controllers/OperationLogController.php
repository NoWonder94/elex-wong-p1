<?php
namespace App\Application\System\Admin\Controllers;

use Request, Time;

class OperationLogController  extends EloquentController {
    protected $pageSize = 20;

    public function index() {
        if (!Request::all()) {
            Request::offsetSet('begin_time', Time::toDate(UTC_DAY - 86400, 'Y-m-d'));
            Request::offsetSet('end_time', Time::toDate(UTC_DAY, 'Y-m-d'));
		}
        return $this->authIndex();
    }
}