<?php 
namespace App\Application\Www\Services;

use App\Models\Site\User;
use App\Models\Site\CallLog;
use Twilio\Rest\Client;
use Strings, Time, Helper, Lang, File;

class CallLogService extends EloquentService {
	protected $type = 0;
	
	public function getToken($config) {
		$service = '\App\Application\Www\Services\\' . ucfirst($config['type']) . 'Service';
		$service = new $service;
		return $service->getToken($config[$config['type']]);
	}
	
    public function lists($data = []) {
		$type = $this->type;
        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) use($type) {
			$builder->where('type', $type);
			
			/*if (!APP_CURRENT_ADMIN_IS_SUPER) {
				$builder->where('creator', APP_CURRENT_ADMIN_NAME);
			}*/
			
			$begin_time = isset($data['begin_time']) ? Time::toTime(trim($data['begin_time'])) : 0;
            if ($begin_time > 0) {
                $builder->where('create_time', '>=', $begin_time);
            }

            $end_time = isset($data['end_time']) ? Time::toTime(trim($data['end_time'])) : 0;
            if ($end_time > 0) {
                $builder->where('create_time', '<=', $end_time);
            }
			
            $account_name = isset($data['account_name']) ? trim($data['account_name']) : '';
            if (!empty($account_name)) {
                $builder->where('account_name', 'like', "%{$account_name}%");
            }

            $real_name = isset($data['real_name']) ? trim($data['real_name']) : '';
            if (!empty($real_name)) {
                $builder->where('real_name', 'like', "%{$real_name}%");
            }
			
			$creator = isset($data['creator']) ? trim($data['creator']) : '';
            if (!empty($creator)) {
                $builder->where('creator', $creator);
            }
			
			$status = isset($data['status']) ? trim($data['status']) : 'all';
            switch($status) {
				case 'completed':
					$builder->where('status', 'completed');
				break;
				
				case 'no-answer':
					$builder->where('status', 'no-answer');
				break;
				
				case 'other':
					$builder->whereNotIn('status', ['completed', 'no-answer']);
				break;
			}
        };
        return parent::lists($data);
    }
	
	public function export($data) {
		unset($data['page_size']);
		
		$clear_dir = APP_SITE_PATH . 'public/resources/calllog/' . Time::toDate(UTC_TIME - 86400 * 2, 'Y/m/d/');
		File::deleteDirectory($clear_dir);
		
		$list = $this->lists($data);
		
		$date_path = Time::toDate(UTC_TIME, 'Y/m/d');
		$date_time = Time::toDate(UTC_TIME, 'Y-m-d H·i·s');
		$file_dir  = "resources/calllog/{$date_path}/";
		$index = 0;
		do {
			$file_name = "{$file_dir}call_log_{$date_time}_{$index}.csv";
			$file_path = APP_SITE_PATH . 'public/' . $file_name;
		} while(file_exists($file_path));
		
		$file_dir = APP_SITE_PATH . 'public/' . $file_dir;
		if (!file_exists($file_dir)) {
			mkdir($file_dir, 0777, true);
		}
		$file_url  = Helper::resource($file_name);
		$content = '';
		if ($this->type != 1) {
			$content .= Lang::get('common.call_log_fields.account_name') . ",";
		}
		$content .= Lang::get('common.call_log_fields.real_name') . "," . 
				    Lang::get('common.call_log_fields.auth_mobile') . "," . 
				    Lang::get('common.call_log_fields.creator') . "," . 
				    Lang::get('common.call_log_fields.create_time') . "," . 
				    Lang::get('common.call_log_fields.end_time') . "," . 
				    Lang::get('common.call_log_fields.duration') . "," . 
				    Lang::get('common.call_log_fields.status') . "," . 
				    Lang::get('common.call_log_fields.remark') . "," . 
				    Lang::get('common.call_log_fields.record');
		file_put_contents($file_path, $content, FILE_APPEND);
		foreach ($list as $item) {
			$content = "\n";
			if ($this->type != 1) {
				$content .= '"' . Helper::formatCsvValue($item['account_name']) . '",';
			}
			$content .= '"' . Helper::formatCsvValue($item['real_name']) . '",' . 
					    '"' . Helper::formatCsvValue($item['auth_mobile']) . '",' . 
					    '"' . Helper::formatCsvValue($item['creator']) . '",' . 
					    '"' . Time::toDate($item['create_time']) . '",' . 
					    '"' . Time::toDate($item['end_time']) . '",' . 
					    '"' . $item['duration'] . '",' . 
					    '"' . Helper::formatCsvValue($item['status']) . '",' . 
					    '"' . Helper::formatCsvValue($item['remark']) . '",' . 
					    '"' . Helper::formatCsvValue($item['record']) . '"';
			file_put_contents($file_path, $content, FILE_APPEND);
		}
		return $file_url;
	}

    public function create($data) {
        $user = User::where('id', $data['user_id'])->where('type', $this->type)->first();
		if (!$user) {
			$this->throwException('common.user_not_exist');
		}
        $data['create_time'] = UTC_TIME;
        $data['creator'] = APP_CURRENT_ADMIN_NAME;
        $data['mobile'] = $user->mobile;
		if ($this->type != 1) {
			$data['account_name'] = $user->name;
		}
        $data['real_name'] = $user->real_name;
		$data['type'] = $this->type;

        $this->saveExtend = function($primary_val, &$data, &$attributes) use($user)  {
            $user->last_call_time = UTC_TIME;
            $user->save();
        };

        return parent::create($data);
    }
	
	public function getRecord($id, $twilio) {
        $log = CallLog::find($id);
		return $this->getRecordByLog($log, $twilio);
    }
	
	public function getRecordBySid($sid, $twilio) {
		if (empty($sid)) {
			return '';
		}
		
        $log = CallLog::where('sid', $sid)->first();
        return $this->getRecordByLog($log, $twilio);
    }
	
	private function getRecordByLog($log, $twilio) {
		if (!$log || !empty($log->record)) {
            if ($log->record == 'empty') {
                return '';
            }
            return $log->record;
        }
        $client = new Client($twilio['account_sid'], $twilio['auth_token']);
        $recordings = $client->recordings->read([
            "callSid" => $log->sid
        ]);

        $url = count($recordings) < 1 ? '' : $recordings[0]->uri;
        if (!empty($url)) {
            $url = $record = 'http://api.twilio.com' . str_replace('.json', '.mp3', $url);
        } else {
            $record = 'empty'; 
        }
        $log->record = $record;
        $log->save();
        return $url;
	}

    public function remark($id, $remark) {
		$log = CallLog::where('id', $id)->where('type', $this->type);
		
		if (!APP_CURRENT_ADMIN_IS_SUPER) {
			$log->where('creator', APP_CURRENT_ADMIN_NAME);
		}
		
		$log->update([
			'remark' => $remark,
			'remark_match' => Strings::strToUnicode($remark)
		]);
    }
}