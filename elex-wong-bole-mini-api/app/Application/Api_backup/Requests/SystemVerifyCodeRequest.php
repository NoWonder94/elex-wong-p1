<?php 
namespace App\Application\Site\Api\Requests;

class SystemVerifyCodeRequest extends BaseRequest {
	public function rules() {
		return [
        	'account'	=> ['required'],
        	'pwd'		=> ['required']
		];
	}

	public function messages() {
		return [
			'account.required'	=> 'account.10001', 
			'pwd.required'		=> 'account.10003'
		];
	}
}
