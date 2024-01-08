<?php
namespace App\Application\System\Callback\Controllers;

use App\Application\System\Callback\Services\OrderService;
use Request;

class OrderController extends BaseController {

    public function notify() {
        ignore_user_abort(true);
        set_time_limit(0);

        OrderService::instance()->notify(Request::get('sn'));
        $this->success();
    }

    public function notifys() {
        OrderService::instance()->notifys();
        $this->success();
    }

    public function expires() {
        OrderService::instance()->expires();
        $this->success();
    }

    public function finish() {
        ignore_user_abort(true);
        set_time_limit(0);

        OrderService::instance()->finish(Request::get('sn'));
        $this->success();
    }

    public function finishs() {
        OrderService::instance()->finishs();
        $this->success();
    }
    
    public function addressNotifys(){
        OrderService::instance()->addressNotifys();
        $this->success();
    }
    
    public function addressNotify(){
        OrderService::instance()->addressNotify(Request::get('address'));
        $this->success();
    }
}