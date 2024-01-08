<?php 
namespace App\Utils;

use Lang;

class Time {
	public static function getMicrotime(){
		return array_sum(explode(' ',microtime()));
	}

	public static function getTime(){
		return time() - date('Z');
	}

	public static function getNowDay(){
		return mktime(0, 0, 0, date('m'), date('d'), date('Y')) - date('Z');
	}

	public static function getNowHour(){
		return mktime(date('H'), 0, 0, date('m'), date('d'), date('Y')) - date('Z');
	}

	public static function getNowHourStr(){
		return (int)self::toDate(self::getTime(), 'H');
	}

	public static function getNextMonth(){
		return mktime(0, 0, 0, date('m') + 1, 1, date('Y')) - date('Z');
	}

	//获取本周第一天时间戳
	public static function getWeekFirstDay() {
		return mktime(0, 0, 0, date('m'),date('d')-date('w')+1,date('Y')) - date('Z');
	}

	//获取本周最后一天时间戳
	public static function getWeekLastDay() {
		return mktime(23, 59, 59, date('m'),date('d')-date('w')+7,date('Y')) - date('Z');
	}

	//获取本月第一天时间戳
	public static function getMonthFirstDay() {
		return mktime(0, 0, 0, date('m'),1,date('Y')) - date('Z');
	}

	//获取本月最后一天时间戳
	public static function getMonthLastDay() {
		return mktime(23, 59, 59, date('m'),date('t'),date('Y')) - date('Z');
	}

	public static function getDayFirstTime($day) {
		$day 	= $day > 0 ? $day - 1 : 0;
		return mktime(0, 0, 0, date('m'), date('d') - $day, date('Y')) - date('Z');
	}

	public static function toDate($time = NULL, $format = 'Y-m-d H:i:s'){
		if(empty($time)){
			return '';
		}

		if (!is_numeric($time)) {
			return $time;
		}

		$time += date('Z');
		$format = str_replace('#',':',$format);
		return date($format, $time);
	}

	public static function toTime($str){
		$str = trim($str);
		if(empty($str)){
			return 0;
		}
		return strtotime($str) - date('Z');
	}

	public static function toUtcTime($time){
		return $time - date('Z');
	}

	public static function toDayTime($time){
		if(0 > $time){
			return 0;
		}
		$str = self::toDate($time,'Y-m-d');
		return strtotime($str) - date('Z');
	}

	public static function toDayEndTime($time){
		if(0 > $time){
			return 0;
		}
		$str = self::toDate($time,'Y-m-d 23:59:59');
		return strtotime($str) - date('Z');
	}

	public static function toHourTime($time){
		if(0 > $time){
			return 0;
		}
		$str = self::toDate($time,'Y-m-d H:00');
		return strtotime($str) - date('Z');
	}

	/**
	 * 获取指定时间与当前时间的时间间隔
	 * @param   integer      $time
	 * @return  string
	 */
	public static function getBeforeTimelag($time){
		if($time == 0) {
			return "";
		}

		static 	$langs = NULL,
				$today_time = NULL,
				$before_lang = NULL,
				$beforeday_lang = NULL,
				$today_lang = NULL,
				$yesterday_lang = NULL,
				$hours_lang = NULL,
				$minutes_lang = NULL,
				$months_lang = NULL,
				$date_lang = NULL,
				$sdate = 86400;

		if($today_time === NULL) {
			$langs 			= Lang::get('sdk::common.dates');
			$today_time 	= self::getTime();
			$before_lang 	= $langs['before'];
			$beforeday_lang = $langs['before_day'];
			$today_lang 	= $langs['today'];
			$yesterday_lang = $langs['yest_erday'];
			$hours_lang 	= $langs['hours'];
			$minutes_lang 	= $langs['minutes'];
			$months_lang 	= $langs['months'];
			$date_lang 		= $langs['date'];
		}

		$now_day = self::toTime(self::toDate($today_time,"Y-m-d")); //今天零点时间
		$pub_day = self::toTime(self::toDate($time,"Y-m-d")); //发布期零点时间

		$timelag = $now_day - $pub_day;

		$year_time = self::toDate($time,'Y');
		$today_year = self::toDate($today_time,'Y');

		if($year_time < $today_year)
			return self::toDate($time,'Y:m:d H:i');

		$timelag_str = self::toDate($time,' H:i');

		$day_time = 0;
		if($timelag / $sdate >= 1) {
			$day_time = floor($timelag / $sdate);
			$timelag = $timelag % $sdate;
		}

		switch($day_time) {
			case '0':
				$timelag_str = $timelag_str;
			break;

			default:
				$timelag_str = $day_time . $langs['day_before'];
			break;
		}
		return $timelag_str;
	}

	/**
	 * 获取指定时间与当前时间的时间间隔
	 * @param   integer      $time
	 * @return  string
	 */
	public static function getTimelag($time){
		if($time == 0) {
			return '';
		}

		if($today_time === NULL) {
			$langs 			= Lang::get('sdk::common.dates');
			$day_lang 		= $langs['day'];
			$hours_lang 	= $langs['hours'];
			$minutes_lang 	= $langs['minutes'];
		}

		$str = '';

		$temp   = floor($time / 86400);
        if ($temp > 0) {
            $str .= $temp . $day_lang;
        }

        $time   = $time % 86400;
        $temp   = floor($time / 3600);
        if ($temp > 0) {
            $str .= $temp . $hours_lang;
        }

        $time   = $time % 3600;
        $temp   = floor($time / 60);
        if ($temp > 0) {
            $str .= $temp . $minutes_lang;
        }

        return $str;
	}

	/*
	 * 日期信息返回
	 */
	public static function getWeek($date, $type = null) {
		if ($type === null) {
			$type = Lang::get('sdk::common.month_date');
		}
	 	$info 	= self::toDate($date[0], $type);
	 	$weeks 	= Lang::get('sdk::common.weeks');
	 	if (isset($weeks[$date['wday']])) {
	 		$info .= $weeks[$date['wday']];
	 	}
	 	return $info;
	}
}
