<?php
namespace App\Core\Entity\Session;

use App\Services\Base\Auth\UserService as AuthUserService;

class UserEntity extends Factory
{

    /**
     * 用户数据内部 key（重定向地址）
     */
    const KEY_REDIRECT_URI = 'redirect_uri';

    public function __construct(array $data = [])
    {
        if (! count($data) && session()->has(self::SESSION_KEY_USER)) {
            $data = session()->get(self::SESSION_KEY_USER);
        }
        parent::__construct($data);
    }

    /**
     * 验证用户是否登录
     *
     * @return boolean
     */
    public function isValid()
    {
        return $this->offsetExists('id');
    }

    /**
     * 获取用户ID
     *
     * @return NULL | id
     */
    public function getUserId()
    {
        return $this->isValid() ? $this->offsetGet('id') : null;
    }

    /**
     * 获取用户数据
     *
     * @return array
     */
    public function getUser()
    {
        return $this->isValid() ? $this->getArrayCopy() : [];
    }

    public function getAdminGroupId() {
        return $this->isValid() ? $this->offsetGet('admin_group_id') : null;
    }

    public function hasAuthorityData() {
        return session()->has(self::SESSION_AUTHORITY_DATA) ? session()->get(self::SESSION_AUTHORITY_DATA) : false;
    }

    public function setAuthorityData($data) {
        session()->put(self::SESSION_AUTHORITY_DATA, $data);
    }

    public function deleteAuthorityData() {
        session()->forget(self::SESSION_AUTHORITY_DATA);
    }
    
    /**
     * 获取登录地址
     *
     * @return string uri
     */
    public function getSignInUri()
    {
        return route('user.login');
    }

    /**
     * 获取退出地址
     *
     * @return string uri
     */
    public function getSignOutUri()
    {
        return route('user.logout');
    }

    /**
     * 获取 redirect 链接
     *
     * @return string
     */
    public function getRedirectUri()
    {
        return $this->offsetExists(self::KEY_REDIRECT_URI) ? $this->offsetGet(self::KEY_REDIRECT_URI) : route('index');
    }

    /**
     * 保存 redirect 链接
     *
     * @param string $redirect_uri            
     * @return $this
     */
    public function setRedirectUri($redirect_uri)
    {
        $this->offsetSet(self::KEY_REDIRECT_URI, $redirect_uri);
        return $this;
    }

    /**
     * 删除 redirect 链接
     *
     * @return $this
     */
    public function unsetRedirectUri()
    {
        if ($this->offsetExists(self::KEY_REDIRECT_URI)) {
            $this->offsetUnset(self::KEY_REDIRECT_URI);
        }
        return $this;
    }

    /**
     * 检测最后登录时间
     * @return int
     */
    public function checkLoginLast()
    {
        if (!$this->offsetExists('login_last')) {
            return true;
        }
        return (new AuthUserService())->checkLoginLast($this->getUserId(), $this->offsetGet('login_last'));
    }

    public function save()
    {
        if ($this->count()) {
            // 保存数据到 session
            session()->put(self::SESSION_KEY_USER, $this->getArrayCopy());
        } else {
            // 删除数据到 session
            session()->forget(self::SESSION_KEY_USER);
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