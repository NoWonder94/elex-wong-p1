<?php 
namespace App\Models\System;

class Payment extends Base {
    public function setRateAttribute($value) {
        $this->attributes['rate'] = (float)$value;
    }

    public function setCreateFeeAttribute($value) {
        $this->attributes['create_fee'] = (float)$value;
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
            if (isset($value['notify_ip'])) {
                $value['notify_ip'] = explode(',', str_replace('，', ',', $value['notify_ip']));
            }
            $this->attributes['data'] = json_encode($value);
        } else {
            $this->attributes['data'] = $value;
        }
    }

    public function getRulesAttribute() {
        $rules = json_decode($this->attributes['rules'], true);
        if(!empty($rules)){
           usort($rules, function($a, $b){
                if ($a['min_amount'] == $b['min_amount']) {
                    return 0;
                }
                return $a['min_amount'] > $b['min_amount'] ? 1 : -1;
            }); 
       }else{
            $rules = [];
       }
        
        return $rules;
    }

    public function getDataAttribute() {
        return json_decode($this->attributes['data'], true);
    }
}