<?php
namespace App\Mappers\Agency;

use App\Mappers\DataMapper;

class OrgMapper extends DataMapper
{

    public function make()
    {
        // 名称
        $this->offsetSet('name', $this->name);
        // 父ID
        if ($this->isValid('parent_id')) {
            $this->offsetSet('parent_id', $this->parent_id);
        }
        // 排序
        if ($this->isValid('sort')) {
            $this->offsetSet('sort', $this->sort);
        }
        return $this;
    }
}