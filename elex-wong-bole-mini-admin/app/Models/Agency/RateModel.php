<?php
namespace App\Models\Agency;

use App\Models\Model;

class RateModel extends Model
{

    const TABLENAME = 'hs_agency_rate';

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
     * @param int $orgId            
     * @param array $data            
     * @return false | id
     */
    public static function createByOrgId($orgId, array $data = [])
    {
        $data['org_id'] = $orgId;
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
    public static function updateByOrgId($orgId, array $data = [])
    {
        if (! $orgId) {
            return false;
        }
        $data['updated'] = time();
        
        return self::dbTable()->where('org_id', $orgId)->update($data);
    }
}
