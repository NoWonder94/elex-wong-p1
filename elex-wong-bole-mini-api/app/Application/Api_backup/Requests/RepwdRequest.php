<?php 
namespace App\Application\Site\Api\Requests;

use Lang;

class RepwdRequest extends BaseRequest {
	public function rules() {
		return [
        	//'name'		  => ['required'],
        	'account'	  => ['required'],
        	'verify_code' => ['required'],
        	'pwd'		  => ['required', 'min:6', 'max:20'],
		];
	}

	public function messages() {
		return [
			//'name.required'			=> Lang::get('common.user.name_required'),
			'account.required'		=> Lang::get('common.user.mobile_email_required'), 
			'verify_code.required' 	=> Lang::get('common.user.verify_code_required'), 
			'pwd.required' 			=> Lang::get('common.user.pwd_required'),
			'pwd.min'				=> Lang::get('common.user.pwd_min_error'), 
			'pwd.max'				=> Lang::get('common.user.pwd_max_error'), 
		];
	}
}
