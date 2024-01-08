<?php
namespace App\Application\Admin\Controllers;

use SystemCache;

class SiteAdminNavController extends EloquentController {
    
    public function index() {
        return $this->authIndex();
    }

    protected function detailDataShare($id = 0) {
        $admin_navs = SystemCache::get('site_admin_navs');
        if ($id > 0) {
            unset($admin_navs[$id]);
        }
        $this->share('navs', $admin_navs);
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
}