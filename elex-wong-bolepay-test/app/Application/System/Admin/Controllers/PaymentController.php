<?php
namespace App\Application\System\Admin\Controllers;

use Lang;

class PaymentController extends EloquentController {

    protected function detailDataShare($id = 0, $data = []) {
        if($id > 0){
            $payments = $this->getService()->getPaymentsByChannel($data);
            $this->share('payments', $payments);
        }
        
        $this->share('channels', Lang::get('common.channel'));
    }

    public function index() {
        return $this->authIndex();
    }

    public function add() {
        return $this->authAdd();
    }

    public function create() {
        $this->checkGoogleAndEmail('payment');
        return $this->authCreate();
    }

    public function edit() {
        return $this->authEdit();
    }

    public function update() {
        $this->checkGoogleAndEmail('payment');
        return $this->authUpdate();
    }

    public function toggle() {
        return $this->authToggle();
    }
}