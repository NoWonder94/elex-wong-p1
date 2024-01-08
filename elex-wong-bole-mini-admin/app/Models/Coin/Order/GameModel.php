<?php
namespace App\Models\Coin\Order;

use App\Models\Model;

class GameModel extends Model
{

    const TABLENAME = 'hs_coin_order_game';

    /**
     * 类型（充值）
     */
    const TYPE_IN = 1;

    /**
     * 类型（提现）
     */
    const TYPE_OUT = 2;

    /**
     * 状态（开始）
     */
    const STATUS_START = 1;

    /**
     * 状态（成功）
     */
    const STATUS_SUCCES = 2;

    /**
     * 状态（失败）
     */
    const STATUS_ERROR = 3;

    /**
     * 排序（ID）升序
     */
    const ORDER_ID_ASC = 1;

    /**
     * 排序（ID）降序
     */
    const ORDER_ID_DESC = 2;

    public static function getTypeList()
    {
        return [
            self::TYPE_IN,
            self::TYPE_OUT
        ];
    }

    public static function getStatusList()
    {
        return [
            self::STATUS_START,
            self::STATUS_SUCCES,
            self::STATUS_ERROR
        ];
    }

    public static function getOrderList()
    {
        return [
            self::ORDER_ID_ASC,
            self::ORDER_ID_DESC
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
     * 查询一条数据（代理平台订单号）
     *
     * @param int $orgOrderId            
     * @param array $fields            
     * @return \Illuminate\Support\Collection
     */
    public static function findByOrgOrderId($orgOrderId, array $fields = [])
    {
        $query = self::dbTable();
        if (count($fields)) {
            $query->select($fields);
        }
        return $query->where('org_order_id', $orgOrderId)->get();
    }
}
