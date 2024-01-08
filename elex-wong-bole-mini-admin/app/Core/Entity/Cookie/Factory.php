<?php
namespace App\Core\Entity\Cookie;

use App\Core\Entity\BaseEntity;

/**
 * Cookie 抽象类
 */
abstract class Factory extends BaseEntity
{

    /**
     * 用户数据 cookie key（\App\Core\Entity\Cookie\UserEntity）
     */
    const COOKIE_KEY_USER = 'agency_user';

    /**
     * 策略数据 cookie key（\App\Core\Entity\Cookie\PolicyEntity）
     */
    const COOKIE_KEY_POLICY = 'agency_policy';

    /**
     * session 实体
     *
     * @var \App\Core\Entity\BaseEntity
     */
    protected $dataEntity;

    /**
     * 有效期（24 * 60）分钟（1天）
     *
     * @var int
     */
    protected $validity = 1440;

    public function __construct(BaseEntity $dataEntity)
    {
        $this->dataEntity = $dataEntity;
        
        parent::__construct($this->make());
    }

    /**
     * 制作 cookie 数据
     *
     * @return array
     */
    abstract protected function make();

    /**
     * 同步数据到 cookie
     *
     * @return void
     */
    abstract public function save();
}