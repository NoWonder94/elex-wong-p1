<?php
namespace App\Models\App;

class UserModel extends Model
{

    const TABLENAME = 't_user';
    
    /**
     * 用户类型（普通）
     */
    const ROLE_PLAYER = 1;
    
    /**
     * 用户类型（测试）
     */
    const ROLE_TEST = 2;
    
    /**
     * 用户状态（正常）
     */
    const ACCESS_NORMAL = 1;
    
    /**
     * 用户状态（锁定）
     */
    const ACCESS_LOCK = 2;
    
    /**
     * 排序（ID）升序
     */
    const ORDER_ID_ASC = 1;

    /**
     * 排序（ID）降序
     */
    const ORDER_ID_DESC = 2;

    /**
     * 排序（登录时间）升序
     */
    const ORDER_SIGNIN_ASC = 3;

    /**
     * 排序（登录时间）降序
     */
    const ORDER_SIGNIN_DESC = 4;

    /**
     * 排序（玩家盈亏）升序
     */
    const ORDER_INCOME_ASC = 5;

    /**
     * 排序（玩家盈亏）升序
     */
    const ORDER_INCOME_DESC = 6;
    
    public static function getRoleList()
    {
        return [
            self::ROLE_PLAYER,
            self::ROLE_TEST
        ];
    }
    
    public static function getAccessList()
    {
        return [
            self::ACCESS_NORMAL,
            self::ACCESS_LOCK
        ];
    }
    
    public static function getOrderList()
    {
        return [
            self::ORDER_ID_ASC,
            self::ORDER_ID_DESC,
            self::ORDER_SIGNIN_ASC,
            self::ORDER_SIGNIN_DESC,
            self::ORDER_INCOME_ASC,
            self::ORDER_INCOME_DESC
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
     * 查询一条数据（运营商平台玩家ID）
     *
     * @param string $accountId            
     * @param array $fields            
     * @return \Illuminate\Support\Collection
     */
    public static function findByAccountId($accountId, array $fields = [])
    {
        $query = self::dbTable();
        if (count($fields)) {
            $query->select($fields);
        }
        return $query->where('account_id', $accountId)->get();
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
}
