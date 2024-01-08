<?php
namespace App\Http\Requests\Order\My;

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
            'type' => '类型',
            'amount' => '金币数量'
        ];
    }
}
