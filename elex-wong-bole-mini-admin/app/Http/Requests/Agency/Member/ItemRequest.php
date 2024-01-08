<?php
namespace App\Http\Requests\Agency\Member;

use App\Http\Requests\Request;
use App\Models\Agency\MemberModel;
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
            'id' => 'nullable|integer|min:1',
            'org_id' => 'nullable|required_without:id|integer|min:2',
            'email' => 'nullable|required_without_all:id|email',
            'password' => 'nullable|required_without_all:id|between:6,16',
            'type' => [
                'required',
                Rule::in(MemberModel::getTypeList())
            ],
            'name' => 'required|string|between:2,32',
            'tel' => 'nullable|string|between:2,32',
            'tele' => 'nullable|string|between:2,32'
        ];
    }

    /**
     * 自定义验证规则的错误消息。
     *
     * @return array
     */
    public function messages()
    {
        return [
            'org_id.required_without' => ':attribute 不能为空。',
        ];
    }

    /**
     * 自定义字段名称。
     *
     * @return array
     */
    public function attributes()
    {
        return [
            'org_id' => '代理',
            'type' => '类型',
            'tel' => '联系电话',
            'tele' => '移动电话'
        ];
    }
}
