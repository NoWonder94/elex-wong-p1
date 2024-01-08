<?php
namespace App\Http\Requests\Agency\AccessKey;

use App\Http\Requests\Request;
use App\Models\Agency\AccessKeyModel;
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
            'org_id' => 'required|integer|min:1',
            'status' => [
                'required',
                Rule::in(AccessKeyModel::getStatusList())
            ]
        ];
    }
}
