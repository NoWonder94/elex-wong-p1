<?php
namespace App\Models\Play\StatsMonth;

use App\Models\Model;

class AgencyModel extends Model
{

    const TABLENAME = 'hs_play_stats_month_agency';

    /**
     * 排序（月份）升序
     */
    const ORDER_TIMED_ASC = 1;

    /**
     * 排序（月份）降序
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
