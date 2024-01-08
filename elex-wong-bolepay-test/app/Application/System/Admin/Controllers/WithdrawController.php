<?php
namespace App\Application\System\Admin\Controllers;

use App\Application\System\Admin\Services\AgentService;
use App\Models\Agent\Bank;
use App\Services\System\PaymentService;
use Time, Request, Helper, Lang;

class WithdrawController extends EloquentController {
    protected $pageSize = 20;

    public function index() {
        if (!Request::all()) {
            Request::offsetSet('begin_time', Time::toDate(UTC_DAY));
            Request::offsetSet('end_time', Time::toDate(Time::toDayEndTime(UTC_DAY)));
        }

        $this->share('platform_names', PaymentService::instance()->getCacheByCode('platform_names'));
        return $this->authIndex();
    }

    public function add() {
        $agent_id = (int)Request::get('agent_id');
        if ($agent_id < 1) {
            $this->throwException('', '', '请选择要提现的代理或商户');
        }

        $agent = AgentService::instance()->getById($agent_id);
        if (!$agent) {
            $this->throwException('', '', '代理或商户不存在');
        }

        $this->share('agent', $agent);

        $banks = Bank::where('agent_id', $agent_id)->where('status', 1)->get();
        $this->share('banks', $banks);

        $this->share('bank_types', Lang::get('admin.agent_bank_types'));

        return $this->authAdd();
    }

    public function create() {
        $this->checkGoogleAndEmail('withdrawadd');
        return $this->authCreate([], Helper::url(APP_CONTROLLER_NAME.'/index'));
    }

    public function update() {
        $this->checkGoogleAndEmail('withdrawupdate');
        $this->authUpdate();

        $data = $this->getService()->getByMysql(Request::get('id'));
        $html = $this->ajaxListItem(['list' => [$data]]);
        return $this->successData($html);
    }

    public function platforms(){
        $data = $this->getService()->platforms();
        return $this->successData($data);
    }

    public function gotothree(){
        $id = (int)Request::get('id');
        $code = Request::get('code');
        $this->getService()->gotothree($id, $code, (float)Request::get('really_money'), (float)Request::get('service_fee'));
        return $this->success();
    }
}