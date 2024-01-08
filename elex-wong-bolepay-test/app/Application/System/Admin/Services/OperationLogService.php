<?php 
namespace App\Application\System\Admin\Services;

use App\Application\System\Admin\Models\OperationLog;
use Time, Helper;

class OperationLogService extends EloquentService {
    public function lists($data = []) {
        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) {
            $begin_time = isset($data['begin_time']) ? Time::toTime(trim($data['begin_time'])) : 0;
            if ($begin_time > 0) {
                $builder->where('create_time', '>=', $begin_time);
            }

            $end_time = isset($data['end_time']) ? Time::toTime(trim($data['end_time'])) : 0;
            if ($end_time > 0) {
                $builder->where('create_time', '<', $end_time + 86400);
            }
        };

        $this->listFormatOrder = function(&$builder, &$data, &$attributes) {
            $builder->orderBy('create_time', $attributes['sort']);
        };
        
        return parent::lists($data);
    }

    public function create($data) {
		global $auth_old_data;
		
        $data['admin_id'] = APP_CURRENT_ADMIN_ID;
        $data['admin_name'] = APP_CURRENT_ADMIN_NAME;
        $data['controller_action'] = APP_CONTROLLER_NAME . '/' . APP_ACTION_NAME;
        $data['ip'] = CLIENT_IP;
        $data['create_time'] = UTC_TIME;
        if (in_array(strtolower($data['controller_action']), ['index/dopwd', 'admin/create'])) {
            $data['request'] = Helper::encryptData($data['request']);
        }
		$data['olddata'] = $auth_old_data;
        
        $operation = new OperationLog($data);
        $operation->save(); 
    }
}