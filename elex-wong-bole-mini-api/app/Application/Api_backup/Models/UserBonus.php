<?php 
namespace App\Application\Site\Api\Models;

use Time, Lang;

class UserBonus extends \App\Models\Site\UserBonus {
	protected $visible = ['id', 'type_str', 'expired_time', 'money', 'platform_name', 'create_date', 'bet_status_str', 'bet_money', 'already_money'];

	protected $appends = ['type_str', 'bet_status_str', 'platform_name'];

	public function getTemplateIdsAttribute() {
		return explode(',', $this->attributes['template_ids']);
	}

	public function getCreateDateAttribute() {
		return Time::toDate($this->attributes['create_time']);
	}

	public function getExpiredTimeAttribute() {
		return Time::toDate($this->attributes['expired_time']);
	}

	public function getPlatformNameAttribute() {
		if (!$this->platform) {
			return '';
		}
    	return $this->platform->name;
    }

    public function getTypeStrAttribute() {
		return Lang::get('root::common.bonus_type_name.'.$this->attributes['type']);
    }
	
	public function getBetStatusStrAttribute() {
		return Lang::get('root::common.bet_status_str.'.$this->attributes['bet_status']);
    }
}