<?php
namespace App\Mappers\Coin\Order;

use App\Mappers\DataMapper;
use App\Models\Coin\Order\AgencyModel as OrderAgencyModel;

class AgencyMapper extends DataMapper
{

    public function make()
    {
        // 单号
        $this->offsetSet('sn', OrderAgencyModel::getUniqueNumber($this->org_id));
        // 上级代理ID
        $this->offsetSet('sup_org_id', $this->agent()->getOrgId());
        // 下级代理ID
        $this->offsetSet('sub_org_id', $this->org_id);
        // 来源
        $this->offsetSet('source', OrderAgencyModel::SOURCE_SUP);
        // 类型
        $this->offsetSet('type', $this->type);
        // 金币数量
        $this->offsetSet('amount', $this->amount);
        
        return $this;
    }
}