<?php 
namespace App\Application\Site\Api\Models;

use Time;

class UserTransfer extends \App\Models\Site\UserTransfer {
	protected $visible = ['id', 'money', 'type_str', 'platform_name', 'status_str', 'create_date'];
	protected $appends = ['status_str', 'type_str', 'platform_name'];

	public function getCreateDateAttribute() {
		return Time::toDate($this->attributes['create_time']);
	}

    public function getPlatformNameAttribute() {
    	return $this->platform->name;
    }
}