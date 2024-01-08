<?php 
namespace App\Application\Site\Api\Models;

use Time;

class UserDeposit extends \App\Models\Site\UserDeposit {
	protected $visible = ['id', 'money', 'payment_name', 'status_str', 'create_date'];
	protected $appends = ['status_str'];

	public function getCreateDateAttribute() {
		return Time::toDate($this->attributes['create_time']);
	}
}