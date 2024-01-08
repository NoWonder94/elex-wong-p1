<?php
namespace App\Application\System\Admin\Controllers;

use App\Services\System\VerifyService;
use Request;

class ProxyController extends EloquentController {
    use AgentController;

    protected $pageSize = 20;

    public function create() {
        $this->checkGoogleAndEmail('proxy');
        return $this->authCreate();
    }

    public function update() {
        $this->checkGoogleAndEmail('proxy');
        return $this->authUpdate();
    }


    public function search() {
        $list = $this->getService()->searchProxy(Request::get('name'));
        return $this->successData($list);
    }
}