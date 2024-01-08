<?php
namespace App\Mappers\App\Game\Mohjong;

use App\Mappers\DataMapper;
use App\Models\App\ConfigOperatorModel;

class ConfigMapper extends DataMapper
{

    public function make()
    {
        // 封顶番数
        $this->offsetSet('bet_max', [
            'type' => $this->bet_max['type'],
            'value' => $this->bet_max['type'] == ConfigOperatorModel::LIMIT_TYPE_NO ? 0 : $this->bet_max['value']
        ]);
        // 抽水方式
        $this->offsetSet('pump', [
            'type' => $this->pump['type'],
            'value' => $this->pump['value']
        ]);
        // IP限制
        $this->offsetSet('ip_limit', $this->ip_limit);
        // 对局设置
        $this->offsetSet('options', [
            // 天地胡
            'TDH' => $this->options['TDH'],
            // 换三张
            'HSZ' => $this->options['HSZ'],
            // 夹心五
            'JXW' => $this->options['JXW'],
            // 门清中章
            'MQZZ' => $this->options['MQZZ'],
            // 幺九将对
            'YJJD' => $this->options['YJJD']
        ]);
        return $this;
    }
}