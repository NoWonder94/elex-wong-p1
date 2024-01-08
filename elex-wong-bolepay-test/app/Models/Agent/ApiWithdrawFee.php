<?php 
namespace App\Models\Agent;

use App\Utils\Calc;

class ApiWithdrawFee extends Base {
    public function setServiceFeeAttribute($value) {
        $this->attributes['service_fee'] = Calc::mul($value, 100, 2);
    }

    public function getServiceFeeAttribute() {
        return Calc::div($this->attributes['service_fee'], 100, 2);
    }


}