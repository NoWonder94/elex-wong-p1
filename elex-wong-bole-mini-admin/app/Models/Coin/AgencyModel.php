<?php
namespace App\Models\Coin;

use App\Models\Model;
use Illuminate\Support\Facades\DB;

class AgencyModel extends Model
{

    const TABLENAME = 'hs_coin_agency';

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
     * 金币充值（子级）
     *
     * @param int $orgId            
     * @param double $amount            
     * @return number
     */
    public static function coinIn($orgId, $amount)
    {
        return self::dbTable()->where('org_id', $orgId)->update([
            'total_in' => DB::raw("total_in + $amount"),
            'current' => DB::raw("current + $amount"),
            'updated' => time()
        ]);
    }

    /**
     * 金币提现（子级）
     *
     * @param int $orgId            
     * @param double $amount            
     * @return number
     */
    public static function coinOut($orgId, $amount)
    {
        return self::dbTable()->where('org_id', $orgId)
            ->where('current', '>=', $amount)
            ->update([
            'total_out' => DB::raw("total_out + $amount"),
            'current' => DB::raw("current - $amount"),
            'updated' => time()
        ]);
    }

    /**
     * 金币发放代理（父级）
     *
     * @param int $orgId            
     * @param double $amount            
     * @return number
     */
    public static function coinInAgency($orgId, $amount)
    {
        return self::dbTable()->where('org_id', $orgId)
            ->where('current', '>=', $amount)
            ->update([
            'agency' => DB::raw("agency + $amount"),
            'current' => DB::raw("current - $amount"),
            'updated' => time()
        ]);
    }

    /**
     * 金币代理提现（父级）
     *
     * @param int $orgId            
     * @param double $amount            
     * @return number
     */
    public static function coinOutAgency($orgId, $amount)
    {
        return self::dbTable()->where('org_id', $orgId)
            ->where('agency', '>=', $amount)
            ->update([
            'agency' => DB::raw("agency - $amount"),
            'current' => DB::raw("current + $amount"),
            'updated' => time()
        ]);
    }
}
