<?php

namespace App\Application\Api\Controllers;
use App\Application\Api\Models\User;
use Request, Lang;

class AuthController extends BaseController{
    private $pathException = [
        'User/login',
    ];

    public function __construct() {
        parent::__construct();

        if (!in_array(CONTROLLER_NAME . '/' . ACTION_NAME, $this->pathException)) {
			$this->verifyUserToken();
		}
    }

    public function verifyUserToken() {
        $this->loginStatus = -1;
        if($this->token['uid'] <= 0) {
            $this->error([], Lang::get('lang.90004'));
        }

        $this->info = User::findById($this->token['uid'], true);
        if(empty($this->info)) {
            $this->error([], Lang::get('lang.90005'));
        }

        if($this->info['login_time'] < $this->token['time']) {
            $this->error([], Lang::get('lang.90006'));
        }

        if($this->info['logout_time'] >= $this->token['time']) {
            $this->error([], Lang::get('lang.90007'));
        }

        $this->loginStatus = 1;
    }
}

?>
