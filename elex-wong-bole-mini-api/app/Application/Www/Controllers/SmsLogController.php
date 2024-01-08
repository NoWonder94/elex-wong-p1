<?php
namespace App\Application\Www\Controllers;

use App\Application\PagerController;

class SmsLogController  extends EloquentController {
	use PagerController;

    public function index() {
        return $this->authIndex();
    }
}