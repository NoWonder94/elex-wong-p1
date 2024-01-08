<?php 
namespace App\Models\Agent;

use App\Models\System\Agent;
use App\Utils\Calc;

class Withdraw extends MySqlElasticSearch {
	protected $keyType = 'float';

    public function bank() {
        return $this->hasOne(Bank::class, 'id', 'bank_id');
    }

    public function agent() {
        return $this->hasOne(Agent::class, 'id', 'agent_id');
    }

    public function setMoneyAttribute($value) {
        $this->attributes['money'] = Calc::mul($value, 100, 2);
    }

    public function getMoneyAttribute() {
        return Calc::div($this->attributes['money'], 100, 2);
    }

    public function setReallyMoneyAttribute($value) {
        $this->attributes['really_money'] = Calc::mul($value, 100, 2);
    }

    public function getReallyMoneyAttribute() {
        return Calc::div($this->attributes['really_money'], 100, 2);
    }

    public function setServiceFeeAttribute($value) {
        $this->attributes['service_fee'] = Calc::mul($value, 100, 2);
    }

    public function getServiceFeeAttribute() {
        return Calc::div($this->attributes['service_fee'], 100, 2);
    }

    public function setAdminLogAttribute($value) {
        $this->attributes['admin_log'] = json_encode($value);
    }

    public function getAdminLogAttribute() {
        if (empty($this->attributes['admin_log'])) {
            return [];
        }
        return json_decode($this->attributes['admin_log'], 1);
    }

    public function setPaymentPlatformsAttribute($value) {
        $this->attributes['payment_platforms'] = json_encode($value);
    }
}