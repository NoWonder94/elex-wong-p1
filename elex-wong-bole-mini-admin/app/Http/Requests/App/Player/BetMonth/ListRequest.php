<?php
namespace App\Http\Requests\App\Player\BetMonth;

use App\Http\Requests\Request;
use App\Models\AppLog\Player\BetMonthModel;
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
            'datetime' => 'nullable|integer',
            'scene_id' => 'nullable|integer|min:1',
            'game_id' => 'nullable|integer|min:1',
            'keyword' => 'nullable|string|max:60',
            'order' => [
                'nullable',
                Rule::in(BetMonthModel::getOrderList())
            ]
        ];
    }
}
