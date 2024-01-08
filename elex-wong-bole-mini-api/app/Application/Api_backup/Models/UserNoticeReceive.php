<?php 
namespace App\Application\Site\Api\Models;

use Time;

class UserNoticeReceive extends \App\Models\Site\UserNoticeReceive {
	protected $visible = ['id', 'receiver_time', 'status', 'notice'];

	public function notice() {
		return $this->hasOne(UserNotice::class, 'id', 'user_notice_id');
	}

	public function getReceiverTimeAttribute() {
		return Time::toDate($this->attributes['receiver_time']);
	}
}