<?php 
namespace App\Application\Site\Api\Requests;

use Lang;

class VerifyCodeSendRequest extends BaseRequest {
	public function rules() {
		return [
        	'account' => ['required'],
        	'type' 	  => ['required']
		];
	}

	public function messages() {
		return [
			'account.required'	=> Lang::get('common.user.mobile_email_required'), 
			'type.required' 	=> Lang::get('common.user.verify_code_type_required')
		];
	}
}
