<?php

namespace App\Application\Www\Controllers;
 
use App\Application\PagerController;  
use Lang, Request;
class UserTradeController extends EloquentController { 
    use PagerController;

    public function index() {  
        return $this->authIndex();
    }  

}
