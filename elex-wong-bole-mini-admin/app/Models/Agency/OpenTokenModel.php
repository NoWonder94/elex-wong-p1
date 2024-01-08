<?php
namespace App\Models\Agency;

use App\Models\Model;

class OpenTokenModel extends Model
{

    const TABLENAME = 'hs_agency_open_token';

    /**
     * 查询一条数据
     *
     * @param string $token            
     * @param array $fields            
     * @return \Illuminate\Support\Collection
     */
    public static function findByToken($token, array $fields = [])
    {
        $query = self::dbTable();
        if (count($fields)) {
            $query->select($fields);
        }
        return $query->where('token', $token)->get();
    }

    /**
     * 获取代理ID，并验证 Token 有效性
     *
     * @param string $token            
     * @return false | orgId
     */
    public static function getOrgIdAndVerifyToken($token)
    {
        $data = self::findByToken($token)->shift();
        if (! $data) {
            return false;
        } elseif ($data['valided'] < time()) {
            return false;
        }
        return $data['org_id'];
    }
}
