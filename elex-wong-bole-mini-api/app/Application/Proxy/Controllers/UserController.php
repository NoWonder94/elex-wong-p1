<?php
namespace App\Application\Proxy\Controllers;
 
use App\Application\PagerController;
use Request, Lang, Helper;

class UserController  extends EloquentController {
	use PagerController;

    public function index() { 
        return $this->authIndex();
    } 

    public function edit() {
        return $this->authEdit();
    }
 
}