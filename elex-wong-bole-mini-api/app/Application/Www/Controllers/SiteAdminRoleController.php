<?php
namespace App\Application\Www\Controllers;

use SystemCache, Lang;

class SiteAdminRoleController extends EloquentController {
	protected function detailDataShare($id = 0) {
        $this->share('admin_navs', SystemCache::get('site_admin_navs'));
        $admin_nodes = Lang::get('root::site_admin_nodes');
        $this->share('admin_nodes', $admin_nodes);
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