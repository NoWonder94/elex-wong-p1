<?php 
namespace App\Application\Site\Api\Requests;

use Lang;

class TransferCreateRequest extends BaseRequest {
	public function rules() {
		return [
        	'type'	   	=> ['required', 'gt:0'],
        	'platform'	=> ['required'],
        	'money'		=> ['required', 'gt:0'],
		];
	}

	public function messages() {
		return [
			'type.required'		=> Lang::get('common.transfer.type_required'),
			'type.gt'			=> Lang::get('common.transfer.type_required'),
			'platform.required'	=> Lang::get('common.transfer.platform_required'),
			'money.required'	=> Lang::get('common.transfer.money_required'),
			'money.gt'			=> Lang::get('common.transfer.money_required'),
		];
	}
}
