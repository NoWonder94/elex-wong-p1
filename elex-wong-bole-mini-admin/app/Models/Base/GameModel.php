<?php
namespace App\Models\Base;

use App\Models\Model;

class GameModel extends Model
{

    const TABLENAME = 'hs_base_game';

    /**
     * 类型（对战棋牌）
     */
    const TYPE_DEFAULT = 1;

    /**
     * 类型（百人棋牌）
     */
    const TYPE_MULTI = 2;

    /**
     * 类型（老虎）
     */
    const TYPE_SLOT = 3;

    /**
     * 状态（正常）
     */
    const STATUS_ENABLE = 1;

    /**
     * 状态（禁用）
     */
    const STATUS_DISABLE = 2;

    /**
     * 游戏ID（四川麻将-血流成河）
     */
    const GAME_ID_MAHJONG = 10001;

    /**
     * 游戏ID（四川麻将-血战到底）
     */
    const GAME_ID_MOHJONG = 10002;

    /**
     * 游戏ID（博乐牛牛）
     */
    const GAME_ID_NIUNIU = 10003;
    
    /**
     * 游戏ID（博乐三公）
     */
    const GAME_ID_SANGONG = 10004;
    
    /**
     * 游戏ID（炸金花）
     */
    const GAME_ID_ZJH= 10005;
    
    /**
     * 游戏ID（大众麻将）
     */
    const GAME_ID_DZMJ= 10006;
    
    /**
     * 游戏ID（老虎机）
     */
    const GAME_ID_SLOT= 10007;
    
    /**
     * 游戏ID（红黑大战）
     */
    const GAME_ID_RBWAR = 10008;
    
    /**
     * 游戏ID（百家乐）
     */
    const GAME_ID_BACCARAT = 10010;
    
    public static function getGameIdList()
    {
        return [
            self::GAME_ID_MAHJONG,
            self::GAME_ID_MOHJONG,
            self::GAME_ID_NIUNIU,
            self::GAME_ID_SANGONG,
            self::GAME_ID_ZJH,
            self::GAME_ID_DZMJ,
            self::GAME_ID_SLOT,
            self::GAME_ID_RBWAR,
            self::GAME_ID_BACCARAT
        ];
    }

    public static function getStatusList()
    {
        return [
            self::STATUS_ENABLE,
            self::STATUS_DISABLE
        ];
    }

    public static function getTypeList()
    {
        return [
            self::TYPE_DEFAULT,
            self::TYPE_MULTI,
            self::TYPE_SLOT
        ];
    }

    /**
     * 查询一条数据
     *
     * @param int $id            
     * @param array $fields            
     * @return \Illuminate\Support\Collection
     */
    public static function findById($id, array $fields = [])
    {
        $query = self::dbTable();
        if (count($fields)) {
            $query->select($fields);
        }
        return $query->where('id', $id)->get();
    }

    /**
     * 查询所有数据
     *
     * @return \Illuminate\Support\Collection
     */
    public static function selectAll()
    {
        return self::dbTable()->get();
    }

    /**
     * 查询所有数据【类型】
     *
     * @param int $type            
     * @return \Illuminate\Support\Collection
     */
    public static function selectAllByType($type)
    {
        return self::dbTable()->where('type', $type)->get();
    }
}
