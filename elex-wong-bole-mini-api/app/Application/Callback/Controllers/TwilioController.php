<?php
namespace App\Application\Callback\Controllers;

use App\Models\Site\CallLog;
use App\Models\Site\User;
use Twilio\Twiml;
use Twilio\Rest\Client;
use Request, Time, Http, Helper;

class TwilioController extends BaseController {

	public function __construct() {
		ignore_user_abort(true);
		set_time_limit(0);
		header("Access-Control-Allow-Origin: *");
		parent::__construct();
    }
	
    
    public function voice() {
        //$this->log('voice.log', var_export($_REQUEST, true));
        $log_id     = (int)Request::get('LogId');
        $log        = false;
        if ($log_id > 0) {
            $log = CallLog::find($log_id);
        }

        $response = new Twiml;
        if (!$log) {
            $response->say("拨打电话失败");
            exit;
        }

        $log->sid = Request::get('CallSid');
		$log->api_type = 'twilio';
        $log->save();

        $number = '+86' . $log->mobile;
        $dial = $response->dial([
			'callerId' => $this->site->config['twilio']['phone_number'],
			'record' => true
		]);
		
        if (preg_match("/^[\d\+\-\(\) ]+$/", $number)) {
            $dial->number($number);
        } else {
            $dial->client($number);
        }

        header('Content-Type: text/xml');
        echo $response;
		//$this->log('voice.log', $response . '');
        exit;
    }

    public function voiceCallback() {
        //$this->log('voiceCallback.log', var_export($_REQUEST, true));

        $sid = Request::get('CallSid');
        if (empty($sid)) {
            exit;
        }

        $log = CallLog::where('sid', $sid)->first();
        if (!$log) {
            exit;
        }
        
        try {
            $client = new Client($this->site->config['twilio']['account_sid'], $this->site->config['twilio']['auth_token']);
            $calls = $client->calls->read([
                "parentCallSid" => $sid
            ]);
            if (count($calls) < 1) {
                sleep(5);
                Http::post(Request::fullUrl(), Request::all(), [], 1);
                exit;
            }
            $call = $calls[0];
            $log->status = $call->status;
            $log->duration = $call->duration;
            $log->direction = $call->direction;
            $log->begin_time = $call->startTime->getTimestamp() - date('Z');
            $log->end_time = $call->endTime->getTimestamp() - date('Z');
            $log->save();
			
			if ($log->status == 'completed' && $log->send_record_status != 1 && $log->send_record_num < 6) {
				$this->sendRecordToS3ByLog($log);
			}
        } catch(\Exception $e) {
            sleep(5);
            Http::post(Request::fullUrl(), Request::all(), [], 1);
        }
    }
	
	public function sendRecordToS3() {
		$sid = Request::get('CallSid');
        if (empty($sid)) {
            exit;
        }

        $log = CallLog::where('sid', $sid)
					  ->where('send_record_status', '<>', 1)
					  ->where('send_record_num', '<', 6)
					  ->first();
        if (!$log) {
            exit;
        }
		
		$this->sendRecordToS3ByLog($log);
	}
	
	public function forceSendRecordToS3() {
		$sid = Request::get('CallSid');
        if (empty($sid)) {
			echo 'NO SID';
            exit;
        }

        $log = CallLog::where('sid', $sid)->first();
        if (!$log) {
			echo 'NO LOG';
            exit;
        }
		
		$this->sendRecordToS3ByLog($log, false, 300);
		echo 'SUCCESS';
	}
	
	private function sendRecordToS3ByLog($log, $isRepeat = true, $timeOut = 20, $isDebug = false) {
		try {
			$client = new Client($this->site->config['twilio']['account_sid'], $this->site->config['twilio']['auth_token']);
			$recordings = $client->recordings->read([
				"callSid" => $log->sid
			]);
			
			$path = Time::toDate($log->create_time, '/Y/m/d/');
			$date = Time::toDate($log->create_time, 'Y-m-d H·i·s');
			$path = 'voices/' . APP_SITE_DOMAIN . $path . "{$log->account_name}({$log->real_name})_{$log->creator}_{$date}.mp3";
			$url = count($recordings) < 1 ? '' : $recordings[0]->uri;
			if (!empty($url)) {
				$url = 'http://api.twilio.com' . str_replace('.json', '.mp3', $url);
				$data = [
					"url" => $url,
					"bucket" => "openresources",
					"key" => $path,
					"cburl" => Helper::url('twilio/voiceRecordSave', ['sid' => $log->sid])
				];
				if ($isDebug) {
					echo json_encode($data);
					exit;
				}
				$this->requestApiGateway($data, $timeOut);
			}
			$log->send_record_time = UTC_TIME;
			$log->send_record_num += 1;
			$log->save();
        } catch(\Exception $e) {
            
        }
		
		if ($isRepeat) {
			sleep(10);
			Http::post(Helper::url('twilio/sendRecordToS3'), ['CallSid' => $log->sid], [], 1);
		}
	}
	
	public function voiceRecordSave() {
		//$this->log('voiceRecordSave.log', var_export($_REQUEST, true));
		
		$sid = Request::get('sid');
        if (empty($sid)) {
            exit;
        }

		$data = @base64_decode(str_replace(' ', '+', Request::get('data')));
		if (empty($data)) {
			exit;
		}

        $log = CallLog::where('sid', $sid)->first();
        if (!$log) {
            exit;
        }
		
		$log->record = $data;
		$log->send_record_status = 1;
        $log->send_record_time   = UTC_TIME;
		$log->save();
    }
	
	public function voiceFallback() {
        $this->log('voiceFallback.log', var_export($_REQUEST, true));
    }

    public function voiceFail() {
        $this->log('voiceFail.log', var_export($_REQUEST, true));
    }

    public function voiceIn() {
        $response = new Twiml;
        $response->say("您好 客服系统已登记成功 你可以挂断电话 我们的客服人员会立即与你取得联系 请稍候");
        //$this->log('voiceIn.log', var_export($_REQUEST, true));
    }

    public function voiceInCallback() {
        $this->log('voiceInCallback.log', var_export($_REQUEST, true));
    }

    public function sms() {
        $this->log('sms.log', var_export($_REQUEST, true));
    }

    public function smsCallback() {
        $this->log('smsCallback.log', var_export($_REQUEST, true));
    }

    public function smsFail() {
        $this->log('smsFail.log', var_export($_REQUEST, true));
    }
	
	public function smsFallback() {
        $this->log('smsFallback.log', var_export($_REQUEST, true));
    }

    public function smsIn() {
        $this->log('smsIn.log', var_export($_REQUEST, true));
    }
	
	private function requestApiGateway($data, $timeOut = 1) {
		$ci = curl_init();
		curl_setopt($ci, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1); 
		curl_setopt($ci, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ci, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
		curl_setopt($ci, CURLOPT_HEADER, false);
		curl_setopt($ci, CURLOPT_POST, TRUE);
		curl_setopt($ci, CURLOPT_TIMEOUT, $timeOut);
		curl_setopt($ci, CURLOPT_POSTFIELDS, json_encode($data));
		curl_setopt($ci, CURLOPT_URL, 'https://rju3mte3fl.execute-api.ap-northeast-1.amazonaws.com/v1/downtos3');
		$response = curl_exec($ci);
		curl_close($ci);
		return $response;
	}
}
