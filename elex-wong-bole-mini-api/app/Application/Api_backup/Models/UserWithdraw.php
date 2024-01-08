<?php 
namespace App\Application\Site\Api\Models;

use Time, Helper;

class UserWithdraw extends \App\Models\Site\UserWithdraw {
	protected $visible = ['id', 'money', 'bank_info', 'status_str', 'create_date'];

	public function getCreateDateAttribute() {
		return Time::toDate($this->attributes['create_time']);
	}

	public function getBankAccountAttribute() {
		return Lang::get('common.bank.last_num') . substr($this->attributes['bank_account'], -4);
	}

	public function getBankInfoAttribute() {
		if (empty($this->attributes['bank_info'])) {
			return '';
		}

		$info = Helper::jsonDecode($this->attributes['bank_info']);
		return $info['bank_name'] . '(' . substr($info['bank_account'], -4) . ')';
	}
}