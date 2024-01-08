<?php
namespace App\Models\Coin;

use App\Models\Model;

class AgencyRecordModel extends Model
{

    const TABLENAME = 'hs_coin_agency_record';

    /**
     * 类型（充值）
     */
    const TYPE_IN = 1;

    /**
     * 类型（提现）
     */
    const TYPE_OUT = 2;

    /**
     * 类型（发放代理）
     */
    const TYPE_AGENCY_OUT = 3;

    /**
     * 类型（代理提现）
     */
    const TYPE_AGENCY_IN = 4;

    /**
     * 类型（游戏充值）
     */
    const TYPE_GAME_OUT = 5;

    /**
     * 类型（游戏提现）
     */
    const TYPE_GAME_IN = 6;

    /**
     * 订单分类（代理）
     */
    const ORDER_CLASSIFY_AGENCY = 1;

    /**
     * 订单分类（游戏）
     */
    const ORDER_CLASSIFY_GAME = 2;
    
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
    
    public static function getOrderClassifyList()
    {
        return [
            self::ORDER_CLASSIFY_AGENCY,
            self::ORDER_CLASSIFY_GAME
        ];
    }
    
    public static function getTypeList()
    {
        return [
            self::TYPE_IN,
            self::TYPE_OUT,
            self::TYPE_AGENCY_OUT,
            self::TYPE_AGENCY_IN,
            self::TYPE_GAME_OUT,
            self::TYPE_GAME_IN
        ];
    }

    /**
     * 查询一条数据
     *
     * @param int $orgId            
     * @param array $fields            
     * @return \Illuminate\Support\Collection
     */
    public static function findByOrgId($orgId, array $fields = [])
    {
        $query = self::dbTable();
        if (count($fields)) {
            $query->select($fields);
        }
        return $query->where('org_id', $orgId)->get();
    }

    /**
     * 创建一条数据
     *
     * @param array $data            
     * @return false | id
     */
    public static function create(array $data = [])
    {
        $data['created'] = time();
        
        return self::dbTable()->insertGetId($data);
    }
}
