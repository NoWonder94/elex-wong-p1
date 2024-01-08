<?php
namespace App\Models\Base;

use App\Models\Model;

class UserModel extends Model
{

    const TABLENAME = 'hs_base_user';

    /**
     * 状态（正常）
     */
    const STATUS_ENABLE = 1;

    /**
     * 状态（禁用）
     */
    const STATUS_DISABLE = 2;

    /**
     * 排序（ID）升序
     */
    const ORDER_ID_ASC = 1;

    /**
     * 排序（ID）降序
     */
    const ORDER_ID_DESC = 2;

    /**
     * 排序（更新时间）升序
     */
    const ORDER_UPDATED_ASC = 3;

    /**
     * 排序（更新时间）降序
     */
    const ORDER_UPDATED_DESC = 4;

    public static function getStatusList()
    {
        return [
            self::STATUS_ENABLE,
            self::STATUS_DISABLE
        ];
    }

    public static function getOrderList()
    {
        return [
            self::ORDER_ID_ASC,
            self::ORDER_ID_DESC,
            self::ORDER_UPDATED_ASC,
            self::ORDER_UPDATED_DESC
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
     * 查询一条数据（邮箱）
     *
     * @param string $email            
     * @param array $fields            
     * @return \Illuminate\Support\Collection
     */
    public static function findByEmail($email, array $fields = [])
    {
        $query = self::dbTable();
        if (count($fields)) {
            $query->select($fields);
        }
        return $query->where('email', $email)->get();
    }

    /**
     * 创建一条数据
     *
     * @param array $data            
     * @return false | id
     */
    public static function create(array $data = [])
    {
        $data['status'] = self::STATUS_ENABLE;
        $data['created'] = $data['updated'] = time();
        
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
     * 更新用户登录时间
     *
     * @param int $id
     * @return false | 1 | 0
     */
    public static function updateSigninTime($id, $time)
    {
        if (! $id || ! ($user = self::findById($id)->shift())) {
            return false;
        }
        
        $data['login_last'] = $time;
        
        if (! $user['login_first']) {
            $data['login_first'] = $data['login_last'];
        }
        
        return self::dbTable()->where('id', $id)->update($data);
    }
}
