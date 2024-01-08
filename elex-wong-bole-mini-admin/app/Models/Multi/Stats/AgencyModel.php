<?php
namespace App\Models\Multi\Stats;

use App\Models\Model;

class AgencyModel extends Model
{

    const TABLENAME = 'hs_multi_stats_agency';

    /**
     * 排序（天数）升序
     */
    const ORDER_TIMED_ASC = 1;

    /**
     * 排序（天数）降序
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
