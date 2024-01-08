<?php
namespace App\Http\Requests\Order\Record;

use App\Http\Requests\Request;
use App\Models\Coin\AgencyRecordModel as CoinAgencyRecordModel;
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
            'order_classify' => [
                'nullable',
                Rule::in(CoinAgencyRecordModel::getOrderClassifyList())
            ],
            'type' => [
                'nullable',
                Rule::in(CoinAgencyRecordModel::getTypeList())
            ],
            'order' => [
                'nullable',
                Rule::in(CoinAgencyRecordModel::getOrderList())
            ]
        ];
    }
}
