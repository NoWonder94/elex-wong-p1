<?php
namespace App\Application\Agent\Admin\Controllers;

use App\Application\Agent\Admin\Services\PaymentService;
use Request, Time;

class OrderController extends EloquentController {
    protected $pageSize = 20;

    public function index() {
		
        if (!Request::all()) {
            Request::offsetSet('begin_time', Time::toDate(UTC_DAY));
            Request::offsetSet('end_time', Time::toDate(Time::toDayEndTime(UTC_DAY)));
        }
		
		$all_payments  = PaymentService::instance()->getPayments($this->agent, true);
		$payments = [];
		foreach($all_payments as $key=>$val){
			if($val['status'] == 1){
				$payments[$key] = $val;
			}
		}
        $this->share('payments', $payments);

        return $this->authIndex('index', ['type' => 'my','agent' => $this->agent]);
    }

    public function under() {
        if (!Request::all()) {
            Request::offsetSet('begin_time', Time::toDate(UTC_DAY));
            Request::offsetSet('end_time', Time::toDate(Time::toDayEndTime(UTC_DAY)));
        }

        return $this->authIndex('under', ['type' => 'under', 'agent' => $this->agent]);
    }

    public function notify() {
        $sn = Request::get('sn');
        $this->getService()->notify($sn, true);
        $data = $this->getService()->getOrderBySn($sn);
        $html = $this->ajaxListItem(['list' => [$data]]);
        return $this->successData($html);
    }

    public function export() {
        return $this->authExport('export', ['agent' => $this->agent]);
    }
}