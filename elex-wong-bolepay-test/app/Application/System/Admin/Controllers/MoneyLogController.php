<?php
namespace App\Application\System\Admin\Controllers;

use Time, Request;

class MoneyLogController extends EloquentController {
    protected $pageSize = 20;

    public function index() {
        if (!Request::all()) {
            Request::offsetSet('begin_time', Time::toDate(UTC_DAY));
            Request::offsetSet('end_time', Time::toDate(Time::toDayEndTime(UTC_DAY)));
        }

        return $this->authIndex('index');
    }

    public function modify() {
        if (!Request::all()) {
            Request::offsetSet('begin_time', Time::toDate(UTC_DAY));
            Request::offsetSet('end_time', Time::toDate(Time::toDayEndTime(UTC_DAY)));
        }

        return $this->authIndex('modify', ['type' => ['admin_modify']]);
    }
}