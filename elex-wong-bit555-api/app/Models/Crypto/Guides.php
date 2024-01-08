<?php

namespace App\Models\Crypto;
use Config, Time;

class Guides extends \App\Models\Base {
	protected $table 	= 'crypto_guides';
	protected $appends 	= ['img', 'create_time_datetime', 'update_time_datetime'];

	public function getImgAttribute() {
		if (isset($this->attributes['img']) && !empty($this->attributes['img'])) {
			return Config('resource.img.url') . $this->attributes['img'];
		}

		return null;
	}

	public function getCreateTimeDatetimeAttribute() {
		if (isset($this->attributes['create_time']) && !empty($this->attributes['create_time'])) {
			return Time::convertToDateTime($this->attributes['create_time']);
		}

		return null;
	}

	public function getUpdateTimeDatetimeAttribute() {
		if (isset($this->attributes['update_time']) && !empty($this->attributes['update_time'])) {
			return Time::convertToDateTime($this->attributes['update_time']);
		}

		return null;
	}

	public static function findById($id) {
		return Guides::where('id', $id)->get()->first();
	}
}
