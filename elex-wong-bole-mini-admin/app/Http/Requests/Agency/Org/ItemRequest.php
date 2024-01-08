<?php
namespace App\Http\Requests\Agency\Org;

use App\Http\Requests\Request;

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
            'parent_id' => 'nullable|required_without:id|integer|min:1',
            'sort' => 'nullable|required_with:id|integer|min:1',
            'name' => 'required|string|between:2,16'
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
            'parent_id.required_without' => ':attribute 不能为空。',
            'sort.required_with' => ':attribute 不能为空。'
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
            'sort' => '排序'
        ];
    }
}
