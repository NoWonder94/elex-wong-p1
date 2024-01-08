<?php
namespace App\Application\System\Admin\Controllers;

use App\Application\System\Admin\Services\AdminNavService;
use SystemCache, Lang;

class AdminRoleController extends EloquentController {
	protected function detailDataShare($id = 0, $data = []) {
        $this->share('admin_navs', AdminNavService::instance()->getNavs());
        $admin_nodes = Lang::get('system_admin_nodes');
        $this->share('admin_nodes', $admin_nodes);
    }

    public function index() {
        return $this->authIndex();
    }

    public function add() {
        return $this->authAdd();
    }

    public function create() {
        $this->checkGoogleAndEmail('adminrole');
        return $this->authCreate();
    }

    public function edit() {
        return $this->authEdit();
    }

    public function update() {
        $this->checkGoogleAndEmail('adminrole');
        return $this->authUpdate();
    }

    public function delete() {
        return $this->authDelete();
    }

    public function toggle() {
        return $this->authToggle();
    }
}