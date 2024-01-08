<?php 
namespace App\Models\Agent;

use App\Models\System\Agent;
use App\Utils\Calc;

class MoneyLog extends MySqlElasticSearch {
    public function agent() {
        return $this->hasOne(Agent::class, 'id', 'agent_id');
    }

    public function setIncreaseAttribute($value) {
        $this->attributes['increase'] = Calc::mul($value, 100, 2);
    }

    public function getIncreaseAttribute() {
        return Calc::div($this->attributes['increase'], 100, 2);
    }

    public function setDecreaseAttribute($value) {
        $this->attributes['decrease'] = Calc::mul($value, 100, 2);
    }

    public function getDecreaseAttribute() {
        return Calc::div($this->attributes['decrease'], 100, 2);
    }

    public function setBalanceAttribute($value) {
        $this->attributes['balance'] = Calc::mul($value, 100, 2);
    }

    public function getBalanceAttribute() {
        return Calc::div($this->attributes['balance'], 100, 2);
    }
}