<?php

namespace App\Application\Api\Controllers;
use Request, Lang, Helper;

class BaseController extends \App\Application\BaseController {
    private $pathException = [
		'App/getToken',
	];

    public function __construct() {
        parent::__construct();

        if (!in_array(CONTROLLER_NAME . '/' . ACTION_NAME, $this->pathException)) {
            $this->verifyBaseToken();
        }
    }

    public function verifyBaseToken() {
        $authorization = Request::header('Authorization');
        if(empty($authorization)) {
            $this->error([], Lang::get('lang.90003'));
        }
        $authorization = substr($authorization, 7);

        try {
            $this->token = Helper::decryptData($authorization);
        } catch(\Exception $e) {
            $this->loginStatus = -1;
            $this->error([], Lang::get('lang.90003'));
        }

        if(!isset($this->token['uid'])) {
            $this->loginStatus = -1;
            $this->error([], Lang::get('lang.90004'));
        }
    }

    public function refreshToken($info) {
        $this->info             = $info;
        $this->token['uid']     = $info['id'];
        $this->token['time']    = UTC_CURRENT_TIME;
        $this->isShowToken      = true;
        $this->loginStatus      = 1;
    }
}