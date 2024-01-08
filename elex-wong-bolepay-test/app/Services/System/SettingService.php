<?php 
namespace App\Services\System;

use App\Models\System\Setting;
use SystemCache, Exception, DB;

class SettingService extends \App\Services\BaseEloquentCacheService {
    public function get($key, $data = []) {
        $list = $this->getSystemCacheByCode('setting');
        if (isset($list[$key])) {
            return $list[$key];
        }
        return null;
    }

    public function lists($data = []) {
        return $this->getSystemCacheByCode('setting');
    }

    public function save($data, $type) {
        $this->formatIps($data, 0);

        $connection = DB::connection();
        //开启事务
        $connection->beginTransaction();
        try{
            foreach($data as $key => $val) {
                Setting::where('code', $key)->update(['val' => $val]);
            }
            $connection->commit();
            $this->setCache();
            return true;
        }catch(Exception $e){
            $connection->rollback();
            throw $e;
        }
    }

    public function setCache() {
        $setting = [];
        $list = Setting::get();
        foreach ($list as $item) {
            $setting[$item->code] = $item->val;
        }
        SystemCache::forever('setting', $setting);
        return false;
    }
}