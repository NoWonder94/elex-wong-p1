<?php

namespace App\Application\Admin\Services;
use App\Application\Admin\Models\User;
use DB, Config, Lang;

class UserService extends \App\Services\UserService {
    public function getList($email, $status) {
		$where = [];
		if ($email) {
			$where[] = ['email', 'LIKE', '%' . $email . '%'];
		}

		if ($status != '') {
			$where[] = ['status', '=', $status];
		}

		$list 		= User::where($where)->get()->toArray();
        return $list;
	}

    public function getDetail($id) {
		$detail = User::findById($id);
        if (empty($detail)) {
			$this->showError([], Lang::get('lang.91003'));
        }

		return User::formatUserInfo($detail);
	}
    public function create($avatar, $name, $pwd, $email, $status) {

        parent::createUser($email, $pwd, $avatar, $name, $status);
    }

    public function update($id, $avatar, $name, $oldpwd, $newpwd, $email, $status) {
        $user = User::findById($id);

        if(empty($user)){
            $this->showError([], Lang::get('lang.90012'));
        }

        try{
            if(isset($avatar)&&!empty($avatar)) {
                $user ->avatar = $avatar;
            }

            if (isset($newpwd) && !empty($newpwd)) {
                if (!$this->verifyPwd($oldpwd, $user['pwd'])) {
                    $this->showError([], Lang::get('lang.90010'));
                }

                $user->pwd = $this->encryptPwd($newpwd);
            }

            DB::connection()->beginTransaction();
            $user->name = isset($name) ? $name : $user->name;
            $user->email = isset($email) ? $email : $user->email;
            $user->status = isset($status) ? $status : $user->status;
            $user->save();
            DB::connection()->commit();

            return User::formatUserInfo($user);

        }catch(\Exception $e){
            DB::connection()->rollback();
            throw $e;
        }
    }

    public function delete($id){
        $userModel = User::findById($id,true);
        if (empty($userModel)) {
			$this->showError([], Lang::get('lang.91003'));
		}

		$userModel->delete();

		return $userModel;
    }

    public function getEmailRegistered($email) {
        return User::where('email', '=', $email)->get()->first();
    }
}
