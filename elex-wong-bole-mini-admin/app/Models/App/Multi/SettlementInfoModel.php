<?php
namespace App\Models\App\Multi;

use App\Models\App\Model;

class SettlementInfoModel extends Model
{

    const TABLENAME = 't_settlement_multi_info';

    /**
     * 状态（正常）
     */
    const STATUS_DEFAULT = 1;

    /**
     * 状态（挂起）
     */
    const STATUS_EXCEPTION = 2;
    
    /**
     * 状态（踢出）
     */
    const STATUS_KICKOUT = 3;
    
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
            self::STATUS_EXCEPTION,
            self::STATUS_KICKOUT
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
}
