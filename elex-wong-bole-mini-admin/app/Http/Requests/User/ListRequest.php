<?php
namespace App\Http\Requests\User;

use App\Http\Requests\Request;
use App\Models\Base\UserModel;
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
            'status' => [
                'nullable',
                Rule::in(UserModel::getStatusList())
            ],
            'order' => [
                'nullable',
                Rule::in(UserModel::getOrderList())
            ],
            'keyword' => 'nullable|string|max:60'
        ];
    }
}
