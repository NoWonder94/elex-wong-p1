<?php
namespace App\Utils;

use Config, Url, Request, Lang, AppException, Storage;

class Helper {
    public static function url($url, $args = array()){
        if (strpos($url, '#') !== false) {
            $urls = explode('#', $url, 2);
            $url = $urls[1];
            $namespace = strtolower($urls[0]);
        } else {
            $namespace = strtolower(APP_CURRENT_NAMESPACE);
        }

        if ($namespace == 'www') {
            $namespace = '';
        }

        if (!empty($namespace)) {
            $url = $namespace . '/' . $url;
        }

        $url = Url::to($url) . (count($args) > 0 ? '?' : '') . http_build_query($args);
        $no_https_host = Config::get('app.no_https_host');
        if ($no_https_host && in_array(APP_HTTP_HOST, $no_https_host)) {
            return $url;
        }
        return IS_DEV_MODE ? $url : str_replace('http://', 'https://', $url);
    }

    public static function urlByPlatform($platform, $url, $args = array(), $region = ''){
        if (strpos($url, '#') !== false) {
            $urls = explode('#', $url, 2);
            $url = $urls[1];
            $namespace = strtolower($urls[0]);
        } else {
            $namespace = strtolower(APP_CURRENT_NAMESPACE);
        }

        if (empty($region)) {
            $hosts = array_flip(Config::get('app.hosts'));
        } else {
            $hosts = Config::get('app.region_hosts.' . $region);
        }

        $host = $hosts[$platform];

        Url::forceRootUrl(Request::getScheme() . '://' . $host);

        if ($namespace == 'www') {
            $namespace = '';
        }

        if (!empty($namespace)) {
            $url = $namespace . '/' . $url;
        }

        $url = Url::to($url) . (count($args) > 0 ? '?' : '') . http_build_query($args);

        Url::forceRootUrl('');

        $no_https_host = Config::get('app.no_https_host');
        if ($no_https_host && in_array($host, $no_https_host)) {
            return str_replace('https://', 'http://', $url);
        }

        return IS_DEV_MODE ? $url : str_replace('http://', 'https://', $url);
    }

    public static function resource($path) {
        return Config::get('app.resource_url') . $path . '?' . Config::get('app.tpl_version');
    }

    public static function getClientIp() {
        static $ip = null;
        if ($ip !== null) {
            return $ip;
        }

        if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $arr = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            $pos = array_search('unknown',$arr);
            if(false !== $pos) {
                unset($arr[$pos]);
            }
            $ip = trim($arr[0]);
        } elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (isset($_SERVER['REMOTE_ADDR'])) {
            $ip = $_SERVER['REMOTE_ADDR'];
        }

        // IP地址合法验证
        if(!filter_var($ip, FILTER_VALIDATE_IP)) {
            $ip = '0.0.0.0';
        }
        return $ip;
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
        $id   = sprintf("%011d", $id);
        $dir1 = substr($id, 0, 4);
        $dir2 = substr($id, 4, 4);
        $dir3 = substr($id, -3);
        return $dir1.'/'.$dir2.'/'.$dir3;
    }

    public static function getSn($prefix = '') {
        list($usec, $sec) = explode(' ',microtime());
        $sec = sprintf("%08d", (int)($usec * 100000000));
        return $prefix . Time::toDate(Time::getTime(), 'YmdHis') . $sec . mt_rand(1000, 9999);
    }

    public static function getShortSn($prefix = '') {
        list($usec, $sec) = explode(' ',microtime());
        $sec = sprintf("%03d", (int)($usec * 1000));
        return $prefix . Time::toDate(Time::getTime(), 'His') . $sec . mt_rand(1000, 9999);
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
	
	protected static function getEncrypter() {
		static $encrypter = null;
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
            array_unshift($auths, APP_CONTROLLER_NAME);
        }
        
        return call_user_func_array(self::$checkAuthFunc, $auths);
    }

    public static function log($name, $content) {
        $name .= Time::toDate(UTC_TIME, 'Y-m-d') . '.log';
        file_put_contents(storage_path().'/logs/'.$name, "\r\n".Time::toDate(UTC_TIME)."============================\r\n".$content, FILE_APPEND);
    }

    public static function cloudLog($path, $content) {
        list($usec, $sec) = explode(" ",microtime());
        $sec = sprintf("%03d", (int)($usec * 1000));

        $path = 'logs/' . APP_HOST_TYPE . '/' . APP_CURRENT_NAMESPACE . '/' . Time::toDate(UTC_TIME, 'Y-m-d') . '/' . $path . '/' . Time::toDate(UTC_TIME, 'H-i-s-') . $sec . '-' . mt_rand(10000, 99999) . '.txt';

        if (!is_string($content)) {
            $content = var_export($content, true);
        }

        Storage::disk('s3')->put($path, $content);
    }

    public static function quote($sql) {
        static $pdo = null;
        if ($pdo === null) {
            $pdo = \DB::connection()->getPdo();
        }
        return $pdo->quote($sql);
    }

    public static function ansyncSystemRequest($path, $data = []) {
        $data['sign'] = self::getSystemSign($data);
        Http::ansync(Helper::url($path), $data);
    }

    public static function getSystemSign($data) {
        ksort($data);
        reset($data);

        $sign = '';
        foreach ($data as $key => $val) {
            $sign .= $key . '=' . $val . '&';
        }
        $sign .= 'app_secret=' . Config::get('app.api_app_secret');
        return md5($sign);
    }

    public static function formatCsv($val) {
        return str_replace(['"', ','], ['”', '，'], $val);
    }

    public static function getIsMobile() {
        if (isset ($_SERVER['HTTP_X_WAP_PROFILE'])) {
            return true;
        }

        if (isset ($_SERVER['HTTP_VIA'])) {
            return true;
        }

        if (isset ($_SERVER['HTTP_USER_AGENT'])) {
            $keywords = array ('nokia', 'sony','ericsson','mot',
                'samsung','htc','sgh','lg','sharp',
                'sie-','philips','panasonic','alcatel',
                'lenovo','iphone','ipod','blackberry',
                'meizu','android','netfront','symbian',
                'ucweb','windowsce','palm','operamini',
                'operamobi','openwave','nexusone','cldc',
                'midp','wap','mobile'
            );
            if (preg_match("/(" . implode('|', $keywords) . ")/i", strtolower($_SERVER['HTTP_USER_AGENT']))){
                return true;
            }
        }

        return false;
    }
}