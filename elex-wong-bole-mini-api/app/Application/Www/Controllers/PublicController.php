<?php

namespace App\Application\Www\Controllers;

use App\Application\Www\Services\SiteAdminService;
use App\Models\Site\User;
use App\Models\Site\CallLog;
use App\Models\Site\SmsLog;
use Aws\S3\S3Client;
use Aws\Exception\AwsException;
use \Nexmo\Client;
use \Nexmo\Client\Credentials\Container;
use \Nexmo\Client\Credentials\Basic;
use \Nexmo\Client\Credentials\Keypair;

use Session, Redirect, Helper, Request, DB, Config, Time;

class PublicController extends BaseController {
	
    public function login() {
    	return $this->display();
    }

    public function dologin() {
        $admin = SiteAdminService::instance()->login(Request::get('name'), Request::get('pwd'));
        //$this->systemService->navs();
        //$this->systemService->getAdminNavs($admin);
        $this->setAdminAuth($admin);
        return $this->success('', Helper::url('Index/index'));
    }

	public function logout() {
		Session::flush();
		return Redirect::to(Helper::url("Public/login"));
	}
	
	public function test() {
		$basic  = new Basic('2c53db6f', 'RULw7kRQgxgD4qwK');
		$keypair = new Keypair(
			'-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCKmD6Je4G4jOgQ
FARCGL+55Bei9s+ae10MZ26aHhE9rx+vEVz0+jgyHOMoyCjeozSYqUPXZBmkxNQb
YtgoNY+Xlwj+Sx1DxFms93rDDnwN9JiSYC/5/dYra9Sa8/+Z8XbXo1RfUvAAP5/S
JkG5gnmHoshx+BqX4VwWeKkBDMZOXBNJgDOJmSgqBbkrWEbz2tJr1H8c6mA69sK3
wuAUF/GhcP7geXx452OZxtmQrWzaJV70ZajNQ+W+CylSgcshCky5NTkXniOioZGw
cjzpXuJODubJXzxFIMmq2jdg7qD6YoSdj5kQvWm1t94eF387vWWPnTEgarpxZADE
yWgouiDzAgMBAAECggEAA7kYQPg04WDDoR7wiFgC2nsCmYmYxRUYSEuFAJXbL7WD
G+BTB2+rT8lP3toVovluYcV2QZR6Td9NtVif5uCddVyEzNP2usnNAOT7Ar9iXLub
157G2yfS94KjiPASBzAh2aQVEaR4NwF+iRYnANU874RTbyBTko3mu+HM5G7T6unr
KSTQoQB5FWZz3MVP4lCeKs/MIWlz62NDc9NlZPl/4kyR6nQGTMBrQ517hkMmm2O8
XLD/uJqw7EbT1YYfaEYKjx1xw+3vSxrj4XG9H2LUNb5bDz5TjcUaePqVOwsQ+uVI
bfO/aQngk4+Su+QVHNXxlbYUxvXRz+tywUI8MwukUQKBgQDBR99lSkjHFakwjeqi
SYJZtecA6YS3PxtlMoCHucGW+qMWj13jrdlAqzhY3MLwvcWohcZeNkDa9tCH7DPD
FuzHgTOKXvatj404PoS++t1+e8weLr1e+LaIHZhSmVaHs5j08Vg3IFDxfzN5o8sH
c5Coc+ZibzvmgK6fTSoP9NyYUQKBgQC3kYSg57AMd6xmaQ3duL3BIv4mtEs4KpSl
H6Moh9349pH3SoAKZLmmKY79y5fDgLtb7EeMFWOFE1ECDF99saOLAziX6Ob5cxkm
bda5mwuXXBpjKfQgB3dhdUGSh7bsRtJiV6H9j/kRRPbKMxKqZctlZsu/osXfZKNA
WwzYx6DYAwKBgGNhs2p/scA8UQyYTEc6CP5b2/XKHOWkW0/Dkfc3+mTJZ0ZYXWyO
naD06To3+TyUN6gZcRBMUTjFpB/fwhXUGdfThU7m2WwQ3gpHizYwA+ffe+shGVpW
BHUk0ofWNHn+TO3Vkwh1Y2lpgGxRXjnsoDsdrR58F47EKAXdRX2C6FKhAoGBAII9
ip4nA+80kWrvqljflDINw8huLtggzeoB8l71VvYm6xVLFGFLabSM09kZtAmPsl7b
2z92hW+LbvRHFxE1EdW1aVfOdOITWYq8b5asfKLdRBOLVpvK8FaDPQzboVsuPGJt
zo76sTohdf+sENg49QBy2KiUslN3MaSddRXxPRtFAoGAI8Te4aFWrIZDAAuv7O2h
JGCGrbGueOqsuJSA9g3BJX9hYCyhEc5Sw9L1xeHbeWZVbh8uG2ZOkDisXIDNwFzO
FCOerT0RL+lNTTg5WTviFpgO6xTbEf7MRophOytbsw07tvrckcrWIm1Qe+XtjstI
eHq9mvuNVWdgGnYHY7NjTIg=
-----END PRIVATE KEY-----',
			'40b90f7f-ff1e-4afd-b4ef-3b1d41e16c12'
		);
		$client = new Client(new Container($basic, $keypair));
		$call = $client->calls()->create([
			'to' => [[
				'type' => 'phone',
				'number' => '8615123925591'
			]],
			'from' => [
				'type' => 'phone',
				'number' => '447418340571'
			],
			'answer_url' => ['https://developer.nexmo.com/ncco/tts.json'],
		]);
		var_dump($call->getDirection());
		exit;
		return $this->display();
	}
	
