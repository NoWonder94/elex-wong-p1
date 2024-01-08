<?php
namespace App\Http\Middleware\Auth;

use Closure;
use App\Core\Entity\Session\UserEntity;
use App\Core\Entity\Session\PolicyEntity;

/**
 * 用户登录检查（如果已登录重定向）
 */
class UserRedirect
{
    
    /**
     * 用户实体
     *
     * @var \App\Core\Entity\Session\UserEntity
     */
    protected $userEntity;
    
    /**
     * 策略实体
     *
     * @var \App\Core\Entity\Session\PolicyEntity
     */
    protected $policyEntity;
    
    /**
     * 初始化用户实体、策略实体
     *
     * @param UserEntity $userEntity
     * @param PolicyEntity $policyEntity
     */
    public function __construct(UserEntity $userEntity, PolicyEntity $policyEntity)
    {
        $this->userEntity = $userEntity;
        $this->policyEntity = $policyEntity;
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
            // 获取 redirect 缓存
            $redirect_uri = $this->userEntity->getRedirectUri();
            // 删除 redirect 缓存
            $this->userEntity->unsetRedirectUri();
            // 获取前端 path
            if (isset($this->policyEntity->getPolicy()[0]['route'])) {
                $redirect_path = $this->policyEntity->getPolicy()[0]['route'];
            } else {
                $redirect_path = 'member';
            }
            // redirect 页面跳转
            return redirect($redirect_uri . '/#/' . $redirect_path);
        }
        return $next($request);
    }
}