<?php
namespace App\Application\Www\Controllers;

use App\Application\PagerController;
use App\Application\Www\Services\SiteAdminRoleService;

class SiteAdminController  extends EloquentController {
	use PagerController;

	protected function allDataShare($id = 0) {
		$this->share('roles', SiteAdminRoleService::instance()->lists());
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

    public function delete() {
        return $this->authDelete();
    }

    public function toggle() {
        return $this->authToggle();
    }
}