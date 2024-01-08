<?php
namespace App\Http\Controllers\App\Cq9;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cookie;
use App\Exceptions\Response\Cq9\Cq9Exception;
use App\Exceptions\Response\Cq9\Cq9Code;
use App\Services\Postman\Cq9Service as PostmanCq9Service;
use App\Core\Response\ResponseSuccess;
use App\Core\Entity\Session\Cq9Entity;

class Controller extends BaseController
{
    use ValidatesRequests;

    /**
     * 用户实体
     *
     * @var \App\Core\Entity\Session\Cq9Entity
     */
    private $cq9;

    public $response;

    /**
     * 获取CQ9实体
     *
     * @return \App\Core\Entity\Session\Cq9Entity
     */
    public function cq9()
    {
        if (! $this->cq9) {
            $this->cq9 = resolve(\App\Core\Entity\Session\Cq9Entity::class);
        }
        return $this->cq9;
    }

    public function __construct(Request $request)
    {
//         // 国际化语言切换
//         if ($request->route()->getActionMethod() == 'index') {
//             $lang = $request->query('language', 'en');
//         } else {
//             $lang = Cookie::get('lang', 'en');
//         }
//         // 设置语言
//         if ($lang == 'zh-cn') {
//             App::setLocale('zh-CN');
//         } else {
//             App::setLocale('en');
//         }
        
        // 获取 Token
        if (! ($token = $request->input('token') ?: $request->header('token'))) {
            throw new Cq9Exception(Cq9Code::HTTP_UNAUTHORIZED);
        }
        
        if ($request->route()->getActionMethod() == 'index') {
            // 解析token数据，并保存到 session
            $this->cq9()
                ->setParam(PostmanCq9Service::getAuxDetailByToken($token))
                ->save();
        } else {
            // 实例化 Response
            $this->response = new ResponseSuccess();
        }
    }
}
