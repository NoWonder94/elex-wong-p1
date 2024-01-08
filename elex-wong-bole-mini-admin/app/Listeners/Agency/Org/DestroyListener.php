<?php
namespace App\Listeners\Agency\Org;

use App\Events\Agency\Org\DestroyEvent;
use App\Services\Agency\MemberService;
use App\Models\Agency\MemberModel;
use App\Services\Agency\AccessKeyService;
use App\Models\Agency\AccessKeyModel;

/**
 * 监听器【组织】【删除】
 */
class DestroyListener
{

    /**
     * 处理事件
     *
     * @param DestroyEvent $event            
     * @return void
     */
    public function handle(DestroyEvent $event)
    {
        // 禁用代理成员
        if (MemberModel::verifyExistByOrgId($event->id)) {
            $memberService = new MemberService();
            $memberService->saveListStatus($event->id, MemberModel::STATUS_DISABLE);
        }
        
        // 禁用 AccessKey
        if (AccessKeyModel::verifyExistByOrgId($event->id)) {
            $accessKeyService = new AccessKeyService();
            $accessKeyService->saveItemStatus($event->id, AccessKeyModel::STATUS_DISABLE);
        }
    }
}
