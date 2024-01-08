<?php

namespace App\Utils;
use Time;

class Helper {
    public static function getClientIp($type = 0) {
        $type       = $type ? 1 : 0;
        static $ip  = NULL;
        if ($ip !== NULL) {
            return $ip[$type];
        }

        if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $arr    = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            $pos    = array_search('unknown', $arr);
            if (false !== $pos) {
                unset($arr[$pos]);
            }
            $ip     = trim($arr[0]);
        } elseif (isset($_SERVER['HTTP_X_REAL_IP'])) {
            $ip     = $_SERVER['HTTP_X_REAL_IP'];
        }  elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
            $ip     = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (isset($_SERVER['REMOTE_ADDR'])) {
            $ip     = $_SERVER['REMOTE_ADDR'];
        }

        //IP地址合法验证
        $long       = sprintf('%u', ip2long($ip));
        $ip         = $long ? array($ip, $long) : array('0.0.0.0', 0);

        return $ip[$type];
    }

    public static function getImgName() {
    	list($usec, $sec) 	= explode(' ', microtime());
    	$sec 				= sprintf('%6d', (int)($usec * 1000000));

    	return Time::toDate(UTC_CURRENT_TIME, 'YmdHis') . $sec . mt_rand(1000, 9999);
    }

    private static function getEncrypter() {
        static $encrypter = NULL;
        if (!$encrypter) {
            $encrypter = new Encrypter(Config('app.encrypter.key'), Config('app.encrypter.iv'));
        }
        return $encrypter;
    }

    public static function encryptData($data) {
        if (empty($data)) {
            return '';
        }

        try {
            $encrypter = self::getEncrypter();
            return $encrypter->encrypt($data);
        } catch(\Exception $e) {
            return false;
        }
    }

    public static function decryptData($data) {
        if (empty($data)) {
            return '';
        }

        try {
            $encrypter = self::getEncrypter();
            return $encrypter->decrypt($data);
        } catch(\Exception $e) {
            return false;
        }
    }
}