<?php 
namespace App\Application\Www\Services;

use App\Models\Site\Proxy;
use DB, Time;

class ProxyService extends EloquentService {
    public function lists($data = []) {
        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) {
            $name = isset($data['name']) ? trim($data['name']) : '';
            if (!empty($name)) {
                $builder->where('name', 'like', "%{$name}%");
            }

            $real_name = isset($data['real_name']) ? trim($data['real_name']) : '';
            if (!empty($real_name)) {
                $builder->where('real_name', 'like', "%{$real_name}%");
            }

            $gender = isset($data['gender']) ? trim($data['gender']) : 'all';
            if ($gender != 'all') {
                $builder->where('gender', $gender);
            }

            $reg_begin_time = isset($data['reg_begin_time']) ? Time::toTime(trim($data['reg_begin_time'])) : 0;
            if ($reg_begin_time > 0) {
                $builder->where('create_time', '>=', $reg_begin_time);
            }

            $reg_end_time = isset($data['reg_end_time']) ? Time::toTime(trim($data['reg_end_time'])) : 0;
            if ($reg_end_time > 0) {
                $builder->where('create_time', '<=', $reg_end_time);
            }

            $level = isset($data['level']) ? $data['level'] : 0;
            if ($level > 0) {
                $builder->where('level_id', $level);
            }  

            $status = isset($data['status']) ? $data['status'] : 0;
            if ($status > 0) {
                $builder->where('status', $status - 1);
            }

            $builder->with('proxyLevel');

        };
        return parent::lists($data);
    }
    
    public function get($key, $data = []) { 
        $this->getFormatBuilder = function(&$builder, &$key, &$data) { 
            return $builder->with('updateLevel')->where('id', $key)->first();
        };
        return parent::get($key, $data);
    }

    public function save($data, $type) {
        $that = $this;
        $this->saveFormatData = function(&$model, &$data, &$attributes) use ($type, $that) {
            if ($type == 'update') { 
                $proxy = Proxy::where('id', $attributes['id'])->select('id', 'level_id')->first();
                if ($proxy->level_id != $data['level_id']) {
                    $data['update_level_id'] = $data['level_id'];
                    $data['level_id'] = $proxy->level_id;
                    $data['update_level_time'] = UTC_TIME;
                    $data['update_level_modifier'] = APP_CURRENT_ADMIN_NAME;
                } 
                $data['update_admin'] = APP_CURRENT_ADMIN_NAME;
                $data['update_time'] = UTC_TIME;  
            } else {
                if (Proxy::where('name', $data['name'])->count() > 0) {
                    $that->throwException('common.site_user.name_exist');
                }

                $data['create_admin'] = APP_CURRENT_ADMIN_ID;
                $data['update_time'] = UTC_TIME;
            } 
        };
        return parent::save($data, $type);
    } 

    public function option($id, $status, $remark) {
        $proxy = Proxy::find($id);
        if($proxy->status < 0) {
            $this->throwException('common.proxy.proxy_tatus');
        }
        if (!in_array($status, [0, 1])) {
            $this->throwException('common.proxy.status_not_change');
        } else {
            $data['status'] = $status;
            $data['remark'] = $remark;
            return Proxy::where('id', $id)->update($data);
        }
    }
}