<?php
namespace App\Http\Controllers\Api\User\Auth;

use App\Http\Controllers\Api\Controller;
use Illuminate\Http\Request;
use App\Services\Base\UserService;
use App\Services\Agency\MemberService;
use App\Services\Base\Auth\UserService as AuthUserService;
use App\Services\Base\Auth\MemberService as AuthMemberService;
use App\Services\Base\Auth\PolicyService as AuthPolicyService;
use App\Rules\ReCaptcha;

class IndexController extends Controller
{

    public function signIn(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|between:6,16',
            'token' => [
                //'required',
                //new ReCaptcha()
            ]
        ]);
        
        $email = $request->post('email');
        $password = $request->post('password');
        
        $userService = new UserService();
        // 查询用户数据
        $user = $userService->findUserByEmail($email);
        
        $authUserService = new AuthUserService();
        // 验证用户密码、状态
        $authUserService->verifyUserPassword($user, $password)->verifyUserStatus($user);

        $memberService = new MemberService();
        // 查询代理人数据
        //$member = $memberService->findMemberByUserId($user['id']);
        $member = $memberService->findMemberByUserId(2);

        $authMemberService = new AuthMemberService();
        // 验证代理人状态
        $authMemberService->verifyMemberStatus($member);

        $authPolicyService = new AuthPolicyService();
        // 获取策略、验证权限
        $authPolicyService->selectPolicy($member)->verifyAuth();

        // 同步策略数据到 session
        $authPolicyService->synSessionData($this->auth());
        // 同步策略数据到 cookie
        $authPolicyService->synCookieData($this->auth());

        // 同步代理人数据到 session
        $authMemberService->synSessionData($this->agent(), $member);

        // 更新用户登录时间
        $user['login_last'] = time();
        $authUserService->updateLoginLast($user['id'], $user['login_last']);
        
        // 同步用户数据到 session
        $authUserService->synSessionData($this->identity(), $user);
        // 同步用户数据到 cookie
        $authUserService->synCookieData($this->identity());
        
        return $this->response->getResponse();
    }
}