<?php
namespace App\Http\Requests\Order\Game;

use App\Http\Requests\Request;
use App\Models\Coin\Order\GameModel as OrderGameModel;
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
            'type' => [
                'nullable',
                Rule::in(OrderGameModel::getTypeList())
            ],
            'status' => [
                'nullable',
                Rule::in(OrderGameModel::getStatusList())
            ],
            'order' => [
                'nullable',
                Rule::in(OrderGameModel::getOrderList())
            ],
            'keyword' => 'nullable|string|max:60'
        ];
    }
}
