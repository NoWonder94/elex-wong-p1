<?php
namespace App\Core\Entity\Session;

use App\Models\Agency\MemberModel;

class MemberEntity extends Factory
{

    public function __construct(array $data = [])
    {
        if (! count($data) && session()->has(self::SESSION_KEY_MEMBER)) {
            $data = session()->get(self::SESSION_KEY_MEMBER);
        }
        parent::__construct($data);
    }

    /**
     * 验证是否为管理员
     *
     * @return boolean
     */
    public function isAdmin()
    {
        return $this->offsetGet('type') == MemberModel::TYPE_ADMIN ? true : false;
    }

    /**
     * 获取组织ID
     *
     * @return NULL | id
     */
    public function getOrgId()
    {
        return $this->offsetGet('org_id');
    }

    /**
     * 获取代理人ID
     *
     * @return NULL | id
     */
    public function getMemberId()
    {
        return $this->offsetGet('id');
    }

    /**
     * 获取代理人数据
     *
     * @return array
     */
    public function getMember()
    {
        return $this->count() ? $this->getArrayCopy() : [];
    }

    public function save()
    {
        if ($this->count()) {
            // 保存数据到 session
            session()->put(self::SESSION_KEY_MEMBER, $this->getArrayCopy());
        } else {
            // 删除数据到 session
            session()->forget(self::SESSION_KEY_MEMBER);
        }
    }

    /**
     * 析构函数，同步数据到 session
     */
    public function __destruct()
    {
        $this->save();
    }
}