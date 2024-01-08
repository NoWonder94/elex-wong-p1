<?php 
namespace App\Services;

use App\Models\Site\SystemConfig;
use DB, SiteCache;

class SystemConfigService extends BaseService { 
    use CacheService;

    public function getList() { 
        $list = SiteCache::get('site_system_config_info');
        if (!$list) {
            $this->setCache();
            return SiteCache::get('site_system_config_info');
        } 
        return $list;
    }

    public function setCache() {
        //如果已经重置缓存则跳过
        if (self::checkCacheStatus($this)) {
            return false;
        }

        $config = SystemConfig::get()->toArray();
        
        SiteCache::forever('site_system_config_info', $config);

        //设为已经重置缓存
        self::setCacheStatus($this);

        return false;
    }

    public function update($data) { 
        try {
            DB::connection()->beginTransaction();
            foreach ($data as $key => $value) { 
                if (in_array($key, ['pc_link', 'wap_link', 'month_deposit', 'month_bet', 'effective_num_min', 'withdraw_money_min'])) {
                    $config = SystemConfig::where('code', $key)->first();  
                    if (isset($config->id) && $config->id > 0) {
                        $config->val = $value;
                        $config->update_time = UTC_TIME;
                        $config->modify_admin = APP_CURRENT_ADMIN_NAME;
                        $config->save(); 
                    } else {
                        $config = new SystemConfig();
                        $config->code = $key;
                        $config->val = $value;
                        $config->update_time = UTC_TIME;
                        $config->modify_admin = APP_CURRENT_ADMIN_NAME;
                        $config->save(); 
                    }  
                }
            } 
            $this->resetCache();
            DB::connection()->commit();
        } catch(\Exception $e) {
            DB::connection()->rollback();
            throw $e;
        }
        return true;
    } 

    public function getByCode($code) {
        $list = $this->getList(); 
        foreach ($list as $value) {
            if($value['code'] == $code) {
                return $value;
            }
        }
    }
}