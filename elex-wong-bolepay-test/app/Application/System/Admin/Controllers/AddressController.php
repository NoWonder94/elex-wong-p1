<?php
namespace App\Application\System\Admin\Controllers;

use Request,Lang;

class AddressController  extends EloquentController {
    protected $pageSize = 20;

    protected function allDataShare($id = 0) {
        $this->share('status', Lang::get('admin.address_status'));
    }
        
    public function index() {
        return $this->authIndex();
    }

    public function add() {
        return $this->authAdd();
    }

    public function create() {
        return $this->authCreate();
    }

    public function edit() {
        return $this->authEdit();
    }

    public function update() {
        return $this->authUpdate();
    }

   
}