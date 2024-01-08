<?php 
namespace App\Application\Site\Api\Requests;

use Lang;

class DepositCreateRequest extends BaseRequest {
	public function rules() {
		return [
			'money'			=> ['required', 'gt:0'],
        	'payment_id'	=> ['required', 'gt:0']
		];
	}

	public function messages() {
		return [
			'money.required'		=> Lang::get('common.deposit.money_required'),
			'money.gt'				=> Lang::get('common.deposit.money_required'),
			'payment_id.required'	=> Lang::get('common.deposit.payment_required'),
			'payment_id.gt'			=> Lang::get('common.deposit.payment_required'),
		];
	}
}
