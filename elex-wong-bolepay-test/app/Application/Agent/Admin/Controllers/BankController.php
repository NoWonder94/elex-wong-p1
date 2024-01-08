<?php
namespace App\Application\Agent\Admin\Controllers;

use App\Services\System\VerifyService;
use Helper, Request, Lang;

class BankController extends EloquentController {
    protected $pageSize = 20;

    public function index() {
        if (!Request::has('status')) {
            Request::offsetSet('status', 2);
        }
        return $this->authIndex();
    }

    public function add() {
        $this->share('banks', Lang::get('admin.agent_bank_types'));
        return $this->authAdd();
    }

    public function create() {
        $this->checkGoogleAndEmail('bankadd');
        return $this->authCreate();
    }

    public function toggle() {
        return $this->authToggle();
    }
}