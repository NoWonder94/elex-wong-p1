<?php
namespace App\Utils;

use Request;

class Tpl {
	protected static $checkAuthFunc;
	
	public static function setCheckAuthFunc($func) {
		self::$checkAuthFunc = $func;
	}
	
	public static function checkAuth($auths) {
		if (empty($auths) || !self::$checkAuthFunc) {
			return true;
		}
		
		$auths = explode('/', $auths);
		if (count($auths) < 2) {
			$auths[1] = APP_CONTROLLER_NAME;
		}
		
		return call_user_func_array(self::$checkAuthFunc, $auths);
	}
	
    public static function getTheme($name) {
        $themes = [
            'Base.admin' => 'default',
        ];
        return $themes[$name];
    }

    public static function output($val, $isFormat = true) {
        $val = trim($val);
        if (preg_match('/@\s*(.+?)\s*\(.*?@\s*end\1/', $val)) {
            return $val;
        }

        if (preg_match('/\{.*\}/', $val)) {
            return $val;
        }

        if (strpos($val, '$.') === 0) {
            return $val;
        }

        if (strpos($val, '$') === 0) {
            if ($isFormat) {
                return '{{ '.$val.' }}';
            } else {
                return '{!! '.$val.' !!}';
            }
        }
        return $val;
    }

    public static function variable($val) {
        if (strpos($val, '$') === 0) {
            return $val;
        }

        return '"'.$val.'"';
    }

	public static function time($val, $code = '', $data = [], $attrs = []) {
        return Time::toDate($val);
    }

    public static function image($val, $code = '', $data = [], $attrs = []) {
        $href = $val;
        $src  = $val;
        if (isset($attrs['iscut']) && $attrs['iscut'] == 1) {
            $src  = $val.'@60w_60h_1e_1c_1o.jpg';
        }
        return "<a href='{$href}' target='_blank'><img src='{$src}' style='max-width:60px; max-height:60px;' /></a>";
    }
    
    public static function status($val, $code, $data = [], $attrs = []){
        if (isset($attrs['readonly']) && $data[$attrs['readonly']] == 1) {
            return '';
        }

        $status = (int)$val;
        switch($status){
            case '0':
                return '<i title="点击切换" class="fa fa-lock table-status table-status0" status="1" field="'.$code.'"> </i>';
            break;
            case '1':
                return '<i title="点击切换" class="fa fa-check text-success table-status table-status1" status="0" field="'.$code.'"> </i>';
            break;
            default:
                return '';
            break;
        }
    }

    public static function statusShow($val, $code, $data = [], $attrs = []){
        $status = (int)$val;
        switch($status){
            case '0':
                return '<i class="fa fa-lock"> </i>';
            break;
            case '1':
                return '<i class="fa fa-check text-success"> </i>';
            break;
            default:
                return '';
            break;
        }
    }

    public static function toggle($val, $code, $data = [], $attrs = []){
        if (isset($attrs['readonly']) && $data[$attrs['readonly']] == 1) {
            return '';
        }

        $val = (int)$val;
        switch($val){
            case '0':
                return '<i title="点击切换" class="fa fa-lock table-toggle table-toggle0" val="1" field="'.$code.'"> </i>';
            break;
            case '1':
                return '<i title="点击切换" class="fa fa-check text-success table-toggle table-toggle1" val="0" field="'.$code.'"> </i>';
            break;
            default:
                return '';
            break;
        }
    }

    public static function toggleShow($val, $code, $data = [], $attrs = []){
        $val = (int)$val;
        switch($val){
            case '0':
                return '<i class="fa fa-lock"> </i>';
            break;
            case '1':
                return '<i class="fa fa-check text-success"> </i>';
            break;
            default:
                return '';
            break;
        }
    }
}