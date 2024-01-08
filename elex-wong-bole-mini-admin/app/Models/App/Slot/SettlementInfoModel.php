<?php
namespace App\Models\App\Slot;

use App\Models\App\Model;

class SettlementInfoModel extends Model
{

    const TABLENAME = 't_settlement_slot_info';

    /**
     * 免费游戏（时）
     */
    const SPIN_TYPE_YES = 1;

    /**
     * 免费游戏（否）
     */
    const SPIN_TYPE_NO = 0;

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

    public static function getSpinTypeList()
    {
        return [
            self::SPIN_TYPE_YES,
            self::SPIN_TYPE_NO
        ];
    }
}
