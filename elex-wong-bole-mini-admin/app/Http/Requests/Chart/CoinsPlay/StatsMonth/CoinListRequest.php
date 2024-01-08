<?php
namespace App\Http\Requests\Chart\CoinsPlay\StatsMonth;

use App\Http\Requests\Request;
use App\Models\Play\StatsMonth\AgencyModel;
use Illuminate\Validation\Rule;

class CoinListRequest extends Request
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
            'datetime' => 'nullable|integer',
            'order' => [
                'nullable',
                Rule::in(AgencyModel::getOrderList())
            ]
        ];
    }
}
