<?php
namespace App\Application\System\Admin\Controllers;

class NoticeController  extends EloquentController {
    protected $pageSize = 20;

    public function index() {   
        return $this->authIndex();
    }
	
    public function add() {
        return $this->authAdd();
    }

    public function create() {
        $this->checkGoogleAndEmail('notice');
        return $this->authCreate();
    }
	
	public function edit() {
        return $this->authEdit();
    }

    public function update() {
        $this->checkGoogleAndEmail('notice');
        return $this->authUpdate();
    }

    public function toggle() {
        return $this->authToggle();
    }
}