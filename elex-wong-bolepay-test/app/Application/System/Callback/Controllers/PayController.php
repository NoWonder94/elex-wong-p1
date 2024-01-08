<?php
namespace App\Application\System\Callback\Controllers;

use App\Services\System\PaymentService;
use Request;

class PayController  extends BaseController {

	public function notify() {
        \Log::info(http_build_query(Request::all()));

        if (defined('PAY_CHANNEL_ID')) {
            $channel_id = PAY_CHANNEL_ID;
        } else {
            $channel_id = Request::get('channel');
        }

        if (empty($channel_id)) {
            exit;
        }

        $librarie = PaymentService::instance()->getLibrarieById($channel_id);
        if (!$librarie) {
            exit;
        }

        $data = Request::all();
        unset($data['channel']);

        echo $librarie->notify($data);
    }

    public function jsonnotify() {
        $data = file_get_contents('php://input');
        \Log::info($data);

        if (defined('PAY_CHANNEL_ID')) {
            $channel_id = PAY_CHANNEL_ID;
        } else {
            $channel_id = Request::get('channel');
        }

        if (empty($channel_id)) {
            exit;
        }

        $data = empty($data) ? false : @json_decode($data, true);
        if (!$data) {
            exit;
        }

        $librarie = PaymentService::instance()->getLibrarieById($channel_id);
        if (!$librarie) {
            exit;
        }

        echo $librarie->notify($data);
    }

    public function bbnotify() {
	    \Log::info(http_build_query(Request::all()));

        $channel_id = Request::get('attach');
        if (empty($channel_id)) {
            exit;
        }

        $librarie = PaymentService::instance()->getLibrarieById($channel_id);
        if (!$librarie) {
            exit;
        }

        echo $librarie->notify(Request::all());
    }

    public function applenotify()
    {
        \Log::info(http_build_query(Request::all()));

        $channel_id = Request::get('attch');
        if (empty($channel_id)) {
            exit;
        }

        $librarie = PaymentService::instance()->getLibrarieById($channel_id);
        if (!$librarie) {
            exit;
        }

        echo $librarie->notify(Request::all());
    }
	
	public function hhnotify() {
	    \Log::info(http_build_query(Request::all()));

        $channel_id = 10039;

        $librarie = PaymentService::instance()->getLibrarieById($channel_id);
        if (!$librarie) {
            exit;
        }

        echo $librarie->notify(Request::all());
    }
    
}