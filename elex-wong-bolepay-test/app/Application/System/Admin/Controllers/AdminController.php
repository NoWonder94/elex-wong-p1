<?php
namespace App\Application\System\Admin\Controllers;

use App\Application\System\Admin\Services\AdminRoleService;
use App\Services\System\VerifyService;
use Request;

class AdminController  extends EloquentController {
	protected $pageSize = 20;

	protected function allDataShare($id = 0) {
		$this->share('roles', AdminRoleService::instance()->lists());
	}

    public function index() {
        return $this->authIndex();
    }

    public function add() {
        return $this->authAdd();
    }

    public function create() {
	    $this->checkGoogleAndEmail('admin');
        return $this->authCreate();
    }

    public function edit() {
        return $this->authEdit();
    }

    public function update() {
        $this->checkGoogleAndEmail('admin');
        return $this->authUpdate();
    }

    public function toggle() {
        return $this->authToggle();
    }
}