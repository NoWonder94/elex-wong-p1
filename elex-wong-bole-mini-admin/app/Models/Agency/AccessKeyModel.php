<?php
namespace App\Models\Agency;

use App\Models\Model;

class AccessKeyModel extends Model
{

    const TABLENAME = 'hs_agency_access_key';

    /**
     * AccessKeySecret 加盐 key
     */
    const ACCESS_KEY_SALT = 'huoshu.hudong';

    /**
     * 状态（正常）
     */
    const STATUS_ENABLE = 1;

    /**
     * 状态（禁用）
     */
    const STATUS_DISABLE = 2;

    public static function getStatusList()
    {
        return [
            self::STATUS_ENABLE,
            self::STATUS_DISABLE
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
     * 验证是否存在访问秘钥
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
     * @param int $orgId            
     * @param array $data            
     * @return false | 1 | 0
     */
    public static function update($orgId, array $data = [])
    {
        if (! $orgId) {
            return false;
        }
        $data['updated'] = time();
        
        return self::dbTable()->where('org_id', $orgId)->update($data);
    }

    /**
     * 删除一条数据（物理删除）
     *
     * @param int $orgId            
     * @return false | 1 | 0（删除条数，0未删除）
     */
    public static function destroy($orgId)
    {
        if (! $orgId) {
            return false;
        }
        return self::dbTable()->where('org_id', $orgId)->delete();
    }

    public static function updateTime($orgId) {
        if (! $orgId) {
            return false;
        }
        return self::dbTable()->where('org_id', $orgId)->update(['updated' => time()]);
    }
}
