<?php
namespace App\Models\Agency;

use App\Models\Model;

class MemberModel extends Model
{

    const TABLENAME = 'hs_agency_member';

    /**
     * 类型（管理员）
     */
    const TYPE_DEFAULT = 1;

    /**
     * 类型（超级管理员）
     */
    const TYPE_ADMIN = 2;

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

    public static function getTypeList()
    {
        return [
            self::TYPE_DEFAULT,
            self::TYPE_ADMIN
        ];
    }

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
     * 查询一条数据（用户ID）
     *
     * @param int $userId            
     * @param array $fields            
     * @return \Illuminate\Support\Collection
     */
    public static function findByUserId($userId, array $fields = [])
    {
        $query = self::dbTable();
        if (count($fields)) {
            $query->select($fields);
        }
        return $query->where('user_id', $userId)->get();
    }

    /**
     * 查询多条数据（组织ID）
     *
     * @param int $orgId            
     * @param array $fields            
     * @return \Illuminate\Support\Collection
     */
    public static function selectByOrgId($orgId, array $fields = [])
    {
        $query = self::dbTable();
        if (count($fields)) {
            $query->select($fields);
        }
        return $query->where('org_id', $orgId)->get();
    }

    /**
     * 验证是否存在管理员
     *
     * @param int $orgId            
     * @return boolean
     */
    public static function verifyExistByOrgId($orgId)
    {
        return self::dbTable()->select('id')
            ->where('org_id', $orgId)
            ->take(1)
            ->get()
            ->isNotEmpty();
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
     * 更新多条数据
     *
     * @param int $orgId            
     * @param array $data            
     * @return false | 1 | 0
     */
    public static function updateByOrgId($orgId, array $data = [])
    {
        if (! $orgId) {
            return false;
        }
        $data['updated'] = time();
        
        return self::dbTable()->where('org_id', $orgId)->update($data);
    }
}
