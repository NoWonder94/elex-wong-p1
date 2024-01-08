<?php
namespace App\Models\Agency\Auth;

use App\Models\Model;
use Illuminate\Support\Facades\DB;

class GroupPolicyModel extends Model
{

    const TABLENAME = 'hs_agency_auth_group_policy';

    /**
     * 查询所有正常数据
     *
     * @param int $groupId            
     * @return \Illuminate\Support\Collection
     */
    public static function selectByGroupId($groupId)
    {
        return self::dbTable('d')->select(DB::raw('p.id,p.name,p.desc'))
            ->join(PolicyModel::TABLENAME . ' as p', function ($join) {
                $join->on('p.id', '=', 'd.policy_id')
                    ->where('p.status', '=', PolicyModel::STATUS_ENABLE);
            })
            ->where('d.group_id', $groupId)
            ->orderBy('p.sort', 'asc')
            ->get();
    }

    /**
     * 保存数据（多条）
     *
     * @param int $groupId            
     * @param array $policyIds            
     * @return static
     */
    public static function saveByGroupId($groupId, array $policyIds = [])
    {
        $data = self::make($groupId, $policyIds);
        
        return DB::transaction(function () use ($groupId, $data) {
            // 删除关联的所有数据
            self::dbTable()->where('group_id', $groupId)->delete();
            // 保存关联的所有数据
            self::dbTable()->insert($data);
        });
    }

    private static function make($groupId, array $policyIds = [])
    {
        $policyIds = array_unique($policyIds);
        
        $data = [];
        foreach ($policyIds as $policyId) {
            $item['group_id'] = $groupId;
            $item['policy_id'] = $policyId;
            array_push($data, $item);
        }
        return $data;
    }
}
