<?php 
namespace App\Application\Site\Api\Requests;

use Lang;

class IntegralCreateRequest extends BaseRequest {
	public function rules() {
		return [
        	'platform'	=> ['required'],
			'amount'	=> ['required', 'gt:0']
		];
	}

	public function messages() {
		return [
			'platform.required'	=> Lang::get('common.integral.platform_required'),
			'amount.required'	=> Lang::get('common.integral.amount_required'),
			'amount.gt'			=> Lang::get('common.integral.amount_required')
		];
	}
}
