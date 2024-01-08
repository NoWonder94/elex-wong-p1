<?php

namespace App\Application\Www\Controllers;

use App\Application\PagerController; 
use App\Models\Site\Proxy;
use App\Application\Www\Services\ProxyService;
use App\Application\Www\Services\ProxyLevelService;
use Lang, Request;


class ProxyController extends EloquentController { 
    use PagerController;

    public function index() { 
        $lists = ProxyLevelService::instance()->lists();
        $level_keys[] = 0;
        $level_values[] = '所有代理';
        foreach ($lists as $item) {
            $level_keys[] = $item['id'];
            $level_values[] = $item['name'];
        }
        $this->share('level_keys', $level_keys);
        $this->share('level_values', $level_values);
        return $this->authIndex();
    } 

    public function edit() { 
        $lists = ProxyLevelService::instance()->lists();
        $level_keys = [];
        $level_values = [];
        foreach ($lists as $item) {
            $level_keys[] = $item['id'];
            $level_values[] = $item['name'];
        }
        $this->share('level_keys', $level_keys);
        $this->share('level_values', $level_values);
        return $this->authEdit();
    }

    public function update() {
        return $this->authUpdate();
    }

    public function option() {
        $result = ProxyService::instance()->option(Request::get('id'), Request::get('status'), Request::get('remark'));
        if ($result === false) {
            return $this->error(Lang::get('root::common.update_error'));
        } 
        return $this->success(Lang::get('root::common.update_success'));
    }

    public function toggle() {
        return $this->authToggle();
    }

}
