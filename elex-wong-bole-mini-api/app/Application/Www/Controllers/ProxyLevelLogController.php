<?php

namespace App\Application\Www\Controllers;
   

class ProxyLevelLogController extends EloquentController {  

    public function index() {  
        return $this->authIndex();
    }   

}
