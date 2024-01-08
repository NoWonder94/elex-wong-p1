<?php 
namespace App\Models\System;

class Agent extends Base {
    public $isCreateTime = true;
    public $isSetAdmin = true;

    public function parent(){
        return $this->hasOne(Agent::class, 'id', 'parent_id');
    }

    public function payments(){
        $relation = $this->hasMany(AgentPayment::class, 'agent_id');
        return $relation;
    }

    public function getParentIds() {
        if (empty($this->attributes['parent_ids'])) {
            return [];
        }
        return explode(',', $this->attributes['parent_ids']);
    }

    public function getAgentIds() {
        if (empty($this->attributes['parent_ids'])) {
            return $this->attributes['id'];
        }
        return $this->attributes['parent_ids'] . ',' . $this->attributes['id'];
    }

    public function getFinishTypes() {
        switch ($this->attributes['finish_type']) {
            case 1:
                return [1, 2, 3];
                break;

            case 2:
                return [2, 3];
                break;

            case 3:
                return [3];
                break;
        }
        return [];
    }

    public function checkAdminIp($ip) {
        if (IS_DEV_MODE) {
            return true;
        }

        $ips = trim($this->attributes['admin_ips']);
        $ips = empty($ips) ? [] : explode(',', $ips);
        if (count($ips) > 0 && !in_array($ip, $ips)) {
            return false;
        }
        return true;
    }

    public function checkApiIp($ip) {
        if (IS_DEV_MODE) {
            return true;
        }

        $ips = trim($this->attributes['api_ips']);
        $ips = empty($ips) ? [] : explode(',', $ips);
        if (count($ips) > 0 && !in_array($ip, $ips)) {
            return false;
        }
        return true;
    }
}