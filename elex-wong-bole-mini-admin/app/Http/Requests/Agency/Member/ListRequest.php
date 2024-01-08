<?php
namespace App\Http\Requests\Agency\Member;

use App\Http\Requests\Request;
use App\Models\Agency\MemberModel;
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
            'org_id' => 'required|integer|min:1',
            'page' => 'nullable|integer|between:1,1000000',
            'page_size' => 'nullable|integer|between:1,100',
            'type' => [
                'nullable',
                Rule::in(MemberModel::getTypeList())
            ],
            'status' => [
                'nullable',
                Rule::in(MemberModel::getStatusList())
            ],
            'order' => [
                'nullable',
                Rule::in(MemberModel::getOrderList())
            ],
            'keyword' => 'nullable|string|max:60'
        ];
    }
}
