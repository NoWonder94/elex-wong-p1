<?php

namespace App\Utils;

class Time {
	public static function getCurrentTime() {
		return time();
	}
	
	public static function convertToDate($unixTime) {
		return date("Y-m-d", $unixTime);
	}

	public static function convertToDateTime($unixTime) {
		return date("Y-m-d H:i:s", $unixTime);
	}
	
	public static function toDate($time = NULL, $format = 'Y-m-d H:i:s') {
		if (empty($time)) {
			return '';
		}

		if (!is_numeric($time)) {
			return $time;
		}

		$format = str_replace('#', ':', $format);

		return date($format, $time);
	}
}