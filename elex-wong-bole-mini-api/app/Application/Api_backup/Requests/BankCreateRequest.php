<?php 
namespace App\Application\Site\Api\Requests;

use Lang;

class BankCreateRequest extends BaseRequest {
	public function rules() {
		return [
        	'code'    => ['required'],
        	'account' => ['required'],
		];
	}

	public function messages() {
		return [
			'code.required'		=> Lang::get('common.bank.code_required'),
			'account.required'	=> Lang::get('common.bank.account_required'),
		];
	}
}
