<?php
namespace App\Application\System\Admin\Controllers;

use App\Application\System\Admin\Services\AgentService;
use App\Models\Agent\Bank;
use Time, Request, Helper, Lang;

class ApiWithdrawController extends EloquentController {
    protected $pageSize = 20;

    public function index() {
        if (!Request::all()) {
            Request::offsetSet('begin_time', Time::toDate(UTC_DAY));
            Request::offsetSet('end_time', Time::toDate(Time::toDayEndTime(UTC_DAY)));
        }

        return $this->authIndex();
    }

    public function notify() {
        $sn = Request::get('sn');
        $this->getService()->notify($sn, true);
        $this->createLog();
        return $this->updateItem($sn);
    }

	public function update() {
        $this->checkGoogleAndEmail('apiwithdrawupdate');
		$this->getService()->update(Request::all());
        $id = Request::get('id');
        $data = $this->getService()->getByMysql(Request::get('id'));
        $html = $this->ajaxListItem(['list' => [$data]]);
        return $this->successData($html);
    }
	
    public function export() {
        return $this->authExport();
    }
	
	
    private function updateItem($sn) {
        $data = $this->getService()->getBySn($sn);
        $html = $this->ajaxListItem(['list' => [$data]]);
        return $this->successData($html);
    }


}