<?php
namespace App\Application\Agent\Admin\Controllers;

use App\Application\Agent\Admin\Services\BankService;

use Lang, Helper, Request, Time;

class WithdrawController extends EloquentController {
    protected $pageSize = 20;

    public function index() {
        if (!Request::all()) {
            Request::offsetSet('begin_time', Time::toDate(UTC_DAY - 86400));
            Request::offsetSet('end_time', Time::toDate(Time::toDayEndTime(UTC_DAY)));
        }

        $banks = BankService::instance()->lists();
        $this->share('banks', $banks);

        return $this->authIndex();
    }

    public function add() {
        if ($this->agent->money < 1) {
            return $this->error(Lang::get('admin.withdraw.money_error'), Helper::url('Withdraw/index'));
        }

        $banks = BankService::instance()->lists(['status' => 2]);
        if (count($banks) < 1) {
            return $this->error(Lang::get('admin.withdraw.bank_empty'), Helper::url('Bank/index'));
        }

        $this->share('max_money', $this->agent->money);
        $this->share('banks', $banks);
        $this->share('service_fee_types', Lang::get('admin.withdraw.service_fee_types'));
        return $this->authAdd();
    }

    public function create() {
        if ($this->agent->money < 1) {
            return $this->error(Lang::get('admin.withdraw.money_error'), Helper::url('Withdraw/index'));
        }

        $this->checkGoogleAndEmail('withdrawadd');

        return $this->authCreate(['agent' => $this->agent]);
    }
}