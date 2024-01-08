<?php
namespace App\Models\Coin\Order;

use App\Models\Model;

class AgencyModel extends Model
{

    const TABLENAME = 'hs_coin_order_agency';

    /**
     * 来源（下级发起）
     */
    const SOURCE_SUB = 1;

    /**
     * 来源（上级发起）
     */
    const SOURCE_SUP = 2;

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
     * 状态（取消）
     */
    const STATUS_CANCEL = 4;

    /**
     * 排序（ID）升序
     */
    const ORDER_ID_ASC = 1;

    /**
     * 排序（ID）降序
     */
    const ORDER_ID_DESC = 2;

    public static function getSourceList()
    {
        return [
            self::SOURCE_SUP,
            self::SOURCE_SUB
        ];
    }

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
            self::STATUS_ERROR,
            self::STATUS_CANCEL
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
     * 创建一条数据
     *
     * @param int $orgId            
     * @param array $data            
     * @return false | id
     */
    public static function create(array $data = [])
    {
        $data['status'] = self::STATUS_START;
        $data['created'] = time();
        
        return self::dbTable()->insertGetId($data);
    }

    /**
     * 更新一条数据
     *
     * @param int $id            
     * @param array $data            
     * @return false | 1 | 0
     */
    public static function update($id, array $data = [])
    {
        if (! $id) {
            return false;
        }
        $data['updated'] = time();
        
        return self::dbTable()->where('id', $id)->update($data);
    }

    /**
     * 获取唯一单号
     *
     * @return false | string
     */
    public static function getUniqueNumber($orgId)
    {
        $agencyAuxModel = new AgencyAuxModel();
        if (! ($number = $agencyAuxModel->getNumber($orgId))) {
            return false;
        }
        return sprintf('AO%s%s%04s', $orgId, date('Ym'), $number);
    }
}
