<?php 
namespace App\Application\Www\Services;

use App\Application\Www\Models\SiteAdmin;
use App\Application\Www\Models\SiteAdminRole;
use App\Application\Www\Models\SiteAdminRoleAccess;
use DB, Strings;

class SiteAdminService extends EloquentService {

    public function login($name, $pwd) {
    	$admin = SiteAdmin::where('name', $name)->first();
    	if (!$admin) {
    		$this->throwException('common.admin.not_exist', 'name');
    	}

    	$pwd = md5(md5($pwd) . $admin->crypt);
    	if ($admin->pwd != $pwd) {
            $this->throwException('common.admin.pwd_error', 'pwd');
        }

        if ($admin->status != 1) {
            $this->throwException('common.admin.status_disabled');
        }
        return $this->formatAdmin($admin, 0, 0);
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
        $admin = SiteAdmin::where('id', $id)->first();
        if (!$admin) {
            $this->throwException('common.admin.not_exist');
        }

        if ($admin->pwd != $pwd) {
            $this->throwException('common.admin.pwd_error');
        }

        if ($admin->status != 1) {
            $this->throwException('common.admin.status_disabled');
        }

        return $this->formatAdmin($admin, $roleId, $time);
    }

    /**
     * 格式化登陆和授权的返回数据
     * @param  Admin    $admin  管理对像
     * @param  integer      $roleId 权限组编号
     * @param  integer      $time   上次获取时间
     * @return array
     */
    protected function formatAdmin(SiteAdmin $admin, $roleId = 0, $time = 0) {
        $result = [
            'id' => $admin->id, 
            'name' => $admin->name, 
            'role_id' => $admin->role_id, 
            'pwd' => $admin->pwd, 
            'time' => UTC_TIME, 
            'is_super' => false, 
            'reset' => false
        ];

        $adminRole = SiteAdminRole::where('id', $admin->role_id)->first();
        if (!$adminRole) {
            $this->throwException('common.admin.role_not_exist');
        }

        if ($adminRole->status != 1) {
            $this->throwException('common.admin.role_status_disabled');
        }

        if ($time == 0) {
            $admin->login_ip    = CLIENT_IP;
            $admin->login_time  = UTC_TIME;
            $admin->login_count++;
            $admin->save();
        }

        $result['time']     = $adminRole->update_time;
        $result['is_super'] = $adminRole->is_super == 1;

        //如果权限组有改变
        if ($adminRole->id != $roleId 
            || ($adminRole->is_super == 0 
                && $adminRole->update_time != $time)) {
            
            $result['reset'] = true;
            if ($adminRole->is_super == 0) {
                $result['access'] = SiteAdminRoleAccess::where('role_id', $adminRole->id)->get()->toArray();
            }
        }

        return $result;
    }

    public function save($data, $type) {
        $this->saveFormatData = function(&$model, &$data, &$attributes) use ($type) {
            unset($data['is_system']);
            if ($type == 'update') {
                if ($model->is_system == 1) {
                    unset($data['role_id']);
                } 

                if(!empty($data['pwd'])) {
                    $data['crypt']  = Strings::randString(6);
                    $data['pwd']    = md5(md5($data['pwd']) . $data['crypt']);
                } else {
                    unset($data['pwd']);
                }
                unset($data['name']);
            } else {
                if ( empty($data['name'])) {
                    $this->throwException('common.admin.name_required', 'name');
                }

                if ( empty($data['pwd'])) {
                    $this->throwException('common.admin.pwd_required', 'pwd');
                }

                if ($data['role_id'] < 1) {
                    $this->throwException('common.admin.role_not_exist', 'role_id');
                }
                $adminRole = SiteAdminRole::find($data['role_id']);
                if (!$adminRole) {
                    $this->throwException('common.admin.role_not_exist', 'role_id');
                }

                $data['crypt']  = Strings::randString(6);
                $data['pwd']    = md5(md5($data['pwd']) . $data['crypt']);
                $data['create_time'] = UTC_TIME;
            }
        };
        return parent::save($data, $type);
    }

    public function delete($key, $data = []) {
        $this->deleteFormatBuilder = function(&$builder, &$key, &$data) {
                $builder->where('id', $key)->where('is_system', 0);
            };
        return parent::delete($key, $data);
    }

    public function toggle($data) {
        $this->toggleFormatBuilder = function(&$builder, &$attributes, $primary_key) {
                $builder->where('id', $attributes['id'])->where('is_system', 0);
            };
        return parent::toggle($data);
    }

    public function changePwd($id , $oldPwd, $newPwd){
        $admin = SiteAdmin::find($id);
        if (!$admin) {
            $this->throwException('common.admin.not_exist');
        }

        $oldPwd = md5(md5($oldPwd) . $admin->crypt);
        if($oldPwd != $admin->pwd){
            $this->throwException('common.admin.old_pwd_error', 'old_pwd');
        }

        $newPwd = md5(md5($newPwd) . $admin->crypt); 
        SiteAdmin::where('id', $admin->id)
            ->update([
                'pwd' => $newPwd, 
            ]);
    }
}
