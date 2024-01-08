<?php 
namespace App\Application\Site\Api\Services;

use App\Models\Site\UserLock;
use App\Models\Site\UserStatistic;
use App\Models\Site\UserGame;
use App\Models\Site\UserGroup;
use App\Models\Site\UserOnline;
use App\Models\Site\Proxy;
use App\Models\Site\UserBrowse;
use App\Application\Site\Api\Models\User;

use App\Services\System\IpRegionService;
use App\Services\Site\VerifyCodeService;
use App\Services\Site\MessageTemplateService;
use App\Services\Site\EmailService;
use App\Services\Site\SmsService;

use App\Traits\UserTrait;

use App\Events\Site\UserEvent;
use Illuminate\Database\Query\Expression;
use SiteSetting, Time, Event, Strings, Helper, DB;

class UserService extends BaseService {
    use UserTrait;

    public function get(int $userId) {
        $user = User::with('userGroup', 'games')->where('id', $userId)->first();
        if ($user) {
            //如果会员等级已过期时
            if ($user->userGroup->is_level == 1 && $user->user_group_expired <= UTC_TIME) {
                $this->updateUserGroup($userId);
                $user = User::with('userGroup', 'games')->where('id', $userId)->first();
            }
        }
        return $user;
    }
    
    public function checkByField(string $key, string $val, $isEncrypt = false) {
        if ($isEncrypt) {
            $val = Helper::encryptData($val);
        }
        return User::where($key, $val)->where('site_id', APP_CURRENT_SITE_ID)->count('id') > 0;
    }

    public function getByField(string $key, string $val, $isEncrypt = false) {
        if ($isEncrypt) {
            $val = Helper::encryptData($val);
        }
        return User::where($key, $val)->where('site_id', APP_CURRENT_SITE_ID)->first();
    }

    /**
     * 会员登录
     * @param  string $name       帐号/邮箱/手机
     * @param  string $pwd        密码
     * @param  string $userAgent  浏览器信息
     * @param  string $verifyCode 验证码
     * @return [
     *             'type' => string 返回类型
     *             'user' => User   会员对像
     *         ]
     */
    public function login(string $name, string $pwd, string $userAgent, string $client, $alisc) {
        ($user = $this->getByField('name', $name)) || 
        ($user = $this->getByField('mobile', $name, true)) || 
        ($user = $this->getByField('email', $name, true));

        if (!$user) {
            $this->throwException('common.user.not_exist', 'name');
        }

        if ($user->status != 1) {
            $this->throwException('common.user.status_disabled');
        }

        //检查禁止登录时间
        if ($user->login_disabled_expired > UTC_TIME) {
            $this->throwException(['common.user.disabled_login', Time::toDate($user->login_disabled_expired)]);
        }

        $result = ['type' => '', 'user' => $user];

        //检测是否需要验证码
        $check_count = (int)SiteSetting::get('login_err_verifycode_count');
        if ($check_count > 0 && $user->login_error_count >= $check_count && 
			(empty($alisc) || !Helper::validateAlisc($client, $alisc))) {
            $result['type'] = 'alisc';
            return $result;
        }

        $pwd = md5(md5($pwd) . $user->crypt);
        if ($user->pwd != $pwd) {
            //增加会员登录错误次数
            User::where('id', $user->id)->increment('login_error_count');
            $count = User::where('id', $user->id)->getOne('login_error_count');

            //如果登录次数大于5次时锁定
            $check_count = (int)SiteSetting::get('login_err_lock_count');
            if ($check_count > 0 && $count >= $check_count) {
                $time = UTC_TIME + (int)SiteSetting::get('login_err_disabled_time');
                User::where('id', $user->id)->update([
                    'login_disabled_expired' => $time
                ]);
                $this->throwException(['common.user.disabled_login', Time::toDate($time)]);
            }
            $this->throwException('common.user.pwd_error', 'pwd');
        }

        //如果与上次登录的UseerAgent不同，并且有绑定验证过的邮箱或手机时，则要求二次验证
        /*if ($user->login_user_agent != $userAgent && ($user->is_auth_email == 1 || $user->is_auth_mobile == 1)) {
            $result['type'] = '2fa';
            return $result;
        }*/

        //更新登录信息
        $this->setLoginInfo($user, $userAgent, $client);
        $result['type'] = 'success';
        return $result;
    }

    /**
     * 退出登录
     * @param  User $user 会员对像
     */
    public function logout($user){
        LoginHistoryService::instance()->logout($user);             
    }

