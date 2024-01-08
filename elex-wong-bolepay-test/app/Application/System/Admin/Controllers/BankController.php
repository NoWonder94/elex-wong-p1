<?php
namespace App\Application\System\Admin\Controllers;

use Helper, Request, Lang;

class BankController extends EloquentController {
    protected function allDataShare($id = 0) {
        $mode = Request::get('mode', 'receive');
        $this->share('mode', $mode);
        $this->share('types', Lang::get("admin.bank.{$mode}_types"));
    }

    protected function detailDataShare($id = 0, $data = []) {
        $this->share('auto_types', Lang::get("admin.bank.auto_types"));
    }

    public function index() { 
        if (!Request::has('status')) {
            Request::offsetSet('status', 2);
        }

        if (!Request::has('mode')) {
            Request::offsetSet('mode', 'receive');
        }
        
        $servers = $this->getService()->getServers();
        $this->share('servers', $servers);
        return $this->authIndex();
    }

    public function add() {
        return $this->authAdd();
    }

    public function create() {
        $this->checkGoogleAndEmail('bank');
        return $this->authCreate([], Helper::url(APP_CONTROLLER_NAME.'/add', ['mode' => Request::get('mode')]));
    }

    public function edit() {
        return $this->authEdit();
    }

    public function update() {
        $this->checkGoogleAndEmail('bank');
        return $this->authUpdate([], Helper::url(APP_CONTROLLER_NAME.'/index', ['mode' => Request::get('mode')]));
    }

    public function toggle() {
        return $this->authToggle();
    } 

    public function soft() {
        $this->getService()->soft((int)Request::get('id'), trim(Request::get('action')), (int)Request::get('server_id'));
        $this->createLog();
        return $this->success(Lang::get('common.handler_success'), Helper::url('Bank/index'));
    } 
}