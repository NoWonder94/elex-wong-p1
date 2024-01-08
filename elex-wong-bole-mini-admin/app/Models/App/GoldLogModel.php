<?php
namespace App\Models\App;

class GoldLogModel extends Model
{

    const TABLENAME = 't_gold_log';

    /**
     * 排序（ID）升序
     */
    const ORDER_ID_ASC = 1;

    /**
     * 排序（ID）降序
     */
    const ORDER_ID_DESC = 2;

    public static function getOrderList()
    {
        return [
            self::ORDER_ID_ASC,
            self::ORDER_ID_DESC
        ];
    }
}
