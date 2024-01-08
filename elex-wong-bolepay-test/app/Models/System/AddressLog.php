<?php 
namespace App\Models\System;

class AddressLog extends Base {
    public function getAmountAttribute() {
        return (float)$this->attributes['amount'];
    }
}