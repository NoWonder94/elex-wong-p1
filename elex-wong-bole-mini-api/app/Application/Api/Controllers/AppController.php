<?php
    namespace App\Application\Api\Controllers;
    use Request, Helper, Lang;

    class AppController extends \App\Application\BaseController {
        public function getToken() {
        	$sid = Request::get('sid');
        	if (empty($sid) || strlen($sid) != 32) {
            	exit;
        	}

        	$client = Request::get('client');
        	if (empty($client) || !in_array($client, ['pc', 'wap', 'app'])) {
            	exit;
        	}
        
        	$host       = trim(Request::get('host'));
        	$source     = trim(Request::get('source'));
        	$viewfrom   = trim(Request::get('viewfrom'));
        	$pushtoken  = trim(Request::get('pushtoken'));

	        $data = [
	            'rand'       => mt_rand(),
	            'ip'         => CLIENT_IP,
	            'uid'        => 0,
	            'sid'        => $sid,
	            'view'       => $viewfrom,
	            'push'       => $pushtoken,
	            'host'       => $host,
	            'source'     => $source,
	            'client'     => $client,
	            'time'       => UTC_TIME
	        ];

	        echo Helper::encryptData($data);
        }
    }
?>