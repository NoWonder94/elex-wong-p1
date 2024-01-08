<?php
namespace App\Listeners\User\Auth;

use App\Events\User\Auth\UpdateEvent;
use App\Core\Entity\Session\UserEntity;
use App\Services\Base\UserService;
use App\Services\Base\Auth\UserService as AuthUserService;

/**
 * 监听器【用户数据】【更新】
 */
class UpdateListener
{

    /**
     * 用户实体
     *
     * @var \App\Core\Entity\Session\UserEntity
     */
    protected $userEntity;

    /**
     * 创建事件监听器
     *
     * @return void
     */
    public function __construct(UserEntity $userEntity)
    {
        $this->userEntity = $userEntity;
    }

    /**
     * 处理事件
     *
     * @param UpdateEvent $event            
     * @return void
     */
    public function handle(UpdateEvent $event)
    {
        if ($this->userEntity->getUserId() == $event->id) {
            $userService = new UserService();
            // 查询用户数据
            $user = $userService->findUserById($event->id);
            
            $authUserService = new AuthUserService();
            // 同步数据到 session
            $authUserService->synSessionData($this->userEntity, $user);
            // 同步数据到 cookie
            $authUserService->synCookieData($this->userEntity);
        }
    }
}
