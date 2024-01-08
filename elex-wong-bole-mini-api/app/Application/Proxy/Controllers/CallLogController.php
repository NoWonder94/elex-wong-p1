<?php
namespace App\Application\Www\Controllers;

use App\Application\PagerController;
use Request;

class CallLogController  extends EloquentController {
	use PagerController;

    public function index() {
        return $this->authIndex();
    }
	
	public function record() {
		$uri = $this->getService()->getRecord(Request::get('id'), $this->site->config['twilio']);
		return $this->successData($uri);
	}
}