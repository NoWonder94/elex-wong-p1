<?php
namespace App\Application\Agent\Admin\Controllers;

class ProxyController extends EloquentController {
    use AgentChildController;

    protected $pageSize = 20;

    public function create() {
        $this->checkGoogleAndEmail('proxyadd');
        return $this->authCreate(['agent' => $this->agent]);
    }

    public function update() {
        $this->checkGoogleAndEmail('proxyedit');
        return $this->authUpdate(['agent' => $this->agent]);
    }
}