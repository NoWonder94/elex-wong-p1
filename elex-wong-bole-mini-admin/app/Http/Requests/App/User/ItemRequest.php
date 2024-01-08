<?php
namespace App\Http\Requests\App\User;

use App\Http\Requests\Request;
use App\Models\App\UserModel;
use Illuminate\Validation\Rule;

class ItemRequest extends Request
{

    /**
     * 应用于请求的验证规则。
     *
     * @return array
     */
    public function rules()
    {
        return [
            'operator_id' => 'required|integer',
            'account_id' => 'required|string',
            'role' => [
                'required',
                Rule::in(UserModel::getRoleList())
            ],
            'access' => [
                'required',
                Rule::in(UserModel::getAccessList())
            ]
        ];
    }
}
