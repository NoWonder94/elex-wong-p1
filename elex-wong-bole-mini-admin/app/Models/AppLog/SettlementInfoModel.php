<?php
namespace App\Models\AppLog;

use Illuminate\Support\Facades\DB;

class SettlementInfoModel extends Model
{

    const TABLENAME = 't_settlement_info';

    /**
     * 状态（正常）
     */
    const STATUS_DEFAULT = 1;

    /**
     * 状态（异常）
     */
    const STATUS_EXCEPTION = 2;

    /**
     * 用户类型（玩家）
     */
    const USER_TYPE_PLAYER = 1;

    /**
     * 用户类型（机器人）
     */
    const USER_TYPE_REBOT = 2;

    /**
     * 排序（ID）升序
     */
    const ORDER_ID_ASC = 1;

    /**
     * 排序（ID）降序
     */
    const ORDER_ID_DESC = 2;

    /**
     * 搜索（玩家账号）
     */
    const KEYWORD_TYPE_ACCOUNT = 1;

    /**
     * 搜索（房间ID）
     */
    const KEYWORD_TYPE_ROOM = 2;

    public static function getStatusList()
    {
        return [
            self::STATUS_DEFAULT,
            self::STATUS_EXCEPTION
        ];
    }

    public static function getKeywordTypeList()
    {
        return [
            self::KEYWORD_TYPE_ACCOUNT,
            self::KEYWORD_TYPE_ROOM
        ];
    }

    public static function getOrderList()
    {
        return [
            self::ORDER_ID_ASC,
            self::ORDER_ID_DESC
        ];
    }

    public static function getUserTypeList()
    {
        return [
            self::USER_TYPE_PLAYER,
            self::USER_TYPE_REBOT
        ];
    }

    /**
     * 根据时间戳制作表名
     *
     * @param int $timed            
     * @return string
     */
    public static function makeTableName($timed)
    {
        return static::TABLENAME . '_' . date('Ymd', $timed);
    }

    /**
     * 初始化并返回数据库请求构建器【重构】（根据时间戳自动切换表名）
     *
     * @param int $timed            
     * @param string $alias            
     * @return \Illuminate\Support\Facades\DB::table(TABLENAME)
     */
    public static function dbTableByTimed($timed, $alias = null)
    {
        $table = self::makeTableName($timed);
        
        return empty($alias) ? self::dbConnection()->table($table) : self::dbConnection()->table($table . ' as ' . $alias);
    }
    
    /**
     * 验证某天数据分表备份是否已完成
     *
     * @param int $timed
     * @return boolean
     */
    public static function verifyBackFinish($timed)
    {
        $table = self::makeTableName($timed);
        
        return self::schemaConnection()->hasTable($table);
    }
}
