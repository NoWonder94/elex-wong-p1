<?php

namespace App\Application\Www\Controllers;
 
use App\Application\PagerController;  
use App\Application\Www\Services\ProxyCommissionService;
use Lang, Request;
class ProxyCommissionController extends EloquentController { 
    use PagerController;

    public function index() {  
        return $this->authIndex();
    }  

    public function option() {
        $result = ProxyCommissionService::instance()->option(Request::get('id'), Request::get('status'), floatval(Request::get('prize_pool')), Request::get('remark'));
        return $this->success(Lang::get('root::common.update_success'));
    }

}
