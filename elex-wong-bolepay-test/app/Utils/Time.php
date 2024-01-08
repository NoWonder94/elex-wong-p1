<?php 
namespace App\Utils;

class Time {
	public static function getMicrotime(){
		return array_sum(explode(' ',microtime()));
	}

	public static function getTime(){
		return time();
	}

	public static function getNowDay(){
		return mktime(0, 0, 0, date('m'), date('d'), date('Y'));
	}

	public static function getNowHour(){
		return mktime(date('H'), 0, 0, date('m'), date('d'), date('Y'));
	}

	public static function getNowHourStr(){
		return (int)self::toDate(self::getTime(), 'H');
	}

	public static function getNowMonthStr(){
		return (int)self::toDate(self::getTime(), 'Y-m');
	}

	public static function getNextMonth(){
		return mktime(0, 0, 0, date('m') + 1, 1, date('Y'));
	}

	//获取本周第一天时间戳
	public static function getWeekFirstDay() {
		return mktime(0, 0, 0, date('m'), date('d') - date('w') + 1, date('Y'));
	}

	//获取本周最后一天时间戳
	public static function getWeekLastDay() {
        $day = date('w');
        if ($day == 0) {
            $day = 7;
        }
        $s = mktime(23, 59, 59, date('m'), date('d') - $day + 7, date('Y'));
	}

    public static function getWeek() {
        $day = date('w');
        if ($day == 0) {
            $day = 7;
        }
        return $day;
    }

	//获取本月第一天时间戳
	public static function getMonthFirstDay() {
		return mktime(0, 0, 0, date('m'), 1, date('Y'));
	}

	//获取本月最后一天时间戳
	public static function getMonthLastDay() {
		return mktime(23, 59, 59, date('m'), date('t'), date('Y'));
	}

	public static function getDayFirstTime($day) {
		$day = $day > 0 ? $day - 1 : 0;
		return mktime(0, 0, 0, date('m'), date('d') - $day, date('Y'));
	}

	public static function toDate($time = NULL, $format = 'Y-m-d H:i:s'){
		if(empty($time)){
			return '';
		}

		if (!is_numeric($time)) {
			return $time;
		}

		$format = str_replace('#', ':', $format);
		return date($format, $time);
	}

	public static function toTime($str){
		$str = trim($str);
		if(empty($str)){
			return 0;
		}
		return strtotime($str);
	}

	public static function toDayTime($time){
		if(0 > $time){
			return 0;
		}
		$str = self::toDate($time,'Y-m-d');
		return strtotime($str);
	}

	public static function toDayEndTime($time){
		if(0 > $time){
			return 0;
		}
		$str = self::toDate($time,'Y-m-d 23:59:59');
		return strtotime($str);
	}

	public static function toHourTime($time){
		if(0 > $time){
			return 0;
		}
		$str = self::toDate($time,'Y-m-d H:00');
		return strtotime($str);
	}
}
