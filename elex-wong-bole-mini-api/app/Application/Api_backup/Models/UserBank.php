<?php 
namespace App\Application\Site\Api\Models;

use Lang;

class UserBank extends \App\Models\Site\UserBank {
	protected $visible = ['id', 'bank_name', 'bank_account'];

	public function getBankAccountAttribute() {
		return Lang::get('common.bank.last_num') . substr($this->attributes['bank_account'], -4);
	}
}