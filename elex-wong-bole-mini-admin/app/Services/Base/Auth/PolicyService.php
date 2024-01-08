<?php
namespace App\Services\Base\Auth;

use Illuminate\Support\Facades\DB;
use App\Models\Agency\Auth\GroupModel;
use App\Models\Agency\Auth\GroupMemberModel;
use App\Models\Agency\Auth\GroupPolicyModel;
use App\Models\Agency\Auth\PolicyModel;
use App\Core\Entity\Cookie\PolicyEntity as CookiePolicyEntity;
use App\Core\Entity\Session\PolicyEntity as SessionPolicyEntity;
use App\Models\Agency\MemberModel;

class PolicyService
{

    /**
     * 策略 Collection 对象
     *
     * @var \Illuminate\Support\Collection
     */
    private $policys;

    /**
     * 查询用户策略
     *
     * @param array $member
     * @return $this
     */
    public function selectPolicy($member)
    {
        if ($member['type'] == MemberModel::TYPE_ADMIN) {
            // 管理员直接获取所有策略
            $this->policys = PolicyModel::selectAll(['id','name','icon','route','code']);
        } else {
            $this->policys = GroupModel::dbTable('d')->select(DB::raw('distinct p.id,p.name,p.icon,p.route,p.code'))
                ->join(GroupMemberModel::TABLENAME . ' as gm', 'gm.group_id', '=', 'd.id')
                ->join(GroupPolicyModel::TABLENAME . ' as gp', 'gp.group_id', '=', 'd.id')
                ->join(PolicyModel::TABLENAME . ' as p', function ($join) {
                    $join->on('p.id', '=', 'gp.policy_id')
                        ->where('p.status', '=', PolicyModel::STATUS_ENABLE);
                })
                ->where('d.status', GroupModel::STATUS_ENABLE)
                ->where('gm.member_id', $member['id'])
                ->orderBy('p.sort', 'asc')
                ->get();
        }
        
        return $this;
    }

    /**
     * 验证权限
     *
     * @throws SystemException
     * @return $this
     */
    public function verifyAuth()
    {
        return $this->policys->isEmpty() ? abort(403) : $this;
    }

    /**
     * 同步策略数据到 session
     *
     * @param SessionPolicyEntity $policyEntity
     * @return $this
     */
    public function synSessionData(SessionPolicyEntity $policyEntity)
    {
        $data = $policyEntity->make($this->policys ? $this->policys->all() : []);
        
        $policyEntity->initData($data)->save();
        
        return $this;
    }

    /**
     * 同步策略数据到 cookie
     *
     * @param SessionPolicyEntity $policyEntity
     * @return $this
     */
    public function synCookieData(SessionPolicyEntity $policyEntity)
    {
        (new CookiePolicyEntity($policyEntity))->save();
        
        return $this;
    }
}