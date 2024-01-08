<?php 
namespace App\Utils;

class Http {
	/**
	 * 发起GET请求
	 * @param  string  $url     请求链接
	 * @param  array   $params  请求参数
	 * @param  integer $timeout 超时时间
	 * @return string           响应数据
	 */
	public static function get($url, $params = array(), $timeout = 10,$addHeader = []) {
		return self::request($url, $params, 'GET', [], $timeout,$addHeader);
	}

	/**
	 * 发起POST请求
	 * @param  string  $url     请求链接
	 * @param  array   $params  请求参数
	 * @param  boolean $multi   是否为文件上传
	 * @param  integer $timeout 超时时间
	 * @return string           响应数据
	 */
	public static function post($url, $params = array(), $multi = array(), $timeout = 10, $addHeader = []) {
		return self::request($url, $params, 'POST', $multi, $timeout, $addHeader);
	}
	
	/**
	 * 发起一个HTTP/HTTPS的请求, 基于curl
	 * @param  string  $url     请求链接
	 * @param  array   $params  请求参数
	 * @param  string  $method  请求类型 GET|POST
	 * @param  array   $multi   文件信息
	 * @param  integer $timeout [description]
	 * @return [type]           [description]
	 */
	private static function request( $url , $params = array(), $method = 'GET' , $multi = array(), $timeout = 10, $addHeader = []) {
		if (!function_exists('curl_init')) {
			return false;
		}
		set_time_limit($timeout);
		$method = strtoupper($method);
		$ci = curl_init();
		curl_setopt($ci, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1); 
		curl_setopt($ci, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ci, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ci, CURLOPT_SSL_VERIFYHOST, false);
		curl_setopt($ci, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
		curl_setopt($ci, CURLOPT_HEADER, false);

		//curl_setopt($ci, CURLOPT_CONNECTTIMEOUT, $timeout);
		curl_setopt($ci, CURLOPT_TIMEOUT, $timeout);

		$header = [
			'Expect:',
			'Cache-Control: no-cache',
			'Connection: close',
			'Pragma: no-cache',
		];
        $header = array_merge($header, $addHeader);
		curl_setopt($ci, CURLOPT_HTTPHEADER, $header);

		switch ($method) {
			case 'POST':
				curl_setopt($ci, CURLOPT_POST, TRUE);
				if (!empty($params)) {
					if($multi) {
						foreach($multi as $key => $file) {
							$params[$key] = '@'.$file;
						}
					}

                    if(is_array($params)) {
						curl_setopt($ci, CURLOPT_POSTFIELDS, http_build_query($params));
					} else {
						curl_setopt($ci, CURLOPT_POSTFIELDS, $params);
					}
				}
				break;
			case 'GET':
				if (!empty($params)) {
					$url = $url . (strpos($url, '?') ? '&' : '?') . (is_array($params) ? http_build_query($params) : $params);
				}
				break;
		}
		
		curl_setopt($ci, CURLOPT_URL, $url);
		$response = curl_exec($ci);
		curl_close ($ci);
		return $response;
	}

	public static function ansync($url, $data = '') {
		$url_info = parse_url($url);

		if (isset($url_info['scheme']) && strcasecmp($url_info['scheme'], 'https') === 0) {
	        $prefix = 'ssl://';
	        $port   = 443;
	    } else {
	        $prefix = '';
	        $port   = isset($url_info['port']) ? $url_info['port'] : 80;
	    }

        $host  = parse_url($url, PHP_URL_HOST);
        $path  = parse_url($url, PHP_URL_PATH);
        $query = parse_url($url, PHP_URL_QUERY);
        if ($query) {
            $path .= '?' . $query;
        }

        $fp = fsockopen($prefix . $host, $port, $error_code, $error_msg, 1);
        stream_set_blocking($fp, true); //开启了手册上说的非阻塞模式
        stream_set_timeout($fp , 10); //设置超时
        if ($data) {
            if (is_array($data)) {
                $data = http_build_query($data);
            }
        	$header  = "POST $path HTTP/1.1\r\n";
        	$header .= "Content-Type: application/x-www-form-urlencoded\r\n";
        	$header .= "Content-Length: " . strlen($data) . "\r\n";
        } else {
        	$header = "GET $path HTTP/1.1\r\n";
        }
        $header .= "Host: $host\r\n";
        $header .= "Connection: close\r\n\r\n";//长连接关闭
        if ($data) {
        	$header .= $data;
        }

        fwrite($fp, $header);
        usleep(2000);
        fclose($fp);
    }
}
