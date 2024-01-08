<?php

namespace App\Application\Admin\Services;
use App\Application\Admin\Models\Admin;
use Lang, DB;

class AdminService extends \App\Services\AdminService {
	public function getList($name, $status, $page = DEFAULT_PAGE, $pageSize = DEFAULT_PAGE_SIZE) {
		$where = [];
		if ($name) {
			$where[] = ['name', 'LIKE', '%' . $name . '%'];
		}
		
		if ($status != '') {
			$where[] = ['status', '=', $status];
		}

		$list 		= Admin::where($where)->get()->toArray();
		$totalList 	= $this->calulateTotalList($list);
		$list 		= $this->paginateList($list, $page, $pageSize);

		return $this->formatList($list, $totalList, $page, $pageSize);
	}
	public function create($name,$pwd,$confirm_pwd,$status=1){
		$admin = Admin::findByName($name);
		if (!empty($admin)) {
			$this->showError([], Lang::get('lang.91006'));
		}
		if($pwd!=$confirm_pwd){
			$this->showError([], Lang::get('lang.91007'));
		}

		try {
			DB::connection()->beginTransaction();

				$adminModel 			    = new Admin();	
				$adminModel->name 			= $name;
				$adminModel->pwd 			= $this->encryptPwd($pwd);
				$adminModel->crypt 			= null;
				$adminModel->status 		= $status;
				$adminModel->login_time    	= null;
				$adminModel->logout_time    = null;
				$adminModel->create_time    = UTC_CURRENT_TIME;
				$adminModel->update_time    = UTC_CURRENT_TIME;
				$adminModel->save();

			DB::connection()->commit();
			return $adminModel;
		} catch(\Exception $e) {	
			DB::connection()->rollback();
			throw $e;
		}
	}

	public function login($name, $pwd) {
		$admin = Admin::findByName($name);
		if (empty($admin) || !$this->verifyPwd($pwd, $admin['pwd'])) {
			$this->showError([], Lang::get('lang.90008'));
		}

		$admin->login_time = UTC_CURRENT_TIME;
		$admin->save();

		return Admin::formatAdminInfo($admin);
	}

	public function update($id,$name, $oldPwd, $newPwd, $status) {
		$admin = Admin::findById($id);
		if (empty($admin)) {
			$this->showError([], Lang::get('lang.90009'));
		}

		if (isset($name) && !empty($name)) {
			$admin->name = $name;
		}

		if (isset($newPwd) && !empty($newPwd)) {
			if (!$this->verifyPwd($oldPwd, $admin['pwd'])) {
				$this->showError([], Lang::get('lang.90010'));
			}

			$admin->pwd = $this->encryptPwd($newPwd);
		}

		if ($status >= 0 || $status <= 1) {
			$admin->status = $status;
		}

		$admin->update_time = UTC_CURRENT_TIME;
		$admin->save();

		return Admin::formatAdminInfo($admin);
	}

	public function logout($id) {
		$admin = Admin::findById($id, true);
		if (empty($admin)) {
			$this->showError([], Lang::get('lang.90009'));
		}

		$admin->logout_time = UTC_CURRENT_TIME;
		$admin->save();
	}

	public function delete($id) {
		$admin = Admin::findById($id, true);
		if (empty($admin)) {
			$this->showError([], Lang::get('lang.91005'));
		}

		$admin->delete();

		return $admin;
	}
}