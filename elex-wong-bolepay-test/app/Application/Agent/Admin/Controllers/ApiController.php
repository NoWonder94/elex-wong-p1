<?php
namespace App\Application\Agent\Admin\Controllers;

use Request;

class ApiController extends AuthController {

    public function index() {
        return $this->display();
    }
}