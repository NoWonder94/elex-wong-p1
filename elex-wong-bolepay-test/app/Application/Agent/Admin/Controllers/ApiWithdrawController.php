<?php
namespace App\Application\Agent\Admin\Controllers;

use App\Models\Agent\Bank;
use Time, Request, Helper, Lang;

class ApiWithdrawController extends EloquentController {
    protected $pageSize = 20;

    public function index() {
        if (!Request::all()) {
            Request::offsetSet('begin_time', Time::toDate(UTC_DAY));
            Request::offsetSet('end_time', Time::toDate(Time::toDayEndTime(UTC_DAY)));
        }

        return $this->authIndex( 'index',['type' => 'my','agent' => $this->agent]);
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
        $this->createLog();
        return $this->updateItem($sn);
    }


	
    public function export() {
        return $this->authExport('export', ['agent' => $this->agent]);
    }
	
	
    private function updateItem($sn) {
        $data = $this->getService()->getBySn($sn);
        $html = $this->ajaxListItem(['list' => [$data]]);
        return $this->successData($html);
    }


}