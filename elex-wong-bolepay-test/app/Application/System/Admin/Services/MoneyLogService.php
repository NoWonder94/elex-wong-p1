<?php
namespace App\Application\System\Admin\Services;

use App\Models\Agent\MoneyLog;
use Time;

class MoneyLogService extends \App\Services\Agent\MoneyLogService {
    protected $model = MoneyLog::class;

    public function lists($data = []) {
        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) {
            $builder->with('agent');

            $agent = isset($data['agent']) ? trim($data['agent']) : '';
            if (!empty($agent)) {
                $builder->where('agent_name', $agent);
            }

            $admin = isset($data['admin']) ? trim($data['admin']) : '';
            if (!empty($admin)) {
                $builder->where('admin_name', $admin);
            }

            if (isset($data['type'])) {
                $builder->whereIn('related_type', $data['type']);
            }

            $begin_time = isset($data['begin_time']) ? Time::toTime(trim($data['begin_time'])) : 0;
            if ($begin_time > 0) {
                $builder->where('create_time', '>=', $begin_time);
            }

            $end_time = isset($data['end_time']) ? Time::toTime(trim($data['end_time'])) : 0;
            if ($end_time > 0) {
                $builder->where('create_time', '<=', $end_time);
            }

            $attributes['statistic'] = ['increase', 'decrease'];
        };

        $this->listFormatOrder = function(&$builder, &$data, &$attributes) {
            $orders = ['increase' => 'desc', 'decrease' => 'desc', 'create_time' => 'desc'];
            if (isset($orders[$attributes['order']])) {
                $builder->orderBy($attributes['order'], $this->getSort($attributes['sort'], $orders[$attributes['order']]));
            }

            if ($attributes['order'] != 'create_time') {
                $builder->orderBy('create_time', 'DESC');
            }
        };

        return parent::lists($data);
    }
}