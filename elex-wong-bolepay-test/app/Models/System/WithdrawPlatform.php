<?php 
namespace App\Models\System;

class WithdrawPlatform extends Base {
    public function setServiceValAttribute($value) {
        $this->attributes['service_val'] = (float)$value;
    }

    

    public function setDayMoneyAttribute($value) {
        $this->attributes['day_money'] = (float)$value;
    }

    public function setMinMoneyAttribute($value) {
        $this->attributes['min_money'] = (float)$value;
    }

    public function setMaxMoneyAttribute($value) {
        $this->attributes['max_money'] = (float)$value;
    }

    public function setDataAttribute($value) {
        if (is_array($value)) {
            if (isset($value['fixed_amounts'])) {
                $value['fixed_amounts'] = explode(',', str_replace('，', ',', $value['fixed_amounts']));
            }
            $this->attributes['data'] = json_encode($value);
        } else {
            $this->attributes['data'] = $value;
        }
    }

    


    public function getDataAttribute() {
        return json_decode($this->attributes['data'], true);
    }
}