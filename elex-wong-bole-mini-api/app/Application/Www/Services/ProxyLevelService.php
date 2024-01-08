<?php 
namespace App\Application\Www\Services;


use App\Models\Site\ProxyLevel;
class ProxyLevelService extends EloquentService {

    public function lists($data = []) {
        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) { 
            $builder->orderBy('sort', 'asc');
        };
        return parent::lists($data);
    }


    public function save($data, $type) {
        $this->saveFormatData = function(&$model, &$data, &$attributes) use ($type) { 
            if ( empty($data['name'])) { 
                $this->throwException('common.proxy_level.name_required', 'name');
            }

            if ( empty($data['commission_rate'])) { 
                $this->throwException('common.proxy_level.commission_rate_required', 'commission_rate');
            }

            if ($data['commission_rate'] <= 0 || $data['commission_rate'] >= 1) {
                $this->throwException('common.proxy_level.commission_rate_error', 'commission_rate');
            }

            if ( empty($data['profit'])) { 
                $this->throwException('common.proxy_level.profit_required', 'profit');
            }

            if (strpos($data['profit'], '~') !== false) {
                $profits = explode('~', $data['profit']); 
                $minLimit = isset($profits[0]) ? $profits[0] : 0;
                $maxLimit = isset($profits[1]) ? $profits[1] : 0;
                if ($maxLimit <= 0 || $maxLimit < $minLimit) {
                    $this->throwException('common.proxy_level.profit_error', 'profit');
                }
            } else {
                if ($data['profit'] <= 0) {
                    $this->throwException('common.proxy_level.profit_error', 'profit');
                }
            }

            if ( empty($data['effective_user'])) { 
                $this->throwException('common.proxy_level.effective_user_required', 'effective_user');
            }

            if (strpos($data['effective_user'], '~') !== false) {
                $effectiveUsers = explode('~', $data['effective_user']); 
                $minUserLimit = isset($effectiveUsers[0]) ? $effectiveUsers[0] : 0;
                $maxUserLimit = isset($effectiveUsers[1]) ? $effectiveUsers[1] : 0;
                if ($maxUserLimit <= 0 || $maxUserLimit < $minUserLimit) {
                    $this->throwException('common.proxy_level.effective_user_error', 'effective_user');
                }
            } else {
                if ($data['effective_user'] <= 0) {
                    $this->throwException('common.proxy_level.effective_user_error', 'effective_user');
                }
            }

            if ($type != 'update') {  
                if ( !empty($data['name'])) {
                    $level = ProxyLevel::where('name', $data['name'])->first(); 
                    if(isset($level->id)) {
                        $this->throwException('common.proxy_level.name_exists', 'name');
                    }
                }  
 
                $data['create_time'] = UTC_TIME;
            }
        };
        return parent::save($data, $type);
    }


    /**
     * 更新代理等级
     */
    public function updateLevel($proxy, $proxyLevels) {
        $curentLevel = $proxy->proxyLevel;

        $indexProxyLevel = [];

        foreach ($proxyLevels as $key => $level) {
            $indexProxyLevel[$level->id] = $key;
        }

        if ($indexProxyLevel[$curentLevel->id] === 0 && $proxy->profits <= 0 && $proxy->effective_user <= 3) {
            return false;
        } 

        $profitLevelIndex = self::getTheMinLevel((float)$proxy->profit, 'profit', $proxyLevels);

        $effectiveUserLevelIndex = self::getTheMinLevel((int)$proxy->effective_user, 'effective_user', $proxyLevels);

        if ($profitLevelIndex == -1 || $effectiveUserLevelIndex == -1) {
            file_put_contents(storage_path().'/logs/proxy_lever_service_update_level.log', print_r($proxy, 1) . '----' . print_r($proxyLevels, 1), FILE_APPEND);
            return false;
        } 

        if ($profitLevelIndex < $effectiveUserLevelIndex) {
            $minLevel = $proxyLevels[$profitLevelIndex];
        } else {
            $minLevel = $proxyLevels[$effectiveUserLevelIndex];
        }

        if ($minLevel->id != $curentLevel->id) {
            $proxy->update_level_id = $minLevel->id;
            $proxy->update_level_time = UTC_TIME;
            $proxy->update_level_modifier = 'system';
            $proxy->save();
        } 

    }

    /**
     * 
     */
    protected function getTheMinLevel($args, $param, $proxyLevels) { 
        foreach ($proxyLevels as $index => $level) {  
            if (strpos($level->$param, '~') !== false) {
                $params = explode('~', $level->$param);
                $minLimit = isset($params[0]) ? $params[0] : 0;
                $maxLimit = isset($params[1]) ? $params[1] : 0;
                if ($args >= $minLimit && $args <= $maxLimit) { 
                    return $index;
                } else {
                    continue;
                }
            } else {
                $minLimit = $level->$param;
                if ($args >= $minLimit) {
                    return $index;
                } else {
                    continue;
                }
            }
        }
        return -1;

    }

}