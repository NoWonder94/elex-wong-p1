<?php
namespace App\Models\App;

class SystemStateModel extends Model
{

    const TABLENAME = 't_system_state';

    /**
     * 配置类型（GMToken）游戏服务token
     */
    const TYPE_GM_TOKEN = 1;

    /**
     * 配置类型（systemSwitch）游戏总开关
     */
    const TYPE_SYSTEM_SWITCH = 2;

    /**
     * 配置类型（gameSwitch）分游戏开关
     */
    const TYPE_GAME_SWITCH = 3;

    /**
     * 配置类型（broadcast）游戏公告
     */
    const TYPE_BROADCAST = 4;

    /**
     * 配置类型（region_limit）区域限制
     */
    const TYPE_REGION_LIMIT = 5;

    /**
     * 配置类型（gm_info）GM信息
     */
    const TYPE_GM_INFO = 6;

    /**
     * 配置类型（hall_game_list）大厅游戏列表
     */
    const TYPE_HALL_GAME_LIST = 7;

    /**
     * 配置类型（org_shield_game）代理屏蔽游戏
     */
    const TYPE_ORG_SHIELD_GAME = 8;

    /**
     * 查询一条数据
     *
     * @param int $type            
     * @param array $fields            
     * @return \Illuminate\Support\Collection
     */
    public static function findByType($type, array $fields = [])
    {
        $query = self::dbTable();
        if (count($fields)) {
            $query->select($fields);
        }
        return $query->where('type', $type)->get();
    }
}
