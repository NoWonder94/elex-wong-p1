<?php
namespace App\Mappers\Base;

use App\Mappers\DataMapper;
use App\Services\Base\Auth\UserService as AuthUserService;

class UserMapper extends DataMapper
{

    public function make()
    {
        // 邮箱
        $this->offsetSet('email', $this->email);
        // 密码
        if ($this->isValid('password')) {
            $authUserService = new AuthUserService();
            $this->offsetSet('password', $authUserService->makeUserPassword($this->password));
        }
        // 昵称
        $this->offsetSet('nickname', $this->isValid('nickname') ? $this->nickname : null);
        
        return $this;
    }
}