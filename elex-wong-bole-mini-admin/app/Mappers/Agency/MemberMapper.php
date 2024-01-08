<?php
namespace App\Mappers\Agency;

use App\Mappers\DataMapper;

class MemberMapper extends DataMapper
{

    public function make()
    {
        // 组织架构ID
        if ($this->isValid('org_id')) {
            $this->offsetSet('org_id', $this->org_id);
        }
        // 类型
        $this->offsetSet('type', $this->type);
        // 名称（姓名或公司名称）
        $this->offsetSet('name', $this->name);
        // 联系电话
        $this->offsetSet('tel', $this->isValid('tel') ? $this->tel : null);
        // 移动电话
        $this->offsetSet('tele', $this->isValid('tele') ? $this->tele : null);
        
        return $this;
    }
}