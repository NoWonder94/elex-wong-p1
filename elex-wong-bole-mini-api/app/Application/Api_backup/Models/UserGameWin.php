<?php 
namespace App\Application\Site\Api\Models;

use Time;

class UserGameWin extends Base {
    protected $visible = ['user_name', 'game_id', 'game_name', 'win_money', 'win_time'];

    public function getWinTimeAttribute() {
		return Time::toDate($this->attributes['win_time']);
	}

	public function getUserNameAttribute() {
		$user_name  = $this->attributes['user_name'];
		if (strlen($user_name) >= 4) {
			$user_name = substr($user_name, 0, 2) . '***' . substr($user_name, -2, 2);
		} else {
			$user_name = substr($user_name, 0, 1) . '***' . substr($email, -1, 1);
		}
		return $user_name;
    }
}