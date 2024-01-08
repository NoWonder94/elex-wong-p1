<?php

namespace App\Application\Admin\Controllers;
use Request, Lang, Config, Helper;

class AppController extends BaseController {
    public function getToken() {
        $sid = Request::post('sid');
        if (empty($sid) || strlen($sid) != 32) {
            $this->error([], Lang::get('lang.90001'));
        }

        $client = Request::post('client');
        if (empty($client) || !in_array($client, Config('app.available_device_type_list'))) {
            $this->error([], Lang::get('lang.90002'));
        }

        $this->token    = [
            'sid'       => $sid,
            'client'    => $client,
            'ip'        => CLIENT_IP,
            'host'      => HTTP_HOST,
            'uid'       => 0,
            'time'      => UTC_CURRENT_TIME,
        ];
        $this->isShowToken = true;

        $this->success();
    }
}