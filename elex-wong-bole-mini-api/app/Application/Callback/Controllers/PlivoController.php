<?php
namespace App\Application\Callback\Controllers;

use App\Models\Site\CallLog;
use App\Models\Site\User;
use Plivo\RestClient;
use Plivo\XML\Response;
use Request, Time, Helper, Http;

class PlivoController extends BaseController {

	public function __construct() {
		ignore_user_abort(true);
		set_time_limit(0);
		header("Access-Control-Allow-Origin: *");
		parent::__construct();
    }
	
    
    public function message() {
        $this->log('plivoMessage.log', var_export($_REQUEST, true));
    }

    public function answer() {
        $this->log('plivoAnswer.log', var_export($_REQUEST, true));

		header('Content-type: text/xml');
        $log_id     = (int)Request::get('To');
        $log        = false;
        if ($log_id > 0) {
            $log = CallLog::find($log_id);
        }
		
		$response = new Response;
		if (!$log) {
			$params = [
				'schedule' 	=> "5",
				'reason' 	=> "rejected"
			];

			$response->addHangup($params);
			$speak_params = [
				'loop' => "0"
			];

			$speak_body = "拨打电话失败";
			$response->addSpeak($speak_body,$speak_params);

			die($response->toXML());
        }
	
		$log->api_type = 'plivo';
        $log->sid = Request::get('CallUUID');
        $log->save();

		$params = [
			'action' => Helper::url('plivo/record'),
			'startOnDialAnswer' => true,
			'redirect' => false,
			'maxLength' => 7200
		];
		$response->addRecord($params);
		
		$dial = $response->addDial(['callerId' => $this->site->config['plivo']['phone_number']]);
		$number = '86' . $log->mobile;
		$dial->addNumber($number);

		die($response->toXML());
    }
	
	public function fallback() {
        $this->log('plivoFallback.log', var_export($_REQUEST, true));
    }
	
	public function hangup() {
        $this->log('plivoHangup.log', var_export($_REQUEST, true));
		$sid = Request::get('CallUUID');
        if (empty($sid)) {
            exit;
        }

        $log = CallLog::where('sid', $sid)->first();
        if (!$log) {
            exit;
        }
        
        $log->status = Request::get('CallStatus');
		$log->duration = (int)Request::get('Duration');
		if ($log->status == 'completed' && $log->duration == 0) {
			$log->status = 'no-answer';
		}
		$log->direction = Request::get('Direction');
		$log->begin_time = Time::toTime(Request::get('StartTime'));
		$log->end_time = Time::toTime(Request::get('EndTime'));
		$log->save();
    }
	
	public function record() {
		$this->log('plivoRecord.log', var_export($_REQUEST, true));
		
		$sid = Request::get('CallUUID');
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
		
		$this->sendRecordToS3ByLog($log, false, 300, true);
		echo 'SUCCESS';
	}
	
	private function sendRecordToS3ByLog($log, $isRepeat = true, $timeOut = 30, $isDebug = false) {
		try {
			$client = new RestClient($this->site->config['plivo']['auth_id'], $this->site->config['plivo']['auth_token']);
			$recordings = $client->recordings->list([
				"call_uuid" => $log->sid
			]);
			$recordings = $recordings->get();
			
			$path = Time::toDate($log->create_time, '/Y/m/d/');
			$date = Time::toDate($log->create_time, 'Y-m-d H·i·s');
			$path = 'voices/' . APP_SITE_DOMAIN . $path . "{$log->account_name}({$log->real_name})_{$log->creator}_{$date}.mp3";
			$url = count($recordings) < 1 ? '' : $recordings[0]->recordingUrl;
			if (!empty($url)) {
				$data = [
					"url" => str_replace('https://', 'http://', $url),
					"bucket" => "openresources",
					"key" => $path,
					"cburl" => str_replace('https://', 'http://', Helper::url('plivo/voiceRecordSave', ['sid' => $log->sid]))
				];
				
				if ($isDebug) {
					echo json_encode($data);
				}
				$result = $this->requestApiGateway($data, $timeOut, $isDebug);
				if ($isDebug) {
					var_dump($result);
				}
			}
			$log->send_record_time = UTC_TIME;
			$log->send_record_num += 1;
			$log->save();
        } catch(\Exception $e) {
            
        }
		
		if ($isRepeat) {
			sleep(10);
			Http::post(Helper::url('plivo/record'), ['CallUUID' => $log->sid], [], 1);
		}
	}
	
	public function voiceRecordSave() {
		$this->log('plivoVoiceRecordSave.log', var_export($_REQUEST, true));
		
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
		echo 'OK';
    }
	
	private function requestApiGateway($data, $timeOut = 1, $isDebug = false) {
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
		if ($isDebug) {
			var_dump(curl_getinfo($ci));
			var_dump(curl_error($ci));
		}
		curl_close($ci);
		return $response;
		
	}
}
