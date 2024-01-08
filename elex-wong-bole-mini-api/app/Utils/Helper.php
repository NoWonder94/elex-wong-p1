<?php
namespace App\Utils;

use Config, Url, Request, Lang, AppException;

class Helper {
    public static function url($url, $args = array()){
        static $namespaces   = null;
        if ($namespaces === null) {
            $namespaces = Config::get('app.web_namespaces');
            $namespaces = array_combine(array_values($namespaces), array_keys($namespaces));
        }

        $namespace = '';
        if (strpos($url, '#') !== false) {
            $urls = explode('#', $url, 2);
            $url = $urls[1];
            $namespace = strtolower($urls[0]);
            $namespace = isset($namespaces[$namespace]) ? $namespaces[$namespace] : $namespace;
        } 

        if (!empty($namespace)) {
            Url::forceRootUrl(Request::getScheme() . '://' . $namespace . '.' . Config::get('app.host'));
        }

        if (defined('APP_SITE_DOMAIN')) {
            $url = APP_SITE_DOMAIN . '/' . $url;
        }

        $url = URL::to($url) . (count($args) > 0 ? '?' : '') . http_build_query($args);
        Url::forceRootUrl('');
        return $url;
    }

    public static function resource($path) {
        return Url::to('/') . '/' . $path;
        return Config::get('app.resource_url') . $path;
    }

    public static function getClientIp($type = 0) {
        $type       =  $type ? 1 : 0;
        static $ip  =   NULL;
        if ($ip !== NULL) return $ip[$type];
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $arr    =   explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            $pos    =   array_search('unknown',$arr);
            if(false !== $pos) unset($arr[$pos]);
            $ip     =   trim($arr[0]);
        }elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
            $ip     =   $_SERVER['HTTP_CLIENT_IP'];
        }elseif (isset($_SERVER['REMOTE_ADDR'])) {
            $ip     =   $_SERVER['REMOTE_ADDR'];
        }
        // IP地址合法验证
        $long = sprintf("%u",ip2long($ip));
        $ip   = $long ? array($ip, $long) : array('0.0.0.0', 0);
        return $ip[$type];
    }

    public static function jsonEncode($data) {
        return @json_encode($data);
    }


    public static function jsonDecode($data) {
        return @json_decode($data, 1);
    }

    public static function formatPath($path) {
        $last = '';
        while($path != $last){
            $last = $path;
            $path = str_replace(['\\', './', '//'], ['/', '/', '/'], $path);
        }
        return $last;
    }

    public static function getDirsById($id){
        $id = sprintf("%011d", $id);
        $dir1 = substr($id, 0, 4);
        $dir2 = substr($id, 4, 4);
        $dir3 = substr($id, -3);
        return $dir1.'/'.$dir2.'/'.$dir3;
    }

    public static function getRequestUrl() {
        return Request::getSchemeAndHttpHost().Request::getRequestUri();
    }

    public static function getSn($prefix = '') {
        list($usec, $sec) = explode(" ",microtime());
        $sec = sprintf("%03d", (int)($usec * 1000));
        return $prefix . Time::toDate(Time::getTime(), 'YmdHis').$sec.mt_rand(1000, 9999);
    }

    public static function getShortSn($prefix = '') {
        list($usec, $sec) = explode(" ",microtime());
        $sec = sprintf("%03d", (int)($usec * 1000));
        return $prefix . Time::toDate(Time::getTime(), 'His').$sec.mt_rand(1000, 9999);
    }

    public static function throwException($msg, $field = '', $url = '') {
        $e = new AppException($msg, 99999);
        if (!empty($field)) {
            $e->setField($field);
        }
        if (!empty($url)) {
            $e->setUrl($url);
        }
        throw $e;
    }

    public static function langFormat($name, $data = '') {
        $args = [];
        $args[] = Lang::get($name);
        if (!is_array($data)) {
            $args[] = $data;
        } else {
            $args = array_merge($args, $data);
        }
        return call_user_func_array("sprintf", $args);
    }
	
	protected static function getEncrypter() {
		static $encrypter = NULL;
		if (!$encrypter) {
			$encrypter = new Encrypter(Config::get('app.encrypter_key'), Config::get('app.encrypter_iv'));
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

    public static function skyEncry($args){
        return @openssl_encrypt($args, 'AES-128-CBC', Config::get('app.'.APP_SITE_DOMAIN.'.common_encrypter_key'), 0, sprintf("%-'_16s", Config::get('app.'.APP_SITE_DOMAIN.'.common_encrypter_iv')));
    }

    public static function skyDecry($args){
        return @openssl_decrypt($args, 'AES-128-CBC', Config::get('app.'.APP_SITE_DOMAIN.'.common_encrypter_key'), 0, sprintf("%-'_16s", Config::get('app.'.APP_SITE_DOMAIN.'.common_encrypter_iv')));
    }
	
	public static function formatCsvValue($val) {
		return str_replace('"', '”', $val);
	}
}