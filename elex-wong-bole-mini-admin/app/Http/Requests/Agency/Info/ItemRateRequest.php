<?php
namespace App\Http\Requests\Agency\Info;

use App\Http\Requests\Request;

class ItemRateRequest extends Request
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
            'rate_next' => 'required|numeric|between:0.01,100'
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
            'rate_next' => '抽佣百分比'
        ];
    }
}
