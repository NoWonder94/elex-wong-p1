<?php
namespace App\Models\AppLog\Player;

use App\Models\AppLog\Model;

class BetDayModel extends Model
{

    const TABLENAME = 'hs_player_bet_day';

    /**
     * 排序（时间）升序
     */
    const ORDER_TIMED_ASC = 1;

    /**
     * 排序（时间）降序
     */
    const ORDER_TIMED_DESC = 2;

    public static function getOrderList()
    {
        return [
            self::ORDER_TIMED_ASC,
            self::ORDER_TIMED_DESC
        ];
    }
}
