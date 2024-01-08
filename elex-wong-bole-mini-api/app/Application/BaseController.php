<?php
namespace App\Application;

use App\ThrowException;
use App\Utils\Validator as ValidatorExtend;
use Laravel\Lumen\Routing\Controller;
use Time, Validator, SystemCache, Helper, Request;

abstract class BaseController extends Controller
{
	use ThrowException;
	
    public function __construct() {
        SystemCache::store()->setDirectory('system');
        
        if (!defined('UTC_TIME')) {
            //当前UTC时间(秒)
            define('UTC_TIME', Time::getTime());
            
            //当前UTC小时(小时)
            define('UTC_HOUR', Time::getNowHour());

            //今天 00：00：00 UTC时间
            define('UTC_DAY', Time::getNowDay());

            //当前小时
            define('UTC_HOUR_STR', Time::getNowHourStr());

            //获取Client IP
            $client_ip = Request::header("CLIENT_IP");
            if (empty($client_ip)) {
                define('CLIENT_IP', Helper::getClientIp());
            } else {
                define('CLIENT_IP', $client_ip);
            }
        }

        //扩展验证类
        Validator::resolver(function($translator, $data, $rules, $messages) {		
            return new ValidatorExtend($translator, $data, $rules, $messages);
        });
    }

    /*public function langFormat($name, $data) {
        $args = [];
        $args[] = Lang::get($name);
        if (!is_array($data)) {
            $args[] = $data;
        } else {
            $args = array_merge($args, $data);
        }
        return call_user_func_array("sprintf", $args);
    }*/
}
