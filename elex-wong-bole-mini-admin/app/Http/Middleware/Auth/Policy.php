<?php
namespace App\Http\Middleware\Auth;

use Closure;
use App\Core\Entity\Session\PolicyEntity;

/**
 * 权限策略检查
 */
class Policy
{

    /**
     * 策略实体
     *
     * @var \App\Core\Entity\Session\PolicyEntity
     */
    protected $policyEntity;

    /**
     * 初始化策略实体
     *
     * @param PolicyEntity $policyEntity
     */
    public function __construct(PolicyEntity $policyEntity)
    {
        $this->policyEntity = $policyEntity;
    }

    /**
     * 前置 | 后置
     *
     * @param \Illuminate\Http\Request $request            
     * @param \Closure $next            
     * @param string $code            
     * @return mixed
     */
    public function handle($request, Closure $next, $code)
    {
        return $this->policyEntity->hasPolicyCode($code) ? $next($request) : abort(403);
    }
}