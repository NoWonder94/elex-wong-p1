<?php
namespace App\Http\Requests\Chart\CoinsMulti\Stats;

use App\Http\Requests\Request;
use App\Models\Multi\Stats\AgencyGameModel;
use Illuminate\Validation\Rule;

class GameListRequest extends Request
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
            'order' => [
                'nullable',
                Rule::in(AgencyGameModel::getOrderList())
            ],
            'game_id' => 'nullable|integer|min:1'
        ];
    }
}
