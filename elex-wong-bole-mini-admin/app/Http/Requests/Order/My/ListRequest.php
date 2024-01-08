<?php
namespace App\Http\Requests\Order\My;

use App\Http\Requests\Request;
use App\Models\Coin\Order\AgencyModel as OrderAgencyModel;
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
            'source' => [
                'nullable',
                Rule::in(OrderAgencyModel::getSourceList())
            ],
            'type' => [
                'nullable',
                Rule::in(OrderAgencyModel::getTypeList())
            ],
            'status' => [
                'nullable',
                Rule::in(OrderAgencyModel::getStatusList())
            ],
            'order' => [
                'nullable',
                Rule::in(OrderAgencyModel::getOrderList())
            ],
            'keyword' => 'nullable|string|max:60'
        ];
    }
}
