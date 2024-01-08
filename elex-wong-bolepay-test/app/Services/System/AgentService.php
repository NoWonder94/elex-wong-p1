<?php
namespace App\Services\System;

use App\Models\System\Agent;
use App\Models\System\AgentLock;
use SystemCache;

class AgentService extends \App\Services\BaseEloquentService {

    public function getByAppId($appId) {
        return Agent::where('app_id', $appId)->first();
    }

    public function resetCache($agent) {
        SystemCache::forget('agent_id_' . $agent->id);
        SystemCache::forget('agent_name_' . $agent->name);
        $this->getCacheById($agent->id);
    }

    public function getCacheById($id) {
        $key  = 'agent_id_' . $id;
        $data = SystemCache::get($key);
        if (!$data) {
            $data = Agent::where('id', $id)->first();
            SystemCache::forever($key, $data->toArray());
            SystemCache::forever('agent_name_' . $data->name, $data->toArray());
            return $data;
        }
        return new Agent($data);
    }

    public function getCacheByName($name) {
        $key  = 'agent_name_' . $name;
        $data = SystemCache::get($key);
        if (!$data) {
            $data = Agent::where('name', $name)->first();
            if (!$data) {
                return null;
            }
            SystemCache::forever($key, $data->toArray());
            SystemCache::forever('agent_id_' . $data->id, $data->toArray());
            return $data;
        }
        return new Agent($data);
    }

    public function formatRequestArgs($agent, $data) {
        $data['app_id'] = $agent->app_id;
        $data['sign']   = $this->getSign($agent, $data);
        return $data;
    }

    public function getSign($agent, $data) {
        ksort($data);
        reset($data);

        $sign = '';
        foreach ($data as $key => $val) {
            $val = trim($val);
            if ($val === '') {
                continue;
            }
            $sign .= $key . '=' . $val . '&';
        }
        $sign .= 'app_secret=' . $agent->app_secret;
        return md5($sign);
    }

    public function lists($data = []) {
        $this->listFormatBuilder[] = function(&$builder, &$data, &$attributes) {
            $id = isset($data['id']) ? (int)$data['id'] : 0;
            if ($id > 0) {
                $builder->where('id', $id);
            }

            $parent_id = isset($data['parent_id']) ? (int)$data['parent_id'] : 0;
            if ($parent_id > 0) {
                $builder->where('parent_id', $parent_id);
            }

            $type = isset($data['type']) ? (int)$data['type'] : 0;
            if ($type > 0) {
                $builder->where('type', $type);
            }

            $name = isset($data['name']) ? trim($data['name']) : '';
            if ($name) {
                $builder->where('name', $name);
            }

            $email = isset($data['email']) ? trim($data['email']) : '';
            if ($email) {
                $builder->where('email', $email);
            }

            $mobile = isset($data['mobile']) ? trim($data['mobile']) : '';
            if ($mobile) {
                $builder->where('mobile', $mobile);
            }

            $status = isset($data['status']) ? (int)$data['status'] : 0;
            if ($status > 0) {
                $builder->where('status', $status - 1);
            }
        };

        return parent::lists($data);
    }

    public function save($data, $type) {
        $this->saveExtend[] = function($primary_val, &$data, &$attributes) use ($type) {
            if ($type == 'create') {
                //创建锁
                AgentLock::create(['id' => $primary_val]);
            }
        };
        return parent::save($data, $type);
    }
}