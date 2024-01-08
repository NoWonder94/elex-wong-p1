<?php

namespace App\Application\Admin\Controllers;

class IndexController extends AuthController {
    public function index() {
    	return $this->display();
    }
}