	public function calllogtos3() {
		set_time_limit(0);
		$api = 'system/athena/save';
		$data = ['table' => 'CallLog'];
		$index = (int)Request::get('index');
		$count = 100;
		$list = CallLog::skip($index * $count)->take($count)->orderBy('id', 'ASC')->get();
		foreach ($list as $item) {
			$mobile = $item->mobile;
			$item = $item->toArray();
			$item['mobile'] = $mobile;
			$item['site_id'] = APP_CURRENT_SITE_ID;
			$item['create_month'] = Time::toDate($item['create_time'], 'Y/m');
			$data['key'] = 'call_log/'.APP_CURRENT_SITE_ID.'/'.$item['create_month'].'/'.$item['id'].'.orc';
			$data['data'] = json_encode($item);
			$result = $this->athenarun($api, $data);
		}
		
		if (count($list) < $count) {
			echo 'OK';
		} else {
			echo 'run';
			echo "<script>setTimeout(function(){
				location.href='".Helper::url('Public/calllogtos3', ['index' => $index + 1, 'time' => UTC_TIME])."';
			}, 1000);</script>";
		}
	}
	
	public function athenatest() {
		echo time()."<br/>";
		$sql = "SELECT SUM(create_time) FROM call_log";
		$result = $this->athenarun('system/athena/execute', ['sql' => $sql]);
		var_dump($result);
		echo "<br/>" . time();
	}
	
	public function athenainit() {
		set_time_limit(0);
		$table = 'operation_log';
		$index = (int)Request::get('index');
		$api = 'system/athena/execute';
		$site_ids = [1,2,3,4,5,6];
		if ($index >= count($site_ids)) {
			$sql = "MSCK REPAIR TABLE {$table}";
			$this->athenarun($api, ['sql' => $sql]);
			echo "OK";
			exit;
		}
		
		$site_id = $site_ids[$index];
		$config = Config::get('database.connections.athena.config');
		$config['http'] = ['verify' => false];
		$client = new S3Client($config);
		
		for($year = 2016; $year <= 2026; $year++) {
			for($month = 1; $month <= 12; $month++) {
				$create_month = $year . '/' . ($month < 10 ? '0' : '') . $month;
				$s3_path = "{$table}/{$site_id}/{$create_month}/";
				$result  = $client->putObject([
					'Bucket' => 'db-open',
					'Key'    => $s3_path
				]);
				$sql = "ALTER TABLE {$table} ADD PARTITION (site_id = {$site_id}, create_month = '{$create_month}') location 's3://db-open/{$s3_path}'";
				$result = $this->athenarun($api, ['sql' => $sql]);
			}
		}
		
		echo "<script>setTimeout(function(){
			location.href='" . Helper::url("Public/athenainit", ['index' => $index + 1, 'time' => UTC_TIME]) . "';
		}, 1000);</script>";
	}
	
	private function athenarun($url, $data) {
		$ci = curl_init();
		curl_setopt($ci, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1); 
		curl_setopt($ci, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ci, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ci, CURLOPT_SSL_VERIFYHOST, false);
		curl_setopt($ci, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
		curl_setopt($ci, CURLOPT_HEADER, false);
		$data = base64_encode(json_encode($data));

		$header = [
			'Authorization:' . base64_encode('bY5V7epeLebhYscM2O8a9hi2IaaZjJht:' . md5($data.'7kMkZxlhXy2ymbcxMpIa8QKIsFf8YEfK'))
		];
		$args['data'] = $data;
		curl_setopt($ci, CURLOPT_HTTPHEADER, $header);
		curl_setopt($ci, CURLOPT_POST, TRUE);
		if(is_array($args)) {
			curl_setopt($ci, CURLOPT_POSTFIELDS, http_build_query($args));
		} else {
			curl_setopt($ci, CURLOPT_POSTFIELDS, $args);
		}
		curl_setopt($ci, CURLOPT_URL, 'http://127.0.0.1:8012/' . $url);
		$response = curl_exec($ci);
		curl_close ($ci);
		
		$responsestr = $response = empty($response) ? false : @json_decode($response, true);
		if (!$response || !isset($response['status']) || !$response['status']) {
			var_dump($responsestr);
			if (strpos($response['msg'], 'Partition already exists') < 1) {
				exit;
			}
		}
		return $response['data'];
	}
	
	public function user() {
		define('PAY_MCRYPT_KEY', '126a7cuqYAWktwZu');
		define('PAY_MCRYPT_IV', 'sky133');
	
		$list = User::where('is_encry', 2)->limit(1000)->orderBy('id', 'ASC')->get();
		foreach ($list as $item) {
			$item->mobile = $item->mobile ? Helper::encryptData(openssl_decrypt($item->mobile, 'AES-128-CBC', PAY_MCRYPT_KEY, 0, sprintf("%-'_16s", PAY_MCRYPT_IV))) : '';
			$item->email = $item->email ? Helper::encryptData(openssl_decrypt($item->email, 'AES-128-CBC', PAY_MCRYPT_KEY, 0, sprintf("%-'_16s", PAY_MCRYPT_IV))) : '';
			$item->is_encry = 1;
			$item->save();
		}
		
		if (count($list) < 1000) {
			echo 'OK';
		} else {
			echo 'run';
			echo "<script>setTimeout(function(){
				location.href='".Helper::url('Public/user')."?t=".UTC_TIME."';
			}, 1000);</script>";
		}
	}
	
	public function encryptUser() {
		set_time_limit(0);
		
		$list = User::where('is_encry', 0)->limit(1000)->orderBy('id', 'ASC')->get();
        DB::connection()->beginTransaction();
		try {
			foreach ($list as $item) {
				$item->mobile1 = Helper::encryptData($item->mobile);
				$item->email1 = Helper::encryptData($item->email);
				$item->is_encry = 1;
				$item->save();
			}
			DB::connection()->commit();
        } catch(\Exception $e) {
            DB::connection()->rollback();
            throw $e;
        }
		
		if (count($list) < 1000) {
			echo 'OK';
		} else {
			echo 'run';
			echo "<script>setTimeout(function(){
				location.href='".Helper::url('Public/encryptUser')."?t=".UTC_TIME."';
			}, 1000);</script>";
		}
	}
	
	public function encryptCall() {
		set_time_limit(0);
		
		$list = CallLog::where('is_encry', 0)->limit(1000)->orderBy('id', 'ASC')->get();
        DB::connection()->beginTransaction();
		try {
			foreach ($list as $item) {
				$item->mobile1 = Helper::encryptData($item->mobile);
				$item->is_encry = 1;
				$item->save();
			}
			DB::connection()->commit();
        } catch(\Exception $e) {
            DB::connection()->rollback();
            throw $e;
        }
		
		if (count($list) < 1000) {
			echo 'OK';
		} else {
			echo 'run';
			echo "<script>setTimeout(function(){
				location.href='".Helper::url('Public/encryptCall')."?t=".UTC_TIME."';
			}, 1000);</script>";
		}
	}
	
	public function encryptSms() {
		set_time_limit(0);
		
		$list = SmsLog::where('is_encry', 0)->limit(1000)->orderBy('id', 'ASC')->get();
        DB::connection()->beginTransaction();
		try {
			foreach ($list as $item) {
				$item->mobile1 = Helper::encryptData($item->mobile);
				$item->is_encry = 1;
				$item->save();
			}
			DB::connection()->commit();
        } catch(\Exception $e) {
            DB::connection()->rollback();
            throw $e;
        }
		
		if (count($list) < 1000) {
			echo 'OK';
		} else {
			echo 'run';
			echo "<script>setTimeout(function(){
				location.href='".Helper::url('Public/encryptSms')."?t=".UTC_TIME."';
			}, 1000);</script>";
		}
	}
	
	public function encrypt() {
		set_time_limit(0);
		
		DB::connection()->beginTransaction();
		try {
			$list = User::where('is_encry', 0)->get();
			foreach ($list as $item) {
				$item->mobile1 = Helper::encryptData($item->mobile);
				$item->email1 = Helper::encryptData($item->email);
				$item->is_encry = 1;
				$item->save();
			}
			
			$list = CallLog::where('is_encry', 0)->get();
			foreach ($list as $item) {
				$item->mobile1 = Helper::encryptData($item->mobile);
				$item->is_encry = 1;
				$item->save();
			}
			
			$list = SmsLog::where('is_encry', 0)->get();
			foreach ($list as $item) {
				$item->mobile1 = Helper::encryptData($item->mobile);
				$item->is_encry = 1;
				$item->save();
			}
			
			DB::connection()->commit();
        } catch(\Exception $e) {
            DB::connection()->rollback();
            throw $e;
        }
		echo 'OK';
	}
}
