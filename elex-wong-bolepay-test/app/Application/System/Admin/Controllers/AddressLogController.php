<?php
namespace App\Application\System\Admin\Controllers;

use Request,Lang;

class AddressLogController  extends EloquentController {
    protected $pageSize = 20;

   
    public function index() {
        return $this->authIndex();
    }

  
}