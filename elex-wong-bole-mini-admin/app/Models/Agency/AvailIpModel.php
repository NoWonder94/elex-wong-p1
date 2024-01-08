<?php
namespace App\Models\Agency;

use App\Models\Model;
use Illuminate\Support\Facades\DB;

class AvailIpModel extends Model
{

    const TABLENAME = 'hs_agency_avail_ip';

    /**
     * 状态（未添加）
     */
    const STATUS_NO = 1;

    /**
     * 状态（已添加）
     */
    const STATUS_YES = 2;

    /**
     * 排序（ID）升序
     */
    const ORDER_ID_ASC = 1;

    /**
     * 排序（ID）降序
     */
    const ORDER_ID_DESC = 2;

    /**
     * 排序（创建时间）升序
     */
    const ORDER_CREATED_ASC = 3;

    /**
     * 排序（创建时间）降序
     */
    const ORDER_CREATED_DESC = 4;

    public static function getStatusList()
    {
        return [
            self::STATUS_NO,
            self::STATUS_YES
        ];
    }

    public static function getOrderList()
    {
        return [
            self::ORDER_ID_ASC,
            self::ORDER_ID_DESC,
            self::ORDER_CREATED_ASC,
            self::ORDER_CREATED_DESC
        ];
    }

    /**
     * 查询多数据
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
     * 保存数据（多条）
     *
     * @param int $orgId            
     * @param array $ips            
     * @return static
     */
    public static function saveByOrgId($orgId, array $ips = [])
    {
        $data = self::make($orgId, $ips);
        
        return DB::transaction(function () use ($orgId, $data) {
            // 删除关联的所有数据
            self::dbTable()->where('org_id', $orgId)->delete();
            // 保存关联的所有数据
            self::dbTable()->insert($data);

            AccessKeyModel::updateTime($orgId);
        });
    }

    private static function make($orgId, array $ips = [])
    {
        $ips = array_unique($ips);
        
        $data = [];
        $item['status'] = self::STATUS_NO;
        $item['created'] = $item['updated'] = time();
        $item['org_id'] = $orgId;
        foreach ($ips as $ip) {
            if (! empty($ip)) {
                $item['ip'] = $ip;
                array_push($data, $item);
            }
        }
        return $data;
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
     * 删除多数据（物理删除）
     *
     * @param int $id            
     * @return false | n | 0（删除条数，0未删除）
     */
    public static function destroy($id)
    {
        if (! $id) {
            return false;
        }
        return self::dbTable()->where('id', $id)->delete();
    }
}
