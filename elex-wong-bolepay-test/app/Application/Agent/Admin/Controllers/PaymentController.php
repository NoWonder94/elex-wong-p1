<?php
namespace App\Application\Agent\Admin\Controllers;

use App\Application\Agent\Admin\Services\PaymentService;
use Request;

class PaymentController extends AuthController {

    public function index() {
        $payments  = PaymentService::instance()->getPayments($this->agent, false);
        $this->share('payments', $payments);
        return $this->display();
    }

    public function confirm() {
        PaymentService::instance()->confirm(Request::get('id'));
        return $this->successData();
    }
}