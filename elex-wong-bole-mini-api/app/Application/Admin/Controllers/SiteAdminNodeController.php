<?php
namespace App\Application\Admin\Controllers;

use App\Application\PagerController;
use SystemCache, Lang;

class SiteAdminNodeController extends EloquentController {
	use PagerController;

	protected function allDataShare($id = 0) {
		$navs = SystemCache::get('site_admin_nav_all_trees');
		$this->share('navs', $navs);
	}

	protected function detailDataShare($id = 0) {
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

	protected function authStore() {
		$controllerAction = explode('/', $this->requestGet('controllerAction'));

		$inputs = $this->requestAll();
		$inputs['controller'] 	= $controllerAction[0];
		$inputs['action'] 		= $controllerAction[1];
		unset($inputs['controllerAction']);

		$admin_nodes = Lang::get('root::site_admin_nodes');
		$admin_node  = $admin_nodes[$inputs['controller']]['nodes'][$inputs['action']];
		if (isset($admin_node['show_menu']) && $admin_node['show_menu']) {
			$inputs['is_disabled_show'] 	= 0;
		} else {
			$inputs['is_disabled_show'] 	= 1;
			$inputs['is_show'] 			= 0;
		}

		if (isset($admin_node['no_log'])) {
			$inputs['is_disabled_log'] 	= 1;
			$inputs['is_log'] 			= 0;
		} else {
			$inputs['is_disabled_log'] 	= 0;
		}

		$this->replaceRequest($inputs);
		return parent::authStore();
	}
}