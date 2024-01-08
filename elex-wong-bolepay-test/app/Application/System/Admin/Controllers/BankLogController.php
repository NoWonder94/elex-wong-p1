<?php
namespace App\Application\System\Admin\Controllers;

use App\Application\System\Admin\Services\BankService;
use Request, Time, Lang;

class BankLogController extends EloquentController {
    protected $pageSize = 20;

    public function index() {
        if (!Request::all()) {
            Request::offsetSet('begin_time', Time::toDate(UTC_DAY - 86400, 'Y-m-d'));
            Request::offsetSet('end_time', Time::toDate(UTC_DAY, 'Y-m-d'));
        }

        $banks = BankService::instance()->lists();
        $this->share('banks', $banks);

        $this->share('status_list', Lang::get('admin.bank_log.related_status'));

        return $this->authIndex();
    }
}