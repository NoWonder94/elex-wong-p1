<?php

namespace App\Application\Www\Controllers;

use App\Application\Www\Services\CallLogService;
use Request;

class DownController extends BaseController {
	
    public function voice() {
		$uri = CallLogService::instance()->getRecordBySid(Request::get('sid'), $this->site->config['twilio']);
    	echo $uri;
    }
}
