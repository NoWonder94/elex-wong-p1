<?php 
namespace App\Models\System;

use Time;

class Notice extends Base {
    public $isCreateTime = true;
    public $isUpdateTime = true;
    public $isSetAdmin = true;

    public function setEndTimeAttribute($value) {
        $this->attributes['end_time'] = Time::toTime($value);
    }
}