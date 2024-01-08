<?php
namespace App\Http\Requests\App\Game\Mahjong\Config;

use App\Http\Requests\Request;
use App\Models\App\ConfigOperatorModel;
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
            'scene_id' => [
                'required',
                Rule::in(ConfigOperatorModel::getSceneIdList())
            ],
            'bet_max.type' => [
                'required',
                Rule::in(ConfigOperatorModel::getLimitTypeList())
            ],
            'bet_max.value' => [
                'nullable',
                'required_if:bet_max.type,' . ConfigOperatorModel::LIMIT_TYPE_CUSTOM,
                'integer',
                function ($attribute, $value, $fail) {
                    if ($this->input('bet_max.type') == ConfigOperatorModel::LIMIT_TYPE_CUSTOM) {
                        if ($value < 1 || $value > 100000000) {
                            return $fail(' 封顶番数 必须介于 1 - 100000000 之间。');
                        }
                    }
                }
            ],
            'pump.type' => [
                'required',
                Rule::in(ConfigOperatorModel::getPumpList())
            ],
            'pump.value' => [
                'required',
                'numeric',
                function ($attribute, $value, $fail) {
                    switch ($this->input('pump.type')) {
                        case ConfigOperatorModel::PUMP_END:
                            if ($value < 0.01 || $value > 100) {
                                return $fail(' 抽水百分比 必须介于 0.01 - 100 之间。');
                            }
                            break;
                        case ConfigOperatorModel::PUMP_PERCENT:
                            if ($value < 0.01 || $value > 100) {
                                return $fail(' 抽水百分比 必须介于 0.01 - 100 之间。');
                            }
                            break;
                        case ConfigOperatorModel::PUMP_FIXED:
                            if (strpos($value, '.') !== false) {
                                return $fail(' 抽水金币 必须是整数。');
                            } elseif ($value < 1 || $value > 100000000) {
                                return $fail(' 抽水金币 必须介于 1 - 100000000 之间。');
                            }
                            break;
                    }
                }
            ],
            'ip_limit' => [
                'required',
                Rule::in(ConfigOperatorModel::getSwitchList())
            ],
            'options.TDH' => [
                'required',
                Rule::in(ConfigOperatorModel::getSwitchList())
            ],
            'options.HSZ' => [
                'required',
                Rule::in(ConfigOperatorModel::getSwitchList())
            ],
            'options.JXW' => [
                'required',
                Rule::in(ConfigOperatorModel::getSwitchList())
            ],
            'options.MQZZ' => [
                'required',
                Rule::in(ConfigOperatorModel::getSwitchList())
            ],
            'options.YJJD' => [
                'required',
                Rule::in(ConfigOperatorModel::getSwitchList())
            ]
        ];
    }

    /**
     * 自定义验证规则的错误消息。
     *
     * @return array
     */
    public function messages()
    {
        return [
            'bet_max.value.required_if' => ' 封顶番数 不能为空。'
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
            'bet_max.value' => '封顶番数',
            'pump.value' => '抽水'
        ];
    }
}
