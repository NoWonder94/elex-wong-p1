<?php

namespace App\Application\Www\Controllers;
 
use App\Application\PagerController; 
use App\Models\Site\ProxyWithdraw;
use App\Application\Www\Services\ProxyWithdrawService;
use Lang, Request;
class ProxyWithdrawController extends EloquentController { 
    use PagerController;

    public function index() {  
        return $this->authIndex();
    } 

    public function option() {
        $result = ProxyWithdrawService::instance()->option(Request::get('id'), Request::get('status'), Request::get('remark'));
        if ($result === false) {
            return $this->error(Lang::get('root::common.update_error'));
        } 
        return $this->success(Lang::get('root::common.update_success'));
    }

}
