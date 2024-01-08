<?php

namespace App\Application\Www\Controllers;
  
use App\Services\SystemConfigService;
use Lang, Request;


class SystemConfigController extends EloquentController { 

    public function index() {  
        $config = SystemConfigService::instance()->getList();
        $data = [];
        foreach ($config as $value) {
            $data[$value['code']] = $value['val'];
        } 
        $this->share('data', $data);
        return $this->display();
    } 

    public function update() {
        return $this->authUpdate();
    } 

}
