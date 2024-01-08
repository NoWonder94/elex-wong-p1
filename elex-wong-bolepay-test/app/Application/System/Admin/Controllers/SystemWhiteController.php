<?php
namespace App\Application\System\Admin\Controllers;

use App\Services\System\SettingService;
use Request, Lang;

class SystemWhiteController extends AuthController {

    public function index() {
        $this->share('data', SettingService::instance()->lists());
        return $this->display();
    }

    public function update() {
        $this->checkGoogleAndEmail('systemwhite');
        SettingService::instance()->update(Request::all());
        $this->createLog();
        return $this->success(Lang::get('common.update_success'));
    }
}