<?php

namespace App\Models;
use Time;

class Admin extends Base {
	protected $table 	= 'admin';
	protected $appends 	= ['login_time_datetime', 'logout_time_datetime', 'create_time_datetime', 'update_time_datetime'];

	public function getLoginTimeDatetimeAttribute() {
		if (isset($this->attributes['login_time']) && !empty($this->attributes['login_time'])) {
			return Time::convertToDateTime($this->attributes['login_time']);
		}
		
		return null;
	}

	public function getLogoutTimeDatetimeAttribute() {
		if (isset($this->attributes['logout_time']) && !empty($this->attributes['logout_time'])) {
			return Time::convertToDateTime($this->attributes['logout_time']);
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

	public static function findById($id, $isFormat = false) {
		$admin = Admin::where('id', $id)->get()->first();
		if (empty($admin)) {
			return [];
		}

		if ($isFormat == true) {
			$admin = self::formatAdminInfo($admin);
		}

		return $admin;
	}

	public static function findByName($name, $isFormat = false) {
		$admin = Admin::where('name', $name)->get()->first();
		if (empty($admin)) {
			return [];
		}

		if ($isFormat == true) {
			$admin = self::formatAdminInfo($admin);
		}

		return $admin;
	}

	public static function formatAdminInfo($admin) {
		unset($admin['pwd']);
		unset($admin['crypt']);

		return $admin;
	}
}