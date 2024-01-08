<?php
namespace App\Application\Site\Api\Controllers;

use App\Application\Site\Api\Services\ProxyService; 
use Request;

class ProxyController extends AuthController { 

    public function reg() {
        ProxyService::instance()->save($this->user);
        $this->success();
    }

}