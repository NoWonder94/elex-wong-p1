<?php
namespace App\Application\Www\Controllers;

use App\Application\PagerController;

class OperationLogController  extends EloquentController {
	use PagerController;

    public function index() {
        return $this->authIndex();
    }
}