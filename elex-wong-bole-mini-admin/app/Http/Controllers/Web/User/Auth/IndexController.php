<?php
namespace App\Http\Controllers\Web\User\Auth;

use App\Http\Controllers\Web\Controller;
use Illuminate\Http\Request;
use App\Services\Base\Auth\UserService as AuthUserService;
use App\Services\Base\Auth\MemberService as AuthMemberService;
use App\Services\Base\Auth\PolicyService as AuthPolicyService;

class IndexController extends Controller
{

    public function signIn(Request $request)
    {
        // 缓存 redirect 页面
        $redirect_uri = $request->query('redirect_uri');
        if ($redirect_uri) {
            $redirect_uri = $this->identity()->getRedirectUri();
        }
        $this->identity()
            ->setRedirectUri($redirect_uri)
            ->save();
        
        return view('user.login');
    }

    public function signOut()
    {
        // 用户数据
        $authUserService = new AuthUserService();
        // 同步数据到 session
        $authUserService->synSessionData($this->identity(), []);
        // 同步数据到 cookie
        $authUserService->synCookieData($this->identity());

        // 代理人数据
        $authMemberService = new AuthMemberService();
        // 同步数据到 session
        $authMemberService->synSessionData($this->agent(), []);

        // 授权数据
        $authPolicyService = new AuthPolicyService();
        // 同步数据到 session
        $authPolicyService->synSessionData($this->auth());
        // 同步数据到 cookie
        $authPolicyService->synCookieData($this->auth());
        
        // redirect 页面跳转
        return redirect($this->identity()->getSignInUri());
    }
}