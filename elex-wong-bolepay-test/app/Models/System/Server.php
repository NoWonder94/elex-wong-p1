<?php 
namespace App\Models\System;

class Server extends Base {
	public function getBankTypeAttribute() {
    	if (empty($this->attributes['bank_type'])) {
    		return [];
    	}
		return explode(',', $this->attributes['bank_type']);
    }
}