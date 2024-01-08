<?php
namespace App\Http\Requests\Order\Agency;

use App\Http\Requests\Request;
use App\Models\Coin\Order\AgencyModel as OrderAgencyModel;
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
            'org_id' => 'required|integer|min:1',
            'type' => [
                'required',
                Rule::in(OrderAgencyModel::getTypeList())
            ],
            'amount' => 'required|numeric|between:0.01,100000000'
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
            'amount' => '金币数量'
        ];
    }
}
