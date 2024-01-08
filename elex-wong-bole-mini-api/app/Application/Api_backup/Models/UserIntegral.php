<?php 
namespace App\Application\Site\Api\Models;

use Time;

class UserIntegral extends \App\Models\Site\UserIntegral {
	protected $visible = ['id', 'integral', 'type_str', 'platform_name', 'create_date'];
	protected $appends = ['status_str', 'type_str', 'platform_name'];

	public function getCreateDateAttribute() {
		return Time::toDate($this->attributes['create_time']);
	}

    public function getPlatformNameAttribute() {
    	return $this->platform->name;
    }
}