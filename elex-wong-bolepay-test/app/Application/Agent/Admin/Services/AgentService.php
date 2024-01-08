<?php 
namespace App\Application\Agent\Admin\Services;

use App\Models\System\Agent;
use PragmaRX\Google2FA\Google2FA;
use Validator, Lang, Strings;

class AgentService extends \App\Services\System\AgentService {
    protected $model = Agent::class;

    public function login($name, $pwd, $code) {
        $admin = Agent::where('name', $name)->first();
        if (!$admin) {
            $this->throwException('common.admin.not_exist', 'name');
        }

        if (!IS_DEV_MODE && $admin->secret) {
            $ga = new Google2FA();
            if (!$ga->verifyKey($admin->secret, $code, 2)) {
                $this->throwException('common.verify_google_error', 'code');
            }
        }

        $pwd = md5(md5($pwd) . $admin->crypt);
        if ($admin->pwd != $pwd) {
            $this->throwException('common.admin.pwd_error', 'pwd');
        }

        if ($admin->status != 1) {
            $this->throwException('common.admin.status_disabled');
        }
        return $this->formatAdmin($admin, 0);
    }

    /**
     * 获取最新授权信息
     * @param  integer $id     编号
     * @param  string  $pwd    密码
     * @param  integer $roleId 权限组编号
     * @param  integer $time   上次获取时间
     * @return array
     */
    public function auth($id = 0, $pwd = '', $time = 0) {
        $admin = Agent::where('id', $id)->first();
        if (!$admin) {
            $this->throwException('common.admin.not_exist');
        }

        if ($admin->pwd != $pwd) {
            $this->throwException('common.admin.pwd_error');
        }

        if ($admin->status != 1) {
            $this->throwException('common.admin.status_disabled');
        }

        return [
            'auth'  => $this->formatAdmin($admin, $time),
            'admin' => $admin
        ];
    }

    /**
     * 格式化登陆和授权的返回数据
     * @param  Agent    $admin  管理对像
     * @param  integer      $roleId 权限组编号
     * @param  integer      $time   上次获取时间
     * @return array
     */
    protected function formatAdmin(Agent $admin, $time = 0) {
        $result = [
            'id'       => $admin->id,
            'name'     => $admin->name,
            'pwd'      => $admin->pwd,
            'secret'   => $admin->secret,
            'time'     => UTC_TIME,
            'is_super' => true,
            'reset'    => false
        ];

        if ($time == 0) {
            $admin->login_ip   = CLIENT_IP;
            $admin->login_time = UTC_TIME;
            $admin->login_count++;
            $admin->save();
        }
        return $result;
    }

    public function updateSecret($id, $secret) {
        return Agent::where('id', $id)->update(['secret' => $secret]);
    }

    public function save($data, $type) {
        $rules = [
            'pwd'  => ['required', 'min:6', 'max:32', 'regex:/^[a-zA-Z0-9_]+$/'],
            'mobile'	=> ['required', 'regex:/^1\d{10}$/'],
            'email'		=> ['required', 'email'],
        ];

        if(empty($data['pwd'])) {
            unset($data['pwd']);
            unset($rules['pwd']);
        }

        $validator = Validator::make($data, $rules, Lang::get('admin.agent.validators'));
        $this->checkValidator($validator);

        $allow_fields = ['email' => '', 'mobile' => '', 'qq' => ''];

        if(!empty($data['pwd'])) {
            $data['crypt']  = Strings::randString(6);
            $data['pwd']    = md5(md5($data['pwd']) . $data['crypt']);

            $allow_fields['crypt'] = '';
            $allow_fields['pwd']   = '';
        }

        $data = array_intersect_key($data, $allow_fields);

        return Agent::where('id', APP_CURRENT_AGENT_ID)->update($data);
    }

    public function updateIps($data) {
        $this->formatIps($data);

        return Agent::where('id', APP_CURRENT_AGENT_ID)->update([
            'admin_ips' => $data['admin_ips'],
            'api_ips' => $data['api_ips'],
        ]);
    }
}
