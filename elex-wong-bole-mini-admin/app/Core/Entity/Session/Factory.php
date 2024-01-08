<?php
namespace App\Core\Entity\Session;

use App\Core\Entity\BaseEntity;

/**
 * Session 抽象类
 */
abstract class Factory extends BaseEntity
{

    /**
     * 用户数据 session key （\App\Core\Entity\Session\UserEntity）
     */
    const SESSION_KEY_USER = 'user';
    const SESSION_AUTHORITY_DATA = 'authority';
    
    /**
     * 代理人数据 session key （\App\Core\Entity\Session\MemberEntity）
     */
    const SESSION_KEY_MEMBER = 'member';

    /**
     * 策略数据 session key （\App\Core\Entity\Session\PolicyEntity）
     */
    const SESSION_KEY_POLICY = 'policy';

    /**
     * 策略数据 session key （\App\Core\Entity\Session\Cq9Entity）
     */
    const SESSION_KEY_CQ9 = 'cq9';

    /**
     * 同步数据到 session
     *
     * @return void
     */
    abstract public function save();
}