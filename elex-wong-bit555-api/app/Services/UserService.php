<?php

namespace App\Services;
use App\Models\User;
use Lang, DB;

class UserService extends BaseService {
    public function createUser($email, $pwd, $avatar = "", $name = "", $status = 1) {
         $isEmailRegistered = $this->getEmailRegistered($email);
        if ($isEmailRegistered) {
            $this->showError([], Lang::get('lang.80001'));
        }

        try {
            DB::connection()->beginTransaction();

            $userModel                  = new User();
            $userModel->avatar          = $this->formatImg($avatar);
            $userModel->name            = $name;
            $userModel->pwd             = $this->encryptPwd($pwd);
            $userModel->email           = $email;
            $userModel->status          = $status;
            $userModel->login_time      = UTC_CURRENT_TIME;
            $userModel->logout_time     = null;
            $userModel->create_time     = UTC_CURRENT_TIME;
            $userModel->update_time     = UTC_CURRENT_TIME;
            $userModel->save();

            DB::connection()->commit();

            return $userModel;
        } catch (\Exception $e) {
            DB::connection()->rollback();
            throw $e;
        }
    }

    protected function getEmailRegistered($email) {
        return User::where('email', '=', $email)->get()->first();
    }
}