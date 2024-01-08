<?php

namespace App\Application\Proxy\Controllers;
 
use App\Application\PagerController; 
use App\Models\Site\ProxyBank;
use App\Application\Proxy\Services\ProxyBankService;
use Lang, Request;
class ProxyBankController extends EloquentController { 
    use PagerController;

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

    public function option() {
        $result = ProxyBankService::instance()->option(Request::get('id'));
        if ($result === false) {
            return $this->error(Lang::get('root::common.update_error'));
        } 
        return $this->success(Lang::get('root::common.update_success'));
    }

}
