<?php
namespace App\Application\System\Api\Controllers;

use App\Application\System\Api\Services\OrderService;
use Request;

class OrderController  extends BaseController {

	public function test() {
        OrderService::instance()->pay(6, 500);
    }
}