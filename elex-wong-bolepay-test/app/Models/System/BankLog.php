<?php
namespace App\Models\System;

use App\Models\Agent\Order;
use App\Utils\Calc;

class BankLog extends ElasticSearch {

    public function bank() {
        return $this->hasOne(Bank::class, 'id', 'bank_id');
    }

    public function order() {
        $relation = $this->hasOne(Order::class, 'bank_log_sn', 'sn');
        $relation->limit(2000);
        return $relation;
    }

    public function setDepositAttribute($value) {
        $this->attributes['deposit'] = Calc::mul($value, 100, 2);
    }

    public function getDepositAttribute() {
        return Calc::div($this->attributes['deposit'], 100, 2);
    }

    public function setWithdrawAttribute($value) {
        $this->attributes['withdraw'] = Calc::mul($value, 100, 2);
    }

    public function getWithdrawAttribute() {
        return Calc::div($this->attributes['withdraw'], 100, 2);
    }

    public function setBalanceAttribute($value) {
        $this->attributes['balance'] = Calc::mul($value, 100, 2);
    }

    public function getBalanceAttribute() {
        return Calc::div($this->attributes['balance'], 100, 2);
    }
}