<?php 
namespace App\Application\Site\Api\Requests;

use Lang;

class WithdrawCreateRequest extends BaseRequest {
	public function rules() {
		return [
        	'money'	  => ['required', 'gt:0'],
        	'bank_id' => ['required', 'gt:0'],
		];
	}

	public function messages() {
		return [
			'money.required'	=> Lang::get('common.withdraw.money_required'),
			'money.gt'			=> Lang::get('common.withdraw.money_required'),
			'bank_id.required'	=> Lang::get('common.withdraw.bank_error'),
			'bank_id.gt'		=> Lang::get('common.withdraw.bank_error'),
		];
	}
}
