<?php 
namespace App\Application\Www\Services;

use App\Application\Www\Models\OperationLog;
use Time;

class OperationLogService extends EloquentService {
    public function lists($data = []) {
        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) {
            $begin_time = isset($data['begin_time']) ? Time::toTime(trim($data['begin_time'])) : 0;
            if ($begin_time > 0) {
                $builder->where('create_time', '>=', $begin_time);
            }

            $end_time = isset($data['end_time']) ? Time::toTime(trim($data['end_time'])) : 0;
            if ($end_time > 0) {
                $builder->where('create_time', '<=', $end_time);
            }
        };
        return parent::lists($data);
    }

    public function create($data) {
		global $auth_old_data;
		
        $data['creator'] = APP_CURRENT_ADMIN_NAME;
        $data['controller'] = APP_CONTROLLER_NAME;
        $data['action'] = APP_ACTION_NAME;
        $data['ip'] = CLIENT_IP;
        $data['create_time'] = UTC_TIME;
		$data['olddata'] = $auth_old_data;
		OperationLog::create($data);
    }
}