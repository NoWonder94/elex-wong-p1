<?php
namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\Controller;
use Illuminate\Http\Request;
use App\Models\Agency\Auth\PolicyModel;

class PolicyController extends Controller
{

    /**
     * 获取权限组列表
     */
    public function getList(Request $request)
    {
        $data = PolicyModel::selectAll()->all();
        
        return $this->response->setResponseData($data)->getResponse();
    }
}