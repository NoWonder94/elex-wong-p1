<?php
namespace App\Application\System\Callback\Controllers;

use App\Services\System\WithdrawPlatformService;
use Request;

class WithdrawController  extends BaseController {

	public function notify() {
		
        \Log::info('withdraw_notify:' . http_build_query(Request::all()));

        if (defined('WITHDRAW_CHANNEL_ID')) {
            $channel_id = WITHDRAW_CHANNEL_ID;
        } else {
            $channel_id = Request::get('channel');
        }

        if (empty($channel_id)) {
            exit;
        }
        $librarie = WithdrawPlatformService::instance()->getLibrarieById($channel_id);
        if (!$librarie) {
            exit;
        }

        $data = Request::all();

        echo $librarie->notify($data);
    }

}