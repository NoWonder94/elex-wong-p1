<?php
namespace App\Application\Www\Controllers;

use App\Application\Www\Services\TwilioService;
use App\Application\Www\Services\CallLogService;
use App\Application\Www\Services\SmsLogService;
use App\Application\Www\Services\SmsTplService;
use App\Application\PagerController;
use Request, Lang, Helper;

class UserController  extends EloquentController {
	use PagerController;
	
	protected function getSmsLogService() {
		return SmsLogService::instance();
	}
	
	protected function getCallLogService() {
		return CallLogService::instance();
	}
	
	protected function getSmsTplService() {
		return SmsTplService::instance();
	}

    public function index() {
        $sms_tpls = $this->getSmsTplService()->getList();
        $this->share('sms_tpls', $sms_tpls);
		$this->share('api_type', $this->site['config']['type']);
        return $this->authIndex();
    }
	
    public function add() {
        return $this->authAdd();
    }

    public function create() {
        return $this->authCreate();
    }
	
	public function edit() {
        return $this->authEdit();
    }

    public function update() {
        return $this->authUpdate();
    }

    public function delete() {
        return $this->authDelete();
    }
	
	public function import() {
        return $this->display();
    }

    public function doimport() {
        $this->getService()->import(Request::file('users'));
		// $this->createLog();
        return $this->success(Lang::get('root::common.import_success'), Helper::url(APP_CONTROLLER_NAME . '/index'));
    }

    public function token() {
        $result = $this->getCallLogService()->getToken($this->site['config']);
        return $this->successData($result);
    }

    public function call() {
        $result = $this->getCallLogService()->create(Request::all());
        $this->createLog();
        return $this->successData($result);
    }

    public function callremark() {
        $result = $this->getCallLogService()->remark(Request::get('id'), trim(Request::get('remark')));
        $this->createLog();
        return $this->successData($result);
    }

    public function sms() {
        $data = Request::all();
        $data['config'] = $this->site['config'];
        $result = $this->getSmsLogService()->create($data);
        $this->createLog();
        return $this->successData($result);
    }
}