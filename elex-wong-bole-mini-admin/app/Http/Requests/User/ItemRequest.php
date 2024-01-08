<?php
namespace App\Http\Requests\User;

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
            'email' => 'required|email',
            'nickname' => 'nullable|string|between:2,16',
            'password' => 'nullable|required_without:id|between:6,16'
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
            'password.required_without' => ':attribute 不能为空。'
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
            'nickname' => '昵称'
        ];
    }
}
