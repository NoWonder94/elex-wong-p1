<?php 
namespace App\Models\System;
use Lang;
class Address extends Base {
     protected $appends = ['status_str'];
     
     public function getStatusStrAttribute() {
	$status = $this->attributes['status'];
        $status_str = Lang::get('admin.address_status');
        return $status_str[$status];
     }
     
     public function getIncomeAttribute() {
        return (float)$this->attributes['income'];
    }
}