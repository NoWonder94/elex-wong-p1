<?php 
namespace App\Application\Site\Api\Models;

use Time;

class UserGameBet extends \App\Models\Site\UserGameBet {
	protected $visible = ['bets', 'game_name', 'real_win', 'platform_name', 'create_date'];

	protected $appends = ['platform_name'];

	public function getCreateDateAttribute() {
		return Time::toDate($this->attributes['create_time']);
	}

	public function getPlatformNameAttribute() {
		if (!$this->platform) {
			return '';
		}
    	return $this->platform->name;
    }
}