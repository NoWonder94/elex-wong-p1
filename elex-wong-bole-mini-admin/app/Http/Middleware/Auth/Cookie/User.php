<?php
namespace App\Http\Middleware\Auth\Cookie;

use Closure;
use App\Core\Entity\Session\UserEntity;
use App\Core\Entity\Cookie\UserEntity as CookieUserEntity;

/**
 * 用户 cookie 初始化
 */
class User
{

    /**
     * 用户实体
     *
     * @var \App\Core\Entity\Session\UserEntity
     */
    protected $userEntity;

    /**
     * 初始化用户实体
     *
     * @param UserEntity $userEntity            
     */
    public function __construct(UserEntity $userEntity)
    {
        $this->userEntity = $userEntity;
    }

    /**
     * 前置 | 后置
     *
     * @param \Illuminate\Http\Request $request            
     * @param \Closure $next            
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (! CookieUserEntity::isInit()) {
            // 初始化用户数据到 cookie
            (new CookieUserEntity($this->userEntity))->save();
        }
        
        return $next($request);
    }
}