<?php
namespace App\Application\System\Admin\Controllers;

use App\Services\System\VerifyService;
use Request;

class BusinessController extends EloquentController {
    use AgentController;

    protected $pageSize = 20;

    public function create() {
        $this->checkGoogleAndEmail('business');
        return $this->authCreate();
    }

    public function update() {
        $this->checkGoogleAndEmail('business');
        return $this->authUpdate();
    }
}