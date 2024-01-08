<?php 
namespace App\Application\Site\Api\Models;

use App\Models\Site\UserBank;

class User extends \App\Models\Site\User {
	protected $visible = ['name', 'user_group_id', 'userGroup', 'invite_code', 'real_name', 'login_ip', 'login_time', 'balance', 'coin', 'integral', 'auth_mobile', 'auth_email', 'bank_count', 'games', 'is_deposit'];

	protected $appends = ['bank_count', 'auth_mobile', 'auth_email'];

	public function getBankCountAttribute() {
		return UserBank::where('user_id', $this->attributes['id'])->count();
	}

	public function games() {
    	$relation = $this->hasMany(UserGame::class, 'user_id', 'id');
		return $relation;
    }
}