    /**
     * 会员注册
     * @param  string $name    帐号
     * @param  string $pwd     密码
     * @param  string $source  来源
     * @param  string $regInfo 浏览器指纹
     * @return User            会员对像
     */
    public function reg(array $data, string $source, string $regInfo) {
        if ($this->checkByField('name', $data['name'])) {
            $this->throwException('common.user.name_exist', 'name');
        }

        if ($this->checkByField('mobile', $data['mobile'], true)) {
            $this->throwException('common.user.mobile_exist', 'mobile');
        }

        if ($this->checkByField('email', $data['email'], true)) {
            $this->throwException('common.user.email_exist', 'email');
        }

        $ip_result = IpRegionService::instance()->getRegionByIp(CLIENT_IP);

        if (isset($data['proxy_code'])) {
            $proxy = Proxy::where('proxy_code', $data['proxy_code'])->first(); 
        }

        //创建会员
        $user = new User;

        $user->getConnection()->beginTransaction();
        try {
            $user->user_group_id = 1;
            $user->site_id       = APP_CURRENT_SITE_ID;
            $user->proxy_id      = isset($proxy->id) ? $proxy->id : 0;
            $user->proxy_name    = isset($proxy->name) ? $proxy->name : '';
            $user->name          = (string)$data['name'];
            $user->crypt         = Strings::randString(6);
            $user->pwd           = md5(md5($data['pwd']) . $user->crypt);
            $user->game_pwd      = $data['pwd'];
            $user->real_name     = $data['real_name'];
            $user->mobile        = $data['mobile'];
            $user->email         = $data['email'];
            $user->reg_time      = UTC_TIME;
            $user->reg_date      = UTC_DAY;
            $user->reg_hour      = UTC_HOUR_STR;
            $user->reg_ip        = CLIENT_IP;
            $user->reg_country   = $ip_result['country']; 
            $user->reg_province  = $ip_result['province']; 
            $user->reg_city      = $ip_result['city']; 
            $user->reg_source    = $source;
            $user->reg_info      = $regInfo; 
            $user->wait_send_msg_type = 'reg';

            //生成会员的邀请码
            do{
                $user->invite_code = Strings::randString(8);
            } while(User::where('invite_code', $user->invite_code)->where('site_id', APP_CURRENT_SITE_ID)->count() > 0);
            $user->save();

            //创建会员锁
            UserLock::create(['id' => $user->id]);

            $user_statistic_data = [
                'user_id' => $user->id, 
                'site_id' => $user->site_id,
                'proxy_id' => (int)$user->proxy_id,
            ];

            //创建会员统计数据
            UserStatistic::create($user_statistic_data);

            //触发会员注册事件
            $event = new UserEvent('reg', $user);
            Event::fire($event);

            $user->getConnection()->commit();
        } catch (\Exception $e) {
            $user->getConnection()->rollback();
            throw $e;
        }

        return $user;
    }

    /**
     * 修改密码
     * @param  string $account    手机号/邮箱
     * @param  string $verifyCode 验证码
     * @param  string $pwd        新密码
     */
    public function repwd(string $account, string $verifyCode, string $pwd) {
        $service   = VerifyCodeService::instance();
        $send_type = $service->getSendType($account);
        if (!$send_type) {
            $this->throwException(['common.request_args_error', 'account'], 'account');
        }
        
        $user = false;
        switch ($send_type) {
            case VERIFY_CODE_SEND_TYPE_SMS:
                $user = $this->getByField('mobile', $account, true);
                break;
            
            case VERIFY_CODE_SEND_TYPE_EMAIL:
                $user = $this->getByField('email', $account, true);
                break;
        }
        
        if (!$user) {
            $this->throwException('common.user.account_not_bind', 'account');
        }

        //如果新密码与原密码相同，直接成功
        if (md5(md5($pwd) . $user->crypt) == $user->pwd) {
            return true;
        }

        if (!$service->check($user->id, $account, $send_type, VERIFY_CODE_TYPE_REPWD, $verifyCode)) {
            $this->throwException('common.user.verify_code_error', 'verifyCode');
        }

        $user->getConnection()->beginTransaction();
        try {
            $this->lockUser($user->id);

            $user->crypt    = Strings::randString(6);
            $user->pwd      = md5(md5($pwd) . $user->crypt);
            $user->game_pwd = $pwd;
            $user->save();

            //触发会员修改密码事件
            $event = new UserEvent('repwd', $user, $pwd);
            Event::fire($event);
            
            $this->logout($user);
            
            $user->getConnection()->commit();
        } catch (\Exception $e) {
            $user->getConnection()->rollback();
            throw $e;
        }
    }

