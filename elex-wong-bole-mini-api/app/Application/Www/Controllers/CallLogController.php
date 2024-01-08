<?php
namespace App\Application\Www\Controllers;

use App\Application\PagerController;
use Request;

class CallLogController  extends EloquentController {
	use PagerController;

    public function index() {
        return $this->authIndex();
    }
	
	public function export() {
		$url = $this->getService()->export(Request::all());
		$this->createLog();
		$this->share('url', $url);
		return $this->display();
	}
}