<?php 
namespace App\Models\Site;

use Helper;

class User extends Base {
	protected $hidden = ['mobile', 'email'];
	protected $appends = ['auth_mobile', 'auth_email'];
	
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
	
	public function getEmailAttribute() {
		return Helper::decryptData($this->attributes['email']);
    }
	
	public function setEmailAttribute($value) {
		$this->attributes['email'] = Helper::encryptData($value);
    }

    public function getAuthEmailAttribute() {
		$email = $this->getEmailAttribute();
		if (empty($email)) {
			return '';
		}
		
		$emails = explode('@', $email);
		if (count($emails) != 2) {
			return '';
		}

		$email  = $emails[0];
		if (strlen($email) >= 4) {
			$email = substr($email, 0, 2) . '***' . substr($email, -2, 2);
		} elseif (strlen($email) >= 2) {
			$email = substr($email, 0, 1) . '***' . substr($email, -1, 1);
		} else {
			$email = substr($email, 0, 1) . '***';
		}
		return $email . '@' . $emails[1];
    }
}