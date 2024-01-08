<?php
namespace App\Http\Controllers\Api\User\Home;

use App\Http\Controllers\Api\Controller;
use Illuminate\Http\Request;
use App\Models\Base\UserModel;
use App\Services\Base\UserService;
use App\Services\Base\Auth\UserService as AuthUserService;

class IndexController extends Controller
{

    /**
     * 获取编辑数据
     *
     * @param int $id            
     */
    public function getItem()
    {
        $id = $this->identity()->getUserId();
        
        $data = UserModel::findById($id, ['email', 'nickname'])->shift();
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 更新用户数据
     *
     * @param int $id            
     * @param \Illuminate\Http\Request $request            
     */
    public function update(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'nickname' => 'nullable|string|between:2,16'
        ]);
        
        $id = $this->identity()->getUserId();
        
        $data['email'] = $email = $request->post('email');
        $data['nickname'] = $request->post('nickname', null);
        
        $authUserService = new AuthUserService();
        // 验证邮箱是否已存在
        $authUserService->verifyUserExistedByEmail($email, $id);
        // 更新用户数据
        $authUserService->update($id, $data);
        
        return $this->response->getResponse();
    }
    
    /**
     * 更新用户密码
     *
     * @param int $id
     * @param \Illuminate\Http\Request $request
     */
    public function updatePassword(Request $request)
    {
        $this->validate($request, [
            'password_current' => 'required|between:6,16',
            'password' => 'required|between:6,16|confirmed',
            'password_confirmation' => 'required|between:6,16'
        ], [], [
            'password_current' => '当前密码'
        ]);
        
        $id = $this->identity()->getUserId();
        
        $passwordCurrent = $request->post('password_current');
        $password = $request->post('password');
        
        // 查询用户数据
        $userService = new UserService();
        $user = $userService->findUserById($id);
        
        $authUserService = new AuthUserService();
        // 验证用户密码
        $authUserService->verifyUserPassword($user, $passwordCurrent);
        // 更新用户密码
        $authUserService->updatePassword($id, $password);
        
        return $this->response->getResponse();
    }
}