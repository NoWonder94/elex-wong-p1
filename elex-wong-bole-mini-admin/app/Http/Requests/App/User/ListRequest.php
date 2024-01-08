<?php
namespace App\Http\Requests\App\User;

use App\Http\Requests\Request;
use App\Models\App\UserModel;
use Illuminate\Validation\Rule;

class ListRequest extends Request
{

    /**
     * 应用于请求的验证规则。
     *
     * @return array
     */
    public function rules()
    {
        return [
            'page' => 'nullable|integer|between:1,1000000',
            'page_size' => 'nullable|integer|between:1,100',
            'create_time' => 'nullable|array',
            'create_time.0' => 'nullable|required_with:create_time|integer',
            'create_time.1' => 'nullable|required_with:create_time|integer',
            'login_time' => 'nullable|array',
            'login_time.0' => 'nullable|required_with:login_time|integer',
            'login_time.1' => 'nullable|required_with:login_time|integer',
            'order' => [
                'nullable',
                Rule::in(UserModel::getOrderList())
            ],
            'role' => [
                'nullable',
                Rule::in(UserModel::getRoleList())
            ],
            'access' => [
                'nullable',
                Rule::in(UserModel::getAccessList())
            ],
            'keyword' => 'nullable|string|max:60'
        ];
    }
}
