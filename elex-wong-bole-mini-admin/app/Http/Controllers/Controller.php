<?php
namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * 用户实体
     *
     * @var \App\Core\Entity\Session\UserEntity
     */
    private $user;

    /**
     * 代理人实体
     *
     * @var \App\Core\Entity\Session\MemberEntity
     */
    private $member;

    /**
     * 策略实体
     *
     * @var \App\Core\Entity\Session\PolicyEntity
     */
    private $policy;

    /**
     * 获取用户实体
     *
     * @return \App\Core\Entity\Session\UserEntity
     */
    public function identity()
    {
        if (! $this->user) {
            $this->user = resolve(\App\Core\Entity\Session\UserEntity::class);
        }
        return $this->user;
    }

    /**
     * 获取代理人实体
     *
     * @return \App\Core\Entity\Session\MemberEntity
     */
    public function agent()
    {
        if (! $this->member) {
            $this->member = resolve(\App\Core\Entity\Session\MemberEntity::class);
        }
        return $this->member;
    }

    /**
     * 获取策略实体
     *
     * @return \App\Core\Entity\Session\PolicyEntity
     */
    public function auth()
    {
        if (! $this->policy) {
            $this->policy = resolve(\App\Core\Entity\Session\PolicyEntity::class);
        }
        return $this->policy;
    }
}
