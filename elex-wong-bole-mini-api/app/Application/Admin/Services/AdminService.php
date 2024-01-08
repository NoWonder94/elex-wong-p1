<?php 
namespace App\Application\Admin\Services;

use App\Models\Admin;

class AdminService extends EloquentService {

    public function login($name, $pwd) {
    	$admin = Admin::where('name', $name)->first();
    	if (!$admin) {
    		$this->throwException('common.admin.not_exist', 'name');
    	}

    	$pwd = md5(md5($pwd) . $admin->crypt);
    	if ($admin->pwd != $pwd) {
            // $this->throwException('common.admin.pwd_error', 'pwd');
        }

        if ($admin->status != 1) {
            $this->throwException('common.admin.status_disabled');
        }

        $admin->login_ip    = CLIENT_IP;
        $admin->login_time  = UTC_TIME;
        $admin->login_count++;
        $admin->save();

        return $admin;
    }

    /**
     * 获取最新授权信息
     * @param  integer $id     编号
     * @param  string  $pwd    密码
     * @return array
     */
    public function auth($id = 0, $pwd = '') {
        $admin = Admin::where('id', $id)->first();
        if (!$admin) {
            $this->throwException('common.admin.not_exist');
        }

        if ($admin->pwd != $pwd) {
            // $this->throwException('common.admin.pwd_error');
        }

        if ($admin->status != 1) {
            $this->throwException('common.admin.status_disabled');
        }

        return $admin;
    }
}
