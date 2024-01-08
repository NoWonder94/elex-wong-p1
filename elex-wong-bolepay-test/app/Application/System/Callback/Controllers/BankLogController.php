<?php
namespace App\Application\System\Callback\Controllers;

use App\Application\System\Callback\Services\BankLogService;
use Request;

class BankLogController extends BaseController {

    public function __construct() {
        parent::__construct();

        ignore_user_abort(true);
        set_time_limit(0);
    }

    public function updateStatus() {
        BankLogService::instance()->updateStatus((int)Request::get('bank_id'), Request::get('sn'));
        $this->success();
    }
}