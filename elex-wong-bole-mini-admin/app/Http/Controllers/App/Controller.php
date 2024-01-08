<?php
namespace App\Http\Controllers\App;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use App\Models\Agency\OpenTokenModel;
use App\Core\Response\ResponseSuccess;

class Controller extends BaseController
{
    use ValidatesRequests;

    public $orgId;

    public $response;

    public function __construct(Request $request)
    {
        // 获取 Token
        $token = $request->input('token') ?: $request->header('token');
        // 验证 Token 并获取代理ID
        if (! $token || ! ($this->orgId = OpenTokenModel::getOrgIdAndVerifyToken($token))) {
            abort(401);
        }
        $this->response = new ResponseSuccess();
    }
}
