<?php 
namespace App\Application\Site\Api\Models;

use Time;

class UserCoin extends \App\Models\Site\UserCoin {
	protected $visible = ['id', 'amount', 'goods_name', 'type_str', 'create_date'];

	public function getCreateDateAttribute() {
		return Time::toDate($this->attributes['create_time']);
	}
}