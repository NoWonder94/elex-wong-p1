<?php
namespace App\Application\System\Admin\Controllers;

use App\Services\System\PaymentService;
use Request, View, Time;

class OrderController extends EloquentController {
    protected $pageSize = 20;

    public function index() {
        if (!Request::all()) {
            Request::offsetSet('begin_time', Time::toDate(UTC_DAY));
            Request::offsetSet('end_time', Time::toDate(Time::toDayEndTime(UTC_DAY)));
        }

        $payments = PaymentService::instance()->getCacheByCode('payments');
		$able_payments = [];
		foreach($payments as $key => $val){
			if($val['status'] == 1){
				$able_payments[$key] = $val;
			}
		}
		
        $this->share('payment_platforms', PaymentService::instance()->getCacheByCode('payment_platforms'));
        $this->share('payments', $payments);
		$this->share('able_payments',$able_payments);
        return $this->authIndex();
    }

    public function update() {
        $this->checkGoogleAndEmail('orderpay');
        $sn = Request::get('sn');
        $this->getService()->update(Request::all());
        return $this->updateItem($sn);
    }

    public function notify() {
        $sn = Request::get('sn');
        $this->getService()->notify($sn, true);
        $this->createLog();
        return $this->updateItem($sn);
    }

    public function finish() {
        $sn = Request::get('sn');
        $this->getService()->finish($sn);
        $this->createLog();
        return $this->updateItem($sn);
    }

    private function updateItem($sn) {
        $data = $this->getService()->getOrderBySn($sn);
        $html = $this->ajaxListItem(['list' => [$data]]);
        return $this->successData($html);
    }

    public function export() {
        return $this->authExport();
    }
}