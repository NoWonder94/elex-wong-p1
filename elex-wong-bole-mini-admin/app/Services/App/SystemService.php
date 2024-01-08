<?php
namespace App\Services\App;

use App\Models\App\SystemStateModel;

class SystemService
{

    /**
     * 获取代理屏蔽游戏
     *
     * @param int $orgId            
     * @return array
     */
    public function getShieldGame($orgId)
    {
        $systemState = SystemStateModel::findByType(SystemStateModel::TYPE_ORG_SHIELD_GAME)->shift();
        
        $data = empty($systemState) ? [] : json_decode($systemState['info'], true);
        
        return isset($data[$orgId]) ? $data[$orgId] : [];
    }
}