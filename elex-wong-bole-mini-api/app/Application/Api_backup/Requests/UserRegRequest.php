<?php 
namespace App\Application\Site\Api\Requests;

use Lang;

class UserRegRequest extends BaseRequest {
	public function rules() {
		return [
        	'name'		=> ['required', 'min:6', 'max:16', 'regex:/^[A-Za-z]+[A-Za-z0-9]+$/'],
        	'pwd'		=> ['required', 'min:6', 'max:20'],
        	'real_name'	=> ['required', 'regex:/^[\x{4e00}-\x{9fa5}]{2,4}$/u'],
        	'mobile'	=> ['required', 'mobile'],
        	'email'		=> ['required', 'email']
		];
	}

	public function messages() {
		return [
			'name.required'			=> Lang::get('common.user.name_required'), 
			'name.min'				=> Lang::get('common.user.name_min_error'), 
			'name.max'				=> Lang::get('common.user.name_max_error'), 
			'name.regex'			=> Lang::get('common.user.name_regex_error'), 
			'pwd.required'			=> Lang::get('common.user.pwd_required'), 
			'pwd.min'				=> Lang::get('common.user.pwd_min_error'), 
			'pwd.max'				=> Lang::get('common.user.pwd_max_error'),  
			'real_name.required' 	=> Lang::get('common.user.real_name_required'), 
			'real_name.regex'		=> Lang::get('common.user.real_name_error'), 
			'mobile.required'		=> Lang::get('common.user.mobile_required'), 
			'mobile.mobile'			=> Lang::get('common.user.mobile_error'), 
			'email.required'		=> Lang::get('common.user.email_required'), 
			'email.email'			=> Lang::get('common.user.email_error'), 
		];
	}
}
