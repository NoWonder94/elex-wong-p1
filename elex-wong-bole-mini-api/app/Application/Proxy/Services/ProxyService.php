<?php 
namespace App\Application\Proxy\Services;

use App\Models\Site\Proxy; 
use App\Services\SystemConfigService;
use App\Models\Site\ProxyCommission; 
use DB, Strings, Session, Time, Helper;

class ProxyService extends EloquentService {

    public function login($name, $pwd) {
    	$proxy = Proxy::where('name', $name)->first();
    	if (!$proxy) {
    		$this->throwException('common.proxy.not_exist', 'name');
    	}

    	$pwd = md5(md5($pwd) . $proxy->crypt);
    	if ($proxy->pwd != $pwd) {
            $this->throwException('common.proxy.pwd_error', 'pwd');
        }

        if ($proxy->status == 0) {
            $this->throwException('common.proxy.status_disabled');
        }

        if ($proxy->status == 2) {
            $this->throwException('common.proxy.status_uncheck');
        }
        return $this->formatProxy($proxy, 0, 0);
    }

    /**
     * 获取最新授权信息
     * @param  integer $id     编号
     * @param  string  $pwd    密码
     * @param  integer $roleId 权限组编号
     * @param  integer $time   上次获取时间
     * @return array
     */
    public function auth($id = 0, $pwd = '', $roleId = 0, $time = 0) {
        $proxy = Proxy::where('id', $id)->first();
        if (!$proxy) {
            $this->throwException('common.proxy.not_exist');
        }

        if ($proxy->pwd != $pwd) {
            $this->throwException('common.proxy.pwd_error');
        }

        if ($proxy->status != 1) {
            $this->throwException('common.proxy.status_disabled');
        }

        return $this->formatProxy($proxy, $roleId, $time);
    }

    /**
     * 格式化登陆和授权的返回数据
     * @param  Proxy    $proxy  管理对像
     * @param  integer      $roleId 权限组编号
     * @param  integer      $time   上次获取时间
     * @return array
     */
    protected function formatProxy(Proxy $proxy, $time = 0) {
        $result = [
            'id' => $proxy->id, 
            'name' => $proxy->name,  
            'pwd' => $proxy->pwd, 
            'proxy_code' => $proxy->proxy_code,
            'time' => UTC_TIME,  
            'reset' => false
        ]; 

        if ($time == 0) {
            $proxy->login_ip    = CLIENT_IP;
            $proxy->login_time  = UTC_TIME;
            $proxy->login_count++;
            $proxy->save();
        }  

        return $result;
    } 

    public function save($data, $type) {
        if ($type == 'update') { 
            $proxy = Proxy::find(APP_CURRENT_PROXY_ID);
            $data['id'] = APP_CURRENT_PROXY_ID;
            unset($data['name']);
            if (empty($data['pwd'])){
                unset($data['pwd']);
            } else {
                $proxy_auth = Session::get('proxy_auth'); 
                $data['pwd'] = $proxy_auth['pwd'] = md5(md5($data['pwd']) . $proxy->crypt); 
            } 
            if (empty($data['mobile'])) {
                unset($data['mobile']);
            }
            if (empty($data['email'])) {
                unset($data['email']);
            } 
            $result = parent::save($data, $type);
            if (parent::save($data, $type)) {
                if (!empty($data['pwd'])) {
                    Session::put('proxy_auth', $proxy_auth);
                }
                return true;
            } else {
                return false;
            }
        } else {
            $this->throwException('common.update_error');
        }
    } 

    public function getProxyInfo() {
        $proxy = Proxy::find(APP_CURRENT_PROXY_ID);
        $lastCommissionTime = ProxyCommission::where('proxy_id', APP_CURRENT_PROXY_ID)
                                            ->orderBy('give_time', 'DESC')
                                            ->pluck('give_time');
        $proxy->last_commission_time = isset($lastCommissionTime[0]) ? Time::toDate($lastCommissionTime[0]) : 0;
        return $proxy;
    }

    public function withdraw($pwd) { 
        $proxy = Proxy::find(APP_CURRENT_PROXY_ID);
        //验证代理
        if (!$proxy) {
            $this->throwException('common.proxy.not_exist');
        }
        //验证密码
        $pwd = md5(md5($pwd) . $proxy->crypt);
        if($pwd != $proxy->pwd){
            $this->throwException('common.proxy.old_pwd_error', 'pwd');
        }
        $effectiveNumMin = SystemConfigService::instance()->getByCode('effective_num_min');
        $withdrawMoneyMin = SystemConfigService::instance()->getByCode('withdraw_money_min');
        $effectiveNumMinVal = isset($effectiveNumMin['val']) ? $effectiveNumMin['val'] : 0;
        $withdrawMoneyMinVal = isset($withdrawMoneyMin['val']) ? $withdrawMoneyMin['val'] : 0;
        //查询待审核佣金是否大于
        if ($proxy->commission < $withdrawMoneyMinVal) {
            $this->throwException('common.proxy.commission_low');
        } 

        //查询有效会员数量是否大于3
        if ($proxy->effective_user < $effectiveNumMinVal) {
            $this->throwException('common.proxy.effective_user_low');
        }

        //提款操作
        try {
            DB::connection()->beginTransaction();
            //清空待提现金额
            Proxy::where('id', APP_CURRENT_PROXY_ID)->update(['commission'=>0]);
            $proxyBank = ProxyBankService::instance()->getDefaultBank();
            if (!isset($proxyBank)) {
                $this->throwException('common.proxy.bank_miss');
            }
            $proxyWithdrawInfo = [
                'sn' => Helper::getSn(),
                'proxy_id' => $proxy->id,
                'money' => $proxy->commission,
                'bank_user' => $proxy->real_name,
                'bank_name' => $proxyBank->bank_name,
                'bank_account' => $proxyBank->bank_account, 
                'create_time' => UTC_TIME,
                'create_date' => UTC_DAY,
                'create_hour' => UTC_HOUR,
            ];
            //创建取款
            ProxyWithdrawService::instance()->save($proxyWithdrawInfo, 'create');
            DB::connection()->commit();
        } catch(\Exception $e) {
            DB::connection()->rollback();
            throw $e;
        } 

        return true;
    }

    public function start($name) { 
        $dbInfo = DB::connection(APP_SITE_DOMAIN); 
        //查询会员信息
        $sql = "SELECT * FROM sky_user WHERE name = '".$name."'";
        $user = $dbInfo->select($sql);
        if (empty($user)) {
            $this->throwException('not exits', 'name');
        } else {  
            $mobile = Helper::skyDecry($user[0]->mobile);
            $email = Helper::skyDecry($user[0]->email);
            $proxy = new Proxy();
            $proxy->name = $user[0]->name;
            $proxy->proxy_code = '';
            $proxy->crypt = $user[0]->crypt;
            $proxy->pwd = $user[0]->pwd;
            $proxy->mobile = $mobile;
            $proxy->email = $email; 
            $proxy->qq = $user[0]->qq;
            $proxy->real_name = $user[0]->real_name;
            $proxy->gender = $user[0]->gender;
            $proxy->create_time = UTC_TIME;
            $proxy->create_date = UTC_DAY;
            $proxy->status = 2;
            $proxy->save();
            $proxyCode = 100000000 + $proxy->id;
            $proxyCode = base_convert($proxyCode, 10, 32);
            $proxy->proxy_code = $proxyCode;
            $proxy->save();
        } 
        return true;
    }
}
