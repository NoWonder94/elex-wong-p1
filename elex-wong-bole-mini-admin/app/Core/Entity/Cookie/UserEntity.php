<?php
namespace App\Core\Entity\Cookie;

use Illuminate\Support\Facades\Cookie;

/**
 * Cookie 用户对象
 */
class UserEntity extends Factory
{

    /**
     * session 实体
     *
     * @var \App\Core\Entity\Session\UserEntity
     */
    protected $dataEntity;

    protected function make()
    {
        $data = [];
        if ($this->dataEntity->isValid()) {
            $data['uri']['login'] = $this->dataEntity->getSignInUri();
            $data['uri']['logout'] = $this->dataEntity->getSignOutUri();
            
            if ($this->dataEntity->offsetExists('name') && $this->dataEntity->offsetGet('name')) {
                $data['user']['name'] = $this->dataEntity->offsetGet('name');
            }

            // $data['user']['avatar'] = $this->dataEntity->offsetGet('avatar_view');
            if ($this->dataEntity->offsetExists('nickname') && $this->dataEntity->offsetGet('nickname')) {
                $data['user']['name'] = $this->dataEntity->offsetGet('nickname');
            } else {
                //$data['user']['name'] = $this->dataEntity->offsetGet('email');
            }
        }
        return $data;
    }

    public function save()
    {
        if ($this->count()) {
            // 保存数据到 cookie
            Cookie::queue(self::COOKIE_KEY_USER, $this, $this->validity, $path = null, $domain = null, $secure = false, $httpOnly = false);
        } else {
            // 删除数据到 cookie
            Cookie::queue(Cookie::forget(self::COOKIE_KEY_USER));
        }
    }

    /**
     * 检查用户 cookie 是否初始化
     *
     * @return boolean
     */
    public static function isInit()
    {
        return Cookie::has(self::COOKIE_KEY_USER);
    }
}