<?php 
namespace App\Application\Www\Services;

use App\Models\Site\User;
use Time;

class SmsLogService extends EloquentService {
	protected $type = 0;
	
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
        };
        return parent::lists($data);
    }

    public function create($data) {
		$user = User::where('id', $data['user_id'])->where('type', $this->type)->first();
		if (!$user) {
			$this->throwException('common.user_not_exist');
		}
		
        $data['mobile'] = $user->mobile;
		if ($this->type != 1) {
			$data['account_name'] = $user->name;
		}
        $data['real_name'] = $user->real_name;
        $data['create_time'] = UTC_TIME;
        $data['creator'] = APP_CURRENT_ADMIN_NAME;
		$data['type'] = $this->type;

        $config = $data['config'];
        unset($data['config']);
		
		$data['api_type'] = $config['type'];

        $this->savePre = function(&$model, &$data, &$attributes) use($config) {
			$service = '\App\Application\Www\Services\\' . ucfirst($config['type']) . 'Service';
			$service = new $service;
            $data['sid'] = $service->sendSms($config[$config['type']], $data['mobile'], $data['content']);
        };

        $this->saveExtend = function($primary_val, &$data, &$attributes) use($user)  {
            $user->last_sms_time = UTC_TIME;
            $user->save();
        };
        return parent::create($data);
    }
}