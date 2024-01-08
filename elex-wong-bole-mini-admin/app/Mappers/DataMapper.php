<?php
namespace App\Mappers;

use App\Core\Entity\BaseEntity;

abstract class DataMapper extends BaseEntity
{

    /**
     * 代理人实体
     *
     * @var \App\Core\Entity\Session\MemberEntity
     */
    private $member;

    /**
     * 获取代理人实体
     *
     * @return \App\Core\Entity\Session\MemberEntity
     */
    public function agent()
    {
        if (!$this->member) {
            $this->member = resolve(\App\Core\Entity\Session\MemberEntity::class);
        }
        return $this->member;
    }

    public function __construct(array $param = [])
    {
        foreach ($param as $key => $value) {
            $this->$key = $value;
        }
    }

    public function isValid($key)
    {
        return isset($this->$key) && !empty($this->$key) ? true : false;
    }

    abstract public function make();
}