<?php 
namespace App\Application\Admin\Services;

use App\Models\Site;
use App\Models\SiteAdminRole;
use App\Application\Admin\Models\SiteAdmin;
use Strings;

class SiteService extends EloquentService {
	public function create($data) {
		$data['app_id'] = md5(Strings::randString(22) . UTC_TIME);
		$data['app_secret'] = md5(Strings::randString(22) . UTC_TIME);
		$data['create_time'] = UTC_TIME;
		
		$this->saveExtend = function($primary_val, &$data, &$attributes){
			$role = new SiteAdminRole;
			$role->site_id = $primary_val;
			$role->name = '超级管理员';
			$role->is_super = 1;
			$role->update_time = UTC_TIME;
			$role->save();
			
			$admin = new SiteAdmin;
			$admin->site_id = $primary_val;
			$admin->role_id = $role->id;
			$admin->name = 'admin';
			$admin->crypt = Strings::randString(6);
			$admin->pwd = md5(md5('123456') . $admin->crypt);
			$admin->is_system = 1;
			$admin->create_time = UTC_TIME;
			$admin->save();
		};
		
		return parent::create($data);
    }

    public function update($data) {
    	if (isset($data['reset_app_id']) && $data['reset_app_id'] == 1) {
			$data['app_id'] = md5(Strings::randString(22) . UTC_TIME);
		}

		if (isset($data['reset_app_secret']) && $data['reset_app_secret'] == 1) {
			$data['app_secret'] = md5(Strings::randString(22) . UTC_TIME);
		}

		unset($data['reset_app_id'], $data['reset_app_secret']);
        return parent::update($data);
    }
}