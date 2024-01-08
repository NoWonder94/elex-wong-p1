<?php

namespace App\Application\Api\Controllers;
use App\Application\Api\Services\UserService;
use Request;

class SystemController extends BaseController {
    public function reg() {
        $rules          = [
            'email'     => 'required|email',
            'pwd'       => 'required|min:6',
            'avatar'    => 'nullable',
            'name'      => 'nullable'
        ];
        $this->validate($rules);

        $result = UserService::instance()->reg(
            Request::post('email'),
            Request::post('pwd'),
            Request::post('avatar'),
            Request::post('name')
        );

        $this->refreshToken($result);

        $this->success($result);
    }

    public function login() {
        $rules      = [
            'email' => 'required|email',
            'pwd'   => 'required|min:6'
        ];
        $this->validate($rules);

        $result = UserService::instance()->login(
            Request::post('email'),
            Request::post('pwd')
        );

        $this->refreshToken($result);

        $this->success($result);
    }
}