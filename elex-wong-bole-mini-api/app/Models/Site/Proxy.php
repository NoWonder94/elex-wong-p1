<?php 
namespace App\Models\Site;

use Helper;

class Proxy extends Base {
	
	public function getMobileAttribute() {
		return Helper::decryptData($this->attributes['mobile']);
    }
	
	public function setMobileAttribute($value) {
		$this->attributes['mobile'] = Helper::encryptData($value);
    }
	
	public function getEmailAttribute() {
		return Helper::decryptData($this->attributes['email']);
    }
	
	public function setEmailAttribute($value) {
		$this->attributes['email'] = Helper::encryptData($value);
    }

	public function proxyLevel() { 
    	$relation = $this->hasOne(ProxyLevel::class, 'id', 'level_id');
		return $relation;
	}

	public function updateLevel() { 
    	$relation = $this->hasOne(ProxyLevel::class, 'id', 'update_level_id');
		return $relation;
	}

}