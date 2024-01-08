<?php
namespace App\Application\System\Admin\Services;

use App\Models\System\Statistic;
use App\Models\System\PaymentStatistic;
use App\Models\System\PlatformStatistic;
use Time, Lang;

class StatisticService extends \App\Services\System\StatisticService {

    public function info() {
        $today_time = UTC_DAY;
        $yesterday_time = UTC_DAY - 86400;

        $data = [
            'today' => null,
            'yesterday' => null,
        ];

        $list = Statistic::whereIn('day', [$yesterday_time, $today_time])->get();
        foreach ($list as $item) {
            if ($item->day == $today_time) {
                $data['today'] = $item;
            } else {
                $data['yesterday'] = $item;
            }
        }
        return $data;
    }

    public function chart() {
        $begin_time = UTC_DAY - 86400 * 6;
        $end_time   = UTC_DAY;

        $fee_chart = [
            'columns' => [
                ['收入'],
                ['支付金额'],
                ['有效订单数'],
                ['代付金额'],
                ['代付笔数']
            ],
            'categories' => []
        ];

        $payment_chart = [
            'columns' => [],
            'categories' => []
        ];

        $fee_list = Statistic::where('day', '>=', $begin_time)
            ->where('day', '<=', $end_time)
            ->orderBy('day', 'ASC')
            ->get()
            ->getKeyList('day');


        $default_column = [];

        for ($time = $begin_time; $time <= $end_time; $time += 86400) {
            if (isset($fee_list[$time])) {
                $data = $fee_list[$time];
                $fee_chart['columns'][0][] = $data->fee_income;
                $fee_chart['columns'][1][] = $data->pay_money;
                $fee_chart['columns'][2][] = $data->pay_num;
                $fee_chart['columns'][3][] = $data->withdraw_money;
                $fee_chart['columns'][4][] = $data->withdraw_num;
            } else {
                $fee_chart['columns'][0][] = 0;
                $fee_chart['columns'][1][] = 0;
                $fee_chart['columns'][2][] = 0;
                $fee_chart['columns'][3][] = 0;
                $fee_chart['columns'][4][] = 0;
            }

            $fee_chart['categories'][] = Time::toDate($time, 'Y-m-d');
            $payment_chart['categories'][] = Time::toDate($time, 'Y-m-d');
            $default_column[$time]  = 0;
        }

        $payment_list = PaymentStatistic::where('day', '>=', $begin_time)
            ->where('day', '<=', $end_time)
            ->orderBy('day', 'ASC')
            ->get();

        $channels = [];
        foreach ($payment_list as $item) {
            if (!isset($channels[$item->channel])) {
                $channels[$item->channel] = $default_column;
            }
            $channels[$item->channel][$item->day] = (float)$item->pay_money;
        }

        foreach ($channels as $channel => $data) {
            $data = array_values($data);
            array_unshift($data, Lang::get('common.channel.' . $channel));
            $payment_chart['columns'][] = $data;
        }

        return ['fee_chart' => $fee_chart, 'payment_chart' => $payment_chart];
    }

    public function platform($data, $pageSize) {
        $query = (new PlatformStatistic)->newQuery();

        $platform = isset($data['platform']) ? $data['platform'] : '';
        if (!empty($platform)) {
            $query->where('platform', $platform);
        }

        $begin_time = isset($data['begin_time']) ? Time::toTime(trim($data['begin_time'])) : 0;
        if ($begin_time > 0) {
            $query->where('day', '>=', $begin_time);
        }

        $end_time = isset($data['end_time']) ? Time::toTime(trim($data['end_time'])) : 0;
        if ($end_time > 0) {
            $query->where('day', '<=', $end_time);
        }

        $query_statistic = clone $query;

        $total_count = $query->count();

        $page = isset($data['page']) ? $data['page'] : 1;
        $query->skip(($page - 1) * $pageSize)->take($pageSize);

        $order = isset($data['order']) ? $data['order'] : 'day';
        $sort  = isset($data['sort']) ? $data['sort'] : 'DESC';
        $query->orderBy($order, $sort);

        $list = $query->get();

        $statistic = [];

        if ($total_count > 0) {
            $query_statistic->selectRaw('SUM(order_num) AS total_order_num, SUM(order_money) AS total_order_money, 
                                         SUM(pay_num) AS total_pay_num, SUM(pay_money) AS total_pay_money, 
                                         SUM(fee_income) AS total_fee_income, SUM(real_income) AS total_real_income');
            $statistic = $query_statistic->first();
        }

        return ['lists' => $list, 'total_count' => $total_count, 'statistic' => $statistic];
    }
}