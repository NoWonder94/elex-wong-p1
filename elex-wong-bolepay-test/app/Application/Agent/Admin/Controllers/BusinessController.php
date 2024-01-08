<?php
namespace App\Application\Agent\Admin\Controllers;

use App\Services\System\VerifyService;
use Request;

class BusinessController extends EloquentController {
    use AgentChildController;

    protected $pageSize = 20;

    public function create() {
        $this->checkGoogleAndEmail('businessadd');
        return $this->authCreate(['agent' => $this->agent]);
    }

    public function update() {
        $this->checkGoogleAndEmail('businessedit');
        return $this->authUpdate(['agent' => $this->agent]);
    }
}