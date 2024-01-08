<?php
namespace App\Services\Base\Auth;

use Illuminate\Support\Facades\Hash;
use App\Core\Entity\Cookie\UserEntity as CookieUserEntity;
use App\Core\Entity\Session\UserEntity as SessionUserEntity;
use App\Exceptions\Response\Service\ServiceException;
use App\Exceptions\Response\Service\ServiceCode;
use App\Models\Base\UserModel;
use Cache;

class UserService
{

    /**
     * 制作用户密码
     *
     * @param string $password            
     * @return string
     */
    public function makeUserPassword($password)
    {
        return Hash::make($password);
    }

    /**
     * 验证用户密码
     *
     * @param array $user            
     * @param string $password            
     * @throws ServiceException
     * @return $this
     */
    public function verifyUserPassword($user, $password)
    {
        if (! Hash::check($password, $user['password'])) {
            throw new ServiceException(ServiceCode::SERVICE_PARAM_INVALID_PASSWORD);
        }
        return $this;
    }
    
    /**
     * 验证用户状态
     *
     * @param array $user
     * @throws ServiceException
     * @return $this
     */
    public function verifyUserStatus($user)
    {
        if ($user['status'] == UserModel::STATUS_DISABLE) {
            throw new ServiceException(ServiceCode::SERVICE_DISABLE_USER);
        }
        return $this;
    }

    /**
     * 验证邮箱已存在（已存在则抛出异常）
     *
     * @param string $email            
     * @param int $selfId            
     * @throws ServiceException
     * @return $this
     */
    public function verifyUserExistedByEmail($email, $selfId = null)
    {
        $user = UserModel::findByEmail($email)->shift();
        
        if (! $selfId && $user) {
            throw new ServiceException(ServiceCode::SERVICE_EXISTED_EMAIL);
        } elseif ($selfId && $user && $selfId != $user['id']) {
            throw new ServiceException(ServiceCode::SERVICE_EXISTED_EMAIL);
        }
        return $this;
    }

    /**
     * 验证邮箱不存在（不存在则抛出异常）
     *
     * @param string $email            
     * @throws ServiceException
     * @return $this
     */
    public function verifyUserNotExistByEmail($email)
    {
        if (UserModel::findByEmail($email)->isEmpty()) {
            throw new ServiceException(ServiceCode::SERVICE_NOT_EXIST_EMAIL);
        }
        return $this;
    }

    /**
     * 更新用户数据
     *
     * @param int $id            
     * @param array $data            
     * @throws ServiceException
     * @return boolean
     */
    public function update($id, $data)
    {
        if (! ($status = UserModel::update($id, $data))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
        
        // 抛出更新用户数据事件
        \App\Events\User\Auth\UpdateEvent::dispatch($id);
        
        return (boolean) $status;
    }

    /**
     * 更新用户密码
     *
     * @param int $id            
     * @param string $password            
     * @throws ServiceException
     * @return boolean
     */
    public function updatePassword($id, $password)
    {
        $data['password'] = $this->makeUserPassword($password);
        
        if (! ($status = UserModel::update($id, $data))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
        
        return (boolean) $status;
    }

    /**
     * 制作用户 session 数据
     *
     * @param array $user            
     * @return array
     */
    private function makeSessionData(array $user = [])
    {
        return collect($user)->only('id', 'email', 'nickname', 'login_last')->all();
    }

     /**
     * 更新最后登录时间
     * @param int $time 最后登录时间
     * @return $this
     */
    public function updateLoginLast($id, $time)
    {
        // 更新用户登录时间
        UserModel::updateSigninTime($id, $time);

        //缓存最后登录时间
        Cache::forever('user_login_last_' . $id, $time);
    }

    public function checkLoginLast($id, $time)
    {
        $cache_time = (int)Cache::get('user_login_last_' . $id);
        return $cache_time == 0 || $cache_time == $time;
    }

    /**
     * 同步用户数据到 session
     *
     * @param SessionUserEntity $userEntity            
     * @param array $user            
     * @return $this
     */
    public function synSessionData(SessionUserEntity $userEntity, array $user = [])
    {
        $data = $this->makeSessionData($user);

        $userEntity->initData($data)->save();
        
        return $this;
    }

    /**
     * 同步用户数据到 cookie
     *
     * @param SessionUserEntity $userEntity            
     * @return $this
     */
    public function synCookieData(SessionUserEntity $userEntity)
    {
        (new CookieUserEntity($userEntity))->save();
        
        return $this;
    }

    public function checkLogin() {

    }
}