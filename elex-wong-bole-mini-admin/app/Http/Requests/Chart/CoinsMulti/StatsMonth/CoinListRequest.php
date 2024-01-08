<?php
namespace App\Http\Requests\Chart\CoinsMulti\StatsMonth;

use App\Http\Requests\Request;
use App\Models\Multi\StatsMonth\AgencyModel;
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
