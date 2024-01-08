<?php
namespace App\Http\Middleware\Auth;

use Closure;
use App\Services\Base\UserService;
use App\Core\Entity\Session\UserEntity;

/**
 * 用户登录检查
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
        if ($this->userEntity->isValid()) {
            if (!$this->userEntity->checkLoginLast()) {
                return $request->expectsJson() ? abort(402) : redirect($this->userEntity->getSignOutUri());
            }
            return $next($request);
        } else {
            return $request->expectsJson() ? abort(401) : redirect($this->userEntity->getSignInUri());
        }
    }
}