<?php

namespace App\Models;
use Time;

class User extends Base {
    protected $table 	= 'user';
    protected $appends  = ['avatar','login_time_datetime', 'logout_time_datetime', 'create_time_datetime', 'update_time_datetime'];

    public function getAvatarAttribute() {
		if (isset($this->attributes['avatar']) && !empty($this->attributes['avatar'])) {
			return Config('resource.img.url') . $this->attributes['avatar'];
		}

		return null;
	}
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
        if(isset($this->attributes['create_time']) && !empty($this->attributes['create_time'])) {
            return Time::convertToDateTime($this->attributes['create_time']);
        }

        return null;
    }

    public function getUpdateTimeDatetimeAttribute() {
        if(isset($this->attributes['update_time']) && !empty($this->attributes['update_time'])) {
            return Time::convertToDateTime($this->attributes['update_time']);
        }

        return null;
    }

    public static function findById($id, $isFormat = false) {
        $user = User::where('id', $id)->get()->first();

        if(empty($user)) {
            return [];
        }

        if($isFormat) {
            $user = self::formatUserInfo($user);
        }

        return $user;
    }

    public static function findByEmail($email, $isFormat = false) {
        $user = User::where('email', $email)->get()->first();

        if(empty($user)) {
            return [];
        }

        if($isFormat) {
            $user = self::formatUserInfo($user);
        }

        return $user;
    }

    public static function formatUserInfo($user) {
        unset($user['pwd']);

        return $user;
    }
}

?>
