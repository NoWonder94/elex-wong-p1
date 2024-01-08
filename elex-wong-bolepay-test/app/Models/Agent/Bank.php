<?php 
namespace App\Models\Agent;

use Lang;

class Bank extends Base {
    public $isCreateTime = true;

    protected $appends = ['short_name', 'full_name'];

    public function getFullNameAttribute() {
        $bank = $this->attributes['bank'];
        $payee = $this->attributes['payee'];
        $bank_no = $this->attributes['bank_no'];

        return "{$bank} {$payee} ({$bank_no})";
    }

    public function getShortNameAttribute() {
        $bank = $this->attributes['bank'];
        $payee = $this->attributes['payee'];
        $bank_no = $this->attributes['bank_no'];
        if (strlen($bank_no) > 8) {
            $bank_no = substr($bank_no, -8, 8);
        }
        return "{$bank} {$payee} ({$bank_no})";
    }

    public function getInfo() {
        $bank = $this->attributes['bank'];
        $payee = $this->attributes['payee'];
        $bank_no = $this->attributes['bank_no'];
        $bank_address = $this->attributes['bank_address'];
        if($bank == 'USDT'){
            $info = Lang::format('common.bank.address_info', [$bank, $payee, $bank_no]);
        }else{
            $info = Lang::format('common.bank.bank_info', [$bank, $payee, $bank_no]);
        }
        if (!empty($bank_address)) {
            $info .= Lang::format('common.bank.address_info', $bank_address);
        }
        return $info;
    }
}