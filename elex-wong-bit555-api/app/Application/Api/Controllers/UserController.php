<?php

namespace App\Application\Api\Controllers;
use App\Application\Api\Services\UserService;
use Request;

class UserController extends AuthController {
    public function getDetail() {
        $this->success($this->info);
    }

    public function update() {
        $rules          = [
            'name'      => 'nullable',
            'email'     => 'required|email',
            'old_pwd'   => 'nullable|min:6',
            'pwd'       => 'nullable|min:6',
        ];
        $this->validate($rules);

        $result = UserService::instance()->update(
            Request::post('name'),
            Request::post('email'),
            Request::post('old_pwd'),
            Request::post('pwd'),
            $this->info['id']
        );

        $this->success($result);
    }

    public function logout() {
        UserService::instance()->logout(
            $this->info['id']
        );

        $this->success();
    }
}