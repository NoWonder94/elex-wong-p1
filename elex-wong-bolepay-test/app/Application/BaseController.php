<?php
namespace App\Application;

use App\Traits\ThrowException;
use Laravel\Lumen\Routing\Controller;
use Time, Helper, Request, Config;

abstract class BaseController extends Controller {
	use ThrowException;
	
    public function __construct() {
        if (!defined('UTC_HOUR')) {
            //当前UTC小时(小时)
            define('UTC_HOUR', Time::getNowHour());

            //今天 00：00：00 UTC时间
            define('UTC_DAY', Time::getNowDay());

            //当前小时
            define('UTC_HOUR_STR', Time::getNowHourStr());

            define('CLIENT_IP', Helper::getClientIp());

            define('IS_DEV_MODE', Config::get('app.is_dev'));
        }
    }

    protected function request($key, $default = null) {
        $val = Request::get($key);
        return $val === null ? $default : $val;
    }
}
