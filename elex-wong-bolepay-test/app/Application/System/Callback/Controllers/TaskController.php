<?php
namespace App\Application\System\Callback\Controllers;

use App\Application\System\Callback\Services\TaskService;
class TaskController  extends BaseController {

    public function index() {
	TaskService::instance()->delData();	
        $this->success();
    }
}