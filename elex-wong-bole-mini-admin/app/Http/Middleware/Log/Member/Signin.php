<?php
namespace App\Http\Middleware\Log\Member;

use Closure;
use App\Core\Entity\Session\UserEntity;
use App\Core\Entity\Session\MemberEntity;
use App\Models\Base\UserModel;
use App\Models\Log\Member\SigninModel;

/**
 * 用户登录后续处理
 */
class Signin
{

    /**
     * 用户实体
     *
     * @var \App\Core\Entity\Session\UserEntity
     */
    protected $userEntity;

    /**
     * 代理人实体
     *
     * @var \App\Core\Entity\Session\MemberEntity
     */
    protected $memberEntity;

    /**
     * 初始化用户实体、代理人实体
     *
     * @param UserEntity $userEntity            
     * @param MemberEntity $memberEntity            
     */
    public function __construct(UserEntity $userEntity, MemberEntity $memberEntity)
    {
        $this->userEntity = $userEntity;
        $this->memberEntity = $memberEntity;
    }

    /**
     * 前置 | 后置
     *
     * @param \Illuminate\Http\Request $request            
     * @param \Closure $next            
     * @return \Closure $next
     */
    public function handle($request, Closure $next)
    {
        return $next($request);
    }

    /**
     * 响应发送到浏览器之后处理
     *
     * @param \Illuminate\Http\Request $request            
     * @param \Illuminate\Http\Response $response            
     */
    public function terminate($request, $response)
    {
        if (! $this->userEntity->isValid()) {
            return false;
        }
        // 更新用户登录时间
        //UserModel::updateSigninTime($this->userEntity->getUserId());
        
        // 记录代理人登录日志
        SigninModel::createByMemberId($this->memberEntity->getMemberId(), $request->getClientIp());
    }
}