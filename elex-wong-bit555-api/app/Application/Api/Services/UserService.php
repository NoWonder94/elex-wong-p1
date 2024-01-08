<?php

namespace App\Application\Api\Services;
use App\Application\Api\Models\User;
use Lang, DB;

class UserService extends \App\Services\UserService {
    public function reg($email, $pwd, $avatar, $name) {
        return parent::createUser($email, $pwd, $avatar, $name);
    }

    public function login($email, $pwd) {
        $isEmailExist = $this->getEmailRegistered($email);
        $user = User::findByEmail($email);

        if($user['status'] != 1) {
            $this->showError([], Lang::get('lang.91004'));
        }

        if (empty($user) || !$this->verifyPwd($pwd, $user['pwd'])) {
            $this->showError([], Lang::get('lang.80003'));
        }

        $user->login_time = UTC_CURRENT_TIME;
        $user->save();

        return User::formatUserInfo($user);
    }

    public function update($name, $email, $old_pwd, $pwd, $userId) {
        $user = User::findById($userId);
        if (empty($user)) {
            $this->showError([], Lang::get('lang.90009'));
        }
        
        if (isset($pwd) && !empty($pwd)) {
            if (isset($old_pwd) && !empty($old_pwd)) {
                if (!$this->verifyPwd($old_pwd,  $user->pwd)) {
                    $this->showError([], Lang::get('lang.90010'));
                } else {
                    $user->pwd = $this->encryptPwd($pwd);
                }
            } else {
                $this->showError([], Lang::get('lang.91011'));
            }
        }

        DB::connection()->beginTransaction();
        try {
            $user->name               = isset($name) ? $name : $user->name;
            $user->email              = isset($email) ? $email : $user->email;
            $user->update_time        = UTC_CURRENT_TIME;
            $user->save();

            DB::connection()->commit();
            return true;
        } catch(\Exception $e) {
            DB::connection()->rollback();
            throw $e;
        }

        return false;
    }

    public function logout($id) {
        $user = User::findById($id, true);
        if (empty($user)) {
            $this->showError([], Lang::get('lang.90009'));
        }

        $user->logout_time = UTC_CURRENT_TIME;
        $user->save();
    }

    protected function getEmailRegistered($email) {
        return User::where('email', '=', $email)->get()->first();
    }
}