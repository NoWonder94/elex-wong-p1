<?php
namespace App\Services\Base\Auth;

use App\Core\Entity\Session\MemberEntity as SessionMemberEntity;
use App\Exceptions\Response\Service\ServiceException;
use App\Exceptions\Response\Service\ServiceCode;
use App\Models\Agency\MemberModel;

class MemberService
{

    /**
     * 验证代理人状态
     *
     * @param array $member
     * @throws ServiceException
     * @return $this
     */
    public function verifyMemberStatus($member)
    {
        if ($member['status'] == MemberModel::STATUS_DISABLE) {
            throw new ServiceException(ServiceCode::SERVICE_DISABLE_MEMBER);
        }
        return $this;
    }

    /**
     * 制作代理人 session 数据
     *
     * @param array $member            
     * @return array
     */
    private function makeSessionData(array $member = [])
    {
        return collect($member)->only('id', 'org_id', 'type', 'name')->all();
    }

    /**
     * 同步代理人数据到 session
     *
     * @param SessionMemberEntity $memberEntity            
     * @param array $member            
     * @return $this
     */
    public function synSessionData(SessionMemberEntity $memberEntity, array $member = [])
    {
        $data = $this->makeSessionData($member);
        
        $memberEntity->initData($data)->save();
        
        return $this;
    }
}