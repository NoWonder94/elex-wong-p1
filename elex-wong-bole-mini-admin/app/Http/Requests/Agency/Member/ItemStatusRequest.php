<?php
namespace App\Http\Requests\Agency\Member;

use App\Http\Requests\Request;
use App\Models\Agency\MemberModel;
use Illuminate\Validation\Rule;

class ItemStatusRequest extends Request
{

    /**
     * 应用于请求的验证规则。
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id' => 'required|integer|min:1',
            'status' => [
                'required',
                Rule::in(MemberModel::getStatusList())
            ]
        ];
    }
}