    public function updatePwd($user, $oldpwd, $newpwd) {
        //如果旧密码与原密码不同
        if (md5(md5($oldpwd) . $user->crypt) != $user->pwd) {
            $this->throwException('common.user.old_pwd_error', 'oldpwd');
        }

        //如果新密码与原密码相同，直接成功
        if ($oldpwd == $newpwd) {
            return true;
        }

        $user->getConnection()->beginTransaction();
        try {
            $this->lockUser($user->id);

            $user->crypt    = Strings::randString(6);
            $user->pwd      = md5(md5($newpwd) . $user->crypt);
            $user->game_pwd = $newpwd;
            $user->save();

            //触发会员修改密码事件
            $event = new UserEvent('repwd', $user, $newpwd);
            Event::fire($event);
			
			$this->logout($user);
			
            $user->getConnection()->commit();
        } catch (\Exception $e) {
            $user->getConnection()->rollback();
            throw $e;
        }
        return true;
    }

    /**
     * 设置登录信息
     * @param User   $user       会员对像
     * @param string $userAgent  浏览器信息
     */
    public function setLoginInfo(&$user, $userAgent, $client) {
        //添加登录日志
        $login_history = LoginHistoryService::instance()->login($user, $userAgent, $client);

        $user->login_time = $login_history->login_time;
        
        User::where('id', $user->id)->update([
            'login_time'        => $login_history->login_time,
            'login_ip'          => $login_history->login_ip,
            'login_country'     => $login_history->login_country,
            'login_province'    => $login_history->login_province,
            'login_user_agent'  => $userAgent,
			'login_error_count' 	 => 0,
			'login_disabled_expired' => 0
        ]);
    }

    public function sendVerifyCode(string $account, string $type, $user = null) {
        $service = VerifyCodeService::instance();
        if (!$service->checkType($type)) {
            $this->throwException(['common.request_args_error', 'type'], 'type');
        }
        
        $send_type = $service->getSendType($account);
        if (!$send_type) {
            $this->throwException(['common.request_args_error', 'account'], 'account');
        }
        
        $user = false;
        switch ($send_type) {
            case VERIFY_CODE_SEND_TYPE_SMS:
                $user = $this->getByField('mobile', $account, true);
                break;
            
            case VERIFY_CODE_SEND_TYPE_EMAIL:
                $user = $this->getByField('email', $account, true);
                break;
        }

        if (!$user) {
            $this->throwException('common.user.account_error', 'account');
        }

        //如果是bind操作时，进行校验
        if ($type == VERIFY_CODE_TYPE_BIND) {
            switch ($send_type) {
                case VERIFY_CODE_SEND_TYPE_SMS:
                    //如果已经绑定过，则不允许绑定
                    if (!empty($user->mobile)) {
                        $this->throwException('common.user.bind_mobile_error');
                    }

                    if ($this->checkByField('mobile', $account, true)) {
                        $this->throwException('common.user.mobile_exist', 'account');
                    }
                    break;
                
                case VERIFY_CODE_SEND_TYPE_EMAIL:
                    if (!empty($user->email)) {
                        $this->throwException('common.user.bind_email_error');
                    }

                    if ($this->checkByField('email', $account, true)) {
                        $this->throwException('common.user.email_exist', 'account');
                    }
                    break;
            }
        }

        return $service->create($user->id, $user->name, $account, $send_type, $type);
    }

    public function browse($user, $client, $link, $title, $userAgent) {
        $online = UserOnline::where('user_id', $user->id)
                            ->where('client', $client)
                            ->first();
        if (!$online) {
            $online = new UserOnline();
            $online->site_id    = $user->site_id;
            $online->user_id    = $user->id;
            $online->client     = $client;
            $online->user_name  = $user->name;
        }
        $online->login_time     = $user->login_time;
        $online->login_ip       = $user->login_ip;
        $online->login_country  = $user->login_country;
        $online->login_province = $user->login_province;
        $online->page_link      = $link;
        $online->page_title     = $title;
        $online->view           = $userAgent;
        $online->browse_time    = UTC_TIME;
        $online->save();

        $browse = UserBrowse::where('user_id', $user->id)->first();
        if (!$browse) {
            $browse = new UserBrowse();
            $browse->site_id    = $user->site_id;
            $browse->user_id    = $user->id;
            $browse->user_name  = $user->name;
        }

        $data = $browse->data;

        array_unshift($data, [
            'link'   => $link,
            'title'  => $title,
            'time'   => UTC_TIME,
            'client' => $client
        ]);

        if (count($data) > 10) {
            $data = array_slice($data, 0 , 10);
        }

        $browse->data = $data;
        $browse->save();
    }
}
