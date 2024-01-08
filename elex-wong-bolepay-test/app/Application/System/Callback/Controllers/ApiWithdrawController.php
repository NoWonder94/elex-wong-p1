<?php
namespace App\Application\System\Callback\Controllers;

use App\Services\Agent\ApiWithdrawService;
use Request;

class ApiWithdrawController  extends BaseController {

    public function notify() {
        ignore_user_abort(true);
        set_time_limit(0);

        ApiWithdrawService::instance()->notify(Request::get('sn'));
        $this->success();
    }

}