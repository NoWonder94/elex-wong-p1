<?php
namespace App\Models\Agency\Auth;

use Illuminate\Support\Facades\DB;
use App\Models\Model;
use App\Models\Agency\MemberModel;

class GroupMemberModel extends Model
{

    const TABLENAME = 'hs_agency_auth_group_member';

    /**
     * 查询所有正常数据
     *
     * @param int $groupId            
     * @return \Illuminate\Support\Collection
     */
    public static function selectByGroupId($groupId)
    {
        return self::dbTable('d')->select(DB::raw('m.id,m.name'))
            ->join(MemberModel::TABLENAME . ' as m', 'm.id', '=', 'd.member_id')
            ->where('group_id', $groupId)
            ->get();
    }

    /**
     * 保存数据（多条）
     *
     * @param int $groupId            
     * @param array $memberIds            
     * @return static
     */
    public static function saveByGroupId($groupId, array $memberIds = [])
    {
        $data = self::make($groupId, $memberIds);
        
        return DB::transaction(function () use ($groupId, $data) {
            // 删除关联的所有数据
            self::dbTable()->where('group_id', $groupId)->delete();
            // 保存关联的所有数据
            self::dbTable()->insert($data);
        });
    }

    private static function make($groupId, array $memberIds = [])
    {
        $memberIds = array_unique($memberIds);
        
        $data = [];
        foreach ($memberIds as $memberId) {
            $item['group_id'] = $groupId;
            $item['member_id'] = $memberId;
            array_push($data, $item);
        }
        return $data;
    }
}
