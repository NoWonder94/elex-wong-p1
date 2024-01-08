<?php
namespace App\Http\Requests\Chart\CoinsSlot\StatsMonth;

use App\Http\Requests\Request;
use App\Models\Slot\StatsMonth\AgencyGameModel;
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
            'datetime' => 'nullable|integer',
            'order' => [
                'nullable',
                Rule::in(AgencyGameModel::getOrderList())
            ],
            'game_id' => 'nullable|integer|min:1'
        ];
    }
}
