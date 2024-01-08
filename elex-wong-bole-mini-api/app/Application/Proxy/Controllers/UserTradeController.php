<?php

namespace App\Application\Proxy\Controllers;
 
use App\Application\PagerController;  
use Lang, Request;
class UserTradeController extends EloquentController { 
    use PagerController;

    public function index() {  
        return $this->authIndex();
    }  

}
