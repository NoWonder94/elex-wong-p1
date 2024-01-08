<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection as BaseResourceCollection;

class ResourceCollection extends BaseResourceCollection
{

    /**
     * 用户实体
     *
     * @var \App\Core\Entity\Session\UserEntity
     */
    private $user;

    /**
     * 获取用户实体
     *
     * @return \App\Core\Entity\Session\UserEntity
     */
    public function identity()
    {
        if (! $this->user) {
            $this->user = self::userEntity();
        }
        return $this->user;
    }

    /**
     * 获取用户实体（静态方法）
     *
     * @return \App\Core\Entity\Session\UserEntity
     */
    public static function userEntity()
    {
        return resolve(\App\Core\Entity\Session\UserEntity::class);
    }
}