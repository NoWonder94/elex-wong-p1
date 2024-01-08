<?php
namespace App\Core\Entity\Cookie;

use Illuminate\Support\Facades\Cookie;

/**
 * Cookie 用户对象
 */
class PolicyEntity extends Factory
{

    /**
     * session 实体
     *
     * @var \App\Core\Entity\Session\PolicyEntity
     */
    protected $dataEntity;

    protected function make()
    {
        return $this->dataEntity->getPolicy();
    }

    public function save()
    {
        if ($this->count()) {
            // 保存数据到 cookie
            Cookie::queue(self::COOKIE_KEY_POLICY, $this, $this->validity, $path = null, $domain = null, $secure = false, $httpOnly = false);
        } else {
            // 删除数据到 cookie
            Cookie::queue(Cookie::forget(self::COOKIE_KEY_POLICY));
        }
    }

    /**
     * 检查用户 cookie 是否初始化
     *
     * @return boolean
     */
    public static function isInit()
    {
        return Cookie::has(self::COOKIE_KEY_POLICY);
    }
}