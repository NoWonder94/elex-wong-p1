<?php
namespace App\Models\Log\Member;

use App\Models\Model;
use App\Models\Agency\MemberModel;
use App\Models\Base\UserModel;

class SigninModel extends Model
{

    const TABLENAME = 'hs_log_member_signin';
    
    /**
     * 排序（ID）升序
     */
    const ORDER_ID_ASC = 1;
    
    /**
     * 排序（ID）降序
     */
    const ORDER_ID_DESC = 2;
    
    /**
     * 用户类型（管理员）
     */
    const TYPE_ADMIN = 1;
    
    /**
     * 用户类型（超级管理员）
     */
    const TYPE_SUPER_ADMIN = 2;
    
    public static function getTypeList()
    {
        return [
            self::TYPE_ADMIN,
            self::TYPE_SUPER_ADMIN
        ];
    }
    
    public static function getOrderList()
    {
        return [
            self::ORDER_ID_ASC,
            self::ORDER_ID_DESC
        ];
    }
    
    /**
     * 创建一条数据
     *
     * @param int $memberId            
     * @param string $ip            
     * @return false | 1 | 0
     */
    public static function createByMemberId($memberId, $ip)
    {
        if (! $memberId || ! ($member = MemberModel::findById($memberId)->shift())) {
            return false;
        }
        
        $user = UserModel::findById($member['user_id'])->shift();

        $data['user_id'] = $user['id'];
        $data['email'] = $user['email'];
        $data['ip'] = $ip;
        
        $data['org_id'] = $member['org_id'];
        $data['member_id'] = $member['id'];
        $data['type'] = $member['type'];
        $data['name'] = $member['name'];
        $data['created'] = time();

        return self::dbTable()->insertGetId($data);
    }
    
    /**
     * 获取列表数据
     *
     * @param int $orgId
     * @param int $page
     * @param int $pageSize
     * @param array $param
     * @param int $order            
     * @return array(\Illuminate\Support\Collection, int)
     */
    public static function selectList($orgId, $page = 1, $pageSize = 50, $param = array(), $order = self::ORDER_ID_DESC)
    {
        $queryList = self::dbTable();
        $queryCount = clone $queryList;
        
        $where[] = ['org_id', $orgId];
        // 时间
        if (isset($param['datetime']) && ! empty($param['datetime'])) {
            $where[] = ['created', '>=', $param['datetime'][0]];
            $where[] = ['created', '<=', $param['datetime'][1]];
        }
        // 用户类型
        if (isset($param['type']) && ! empty($param['type'])) {
            $where[] = ['type', $param['type']];
        }
        // 搜索（邮箱、 姓名）
        if (isset($param['keyword']) && ! empty($param['keyword'])) {
            $queryCount->where(function ($query) use ($param) {
                $query->where('name', 'like', '%' . $param['keyword'] . '%')
                ->orWhere('email', 'like', '%' . $param['keyword'] . '%');
            });
            $queryList->where(function ($query) use ($param) {
                $query->where('name', 'like', '%' . $param['keyword'] . '%')
                ->orWhere('email', 'like', '%' . $param['keyword'] . '%');
            });
        }
        
        // 查询数量
        $count = $queryCount->where($where)->count();
        // 构造语句
        $queryList->where($where)
            ->offset(($page - 1) * $pageSize)
            ->limit($pageSize);
        // 排序
        switch ($order) {
            case self::ORDER_ID_ASC:
                $queryList->orderBy('id', 'asc');
                break;
            case self::ORDER_ID_DESC:
                $queryList->orderBy('id', 'desc');
                break;
            default:
                $queryList->orderBy('id', 'desc');
        }
        // 查询数据
        $collection = $queryList->get();
        
        return array(
            $collection,
            $count
        );
    }
}
