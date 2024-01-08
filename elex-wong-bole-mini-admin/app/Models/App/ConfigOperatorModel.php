<?php
namespace App\Models\App;

class ConfigOperatorModel extends Model
{

    const TABLENAME = 't_config_operator';

    /**
     * 场景类型（平民场）
     */
    const SCENE_ID_FIRST = 1001;

    /**
     * 场景类型（小资场）
     */
    const SCENE_ID_SECOND = 1002;

    /**
     * 场景类型（白领场）
     */
    const SCENE_ID_THIRD = 1003;

    /**
     * 场景类型（富豪场）
     */
    const SCENE_ID_FOURTH = 1004;

    /**
     * 限制类型（不限制）
     */
    const LIMIT_TYPE_NO = 1;

    /**
     * 限制类型（自定义）
     */
    const LIMIT_TYPE_CUSTOM = 2;

    /**
     * 结算方式（结算抽水百分比）
     */
    const PUMP_END = 'end';

    /**
     * 结算方式（实时抽水百分比）
     */
    const PUMP_PERCENT = 'percent';

    /**
     * 结算方式（固定金额入场费）
     */
    const PUMP_FIXED = 'fixed';

    /**
     * 开关（关闭）
     */
    const SWITCH_OFF = 0;

    /**
     * 开关（开启）
     */
    const SWITCH_ON = 1;

    public static function getSwitchList()
    {
        return [
            self::SWITCH_OFF,
            self::SWITCH_ON
        ];
    }

    public static function getPumpList()
    {
        return [
            self::PUMP_END,
            self::PUMP_PERCENT,
            self::PUMP_FIXED
        ];
    }

    public static function getLimitTypeList()
    {
        return [
            self::LIMIT_TYPE_NO,
            self::LIMIT_TYPE_CUSTOM
        ];
    }

    public static function getSceneIdList()
    {
        return [
            self::SCENE_ID_FIRST,
            self::SCENE_ID_SECOND,
            self::SCENE_ID_THIRD,
            self::SCENE_ID_FOURTH
        ];
    }

    /**
     * 查询一条数据（代理ID）
     *
     * @param int $operatorId            
     * @param int $gameId            
     * @param array $fields            
     * @return \Illuminate\Support\Collection
     */
    public static function findByOperatorGame($operatorId, $gameId, array $fields = [])
    {
        $query = self::dbTable();
        if (count($fields)) {
            $query->select($fields);
        }
        return $query->where('operator_id', $operatorId)
            ->where('game_id', $gameId)
            ->get();
    }

    /**
     * 创建一条数据
     *
     * @param array $data            
     * @return false | id
     */
    public static function create(array $data = [])
    {
        $data['create_time'] = $data['update_time'] = time();
        
        return self::dbTable()->insertGetId($data);
    }

    /**
     * 更新一条数据
     *
     * @param int $operatorId            
     * @param int $gameId            
     * @param array $data            
     * @return false | 1 | 0
     */
    public static function updateByOperatorGame($operatorId, $gameId, array $data = [])
    {
        if (! $operatorId || ! $gameId) {
            return false;
        }
        $data['update_time'] = time();
        
        return self::dbTable()->where('operator_id', $operatorId)
            ->where('game_id', $gameId)
            ->update($data);
    }
}
