<?php 
namespace App\Models\Site;

use Helper;

class CallLog extends Base {
	protected $hidden = ['mobile'];
	protected $appends = ['auth_mobile'];
	
	public function getAccountNameAttribute() {
		if ($this->attributes['type'] != 1) {
			return $this->attributes['account_name'];
		}
		
		$mobile = $this->getMobileAttribute();
		if (empty($mobile)) {
			return '';
		}
		return substr($mobile, 0, 3) . '※※※' . substr($mobile, -3, 3);
    }
	
	public function getMobileAttribute() {
		return Helper::decryptData($this->attributes['mobile']);
    }
	
	public function setMobileAttribute($value) {
		$this->attributes['mobile'] = Helper::encryptData($value);
    }
	
	public function getAuthMobileAttribute() {
		$mobile = $this->getMobileAttribute();
		if (empty($mobile)) {
			return '';
		}
		return substr($mobile, 0, 3) . '*****' . substr($mobile, -3, 3);
    }
}