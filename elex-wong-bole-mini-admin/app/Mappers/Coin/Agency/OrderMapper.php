<?php
namespace App\Mappers\Coin\Agency;

use App\Mappers\DataMapper;
use App\Models\Coin\Order\AgencyModel as OrderAgencyModel;
use App\Services\Agency\OrgService;

class OrderMapper extends DataMapper
{

    private $parentOrgId;

    /**
     * 父级节点ID
     *
     * @return mixed
     */
    private function getParentOrgId()
    {
        if (!$this->parentOrgId) {
            $orgService = new OrgService();
            $parent = $orgService->findParent($this->agent()->getOrgId());

            $this->parentOrgId = $parent['id'];
        }
        return $this->parentOrgId;
    }

    public function make()
    {
        // 单号
        $this->offsetSet('sn', OrderAgencyModel::getUniqueNumber($this->agent()->getOrgId()));
        // 上级代理ID
        $this->offsetSet('sup_org_id', $this->getParentOrgId());
        // 下级代理ID
        $this->offsetSet('sub_org_id', $this->agent()->getOrgId());
        // 来源
        $this->offsetSet('source', OrderAgencyModel::SOURCE_SUB);
        // 类型
        $this->offsetSet('type', $this->type);
        // 金币数量
        $this->offsetSet('amount', $this->amount);

        return $this;
    }
}