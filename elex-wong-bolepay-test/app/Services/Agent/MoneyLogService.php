<?php 
namespace App\Services\Agent;

use App\Models\Agent\MoneyLog;

class MoneyLogService extends EloquentService {

    public function created($agent, $money, $balance, $relatedKey, $relatedType, $remark = '') {
        $log = new MoneyLog;
        $log->agent_id     = $agent->id;
        $log->agent_name   = $agent->name;
        $log->agent_ids    = $agent->getAgentIds();
        $log->balance      = $balance;
        $log->related_key  = $relatedKey;
        $log->related_type = $relatedType;
        $log->create_time  = UTC_TIME;
        $log->create_date  = UTC_DAY;
        $log->remark       = $remark;

        if ($log->related_type == 'admin_modify') {
            $log->admin_id     = APP_CURRENT_ADMIN_ID;
            $log->admin_name   = APP_CURRENT_ADMIN_NAME;
        }

        if ($money > 0) {
            $log->increase = $money;
            $log->decrease = 0;
        } else {
            $log->increase = 0;
            $log->decrease = abs($money);
        }
        return $log->save();
    }
}