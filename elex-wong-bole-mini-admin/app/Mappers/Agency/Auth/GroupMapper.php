<?php
namespace App\Mappers\Agency\Auth;

use App\Mappers\DataMapper;

class GroupMapper extends DataMapper
{

    public function make()
    {
        // 名称
        $this->offsetSet('name', $this->name);
        // 描述
        $this->offsetSet('desc', $this->isValid('desc') ? $this->desc : null);
        // 排序
        if ($this->isValid('sort')) {
            $this->offsetSet('sort', $this->sort);
        }
        return $this;
    }
}