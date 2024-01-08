<?php
namespace App\Http\Requests\Log\Member\Signin;

use App\Http\Requests\Request;
use App\Models\Log\Member\SigninModel;
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
            'datetime' => 'nullable|array',
            'datetime.0' => 'nullable|required_with:datetime|integer',
            'datetime.1' => 'nullable|required_with:datetime|integer',
            'type' => [
                'nullable',
                Rule::in(SigninModel::getTypeList())
            ],
            'keyword' => 'nullable|string|max:60',
            'order' => [
                'nullable',
                Rule::in(SigninModel::getOrderList())
            ]
        ];
    }
}
