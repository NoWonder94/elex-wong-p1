<?php 
namespace App\Application\Agent\Admin\Services;

use App\Models\Agent\Statistic;
use App\Models\Agent\PaymentStatistic;
use Time, Lang;

class StatisticService extends \App\Services\Agent\StatisticService {

    public function businessChart() {
        $begin_time = UTC_DAY - 86400 * 6;
        $end_time   = UTC_DAY;

        $fee_chart = [
            'columns' => [
                ['订单金额'],
                ['支付金额']
            ],
            'categories' => []
        ];

        $payment_chart = [
            'columns' => [],
            'categories' => []
        ];

        $fee_list = Statistic::where('agent_id', APP_CURRENT_AGENT_ID)
            ->where('day', '>=', $begin_time)
            ->where('day', '<=', $end_time)
            ->orderBy('day', 'ASC')
            ->get()
            ->getKeyList('day');

        $default_column = [];

        for ($time = $begin_time; $time <= $end_time; $time += 86400) {
            if (isset($fee_list[$time])) {
                $data = $fee_list[$time];
                $fee_chart['columns'][0][] = $data->order_money;
                $fee_chart['columns'][1][] = $data->pay_money;
            } else {
                $fee_chart['columns'][0][] = 0;
                $fee_chart['columns'][1][] = 0;
            }

            $fee_chart['categories'][] = Time::toDate($time, 'Y-m-d');
            $payment_chart['categories'][] = Time::toDate($time, 'Y-m-d');
            $default_column[$time]  = 0;
        }

        $payment_list = PaymentStatistic::where('agent_id', APP_CURRENT_AGENT_ID)
            ->where('day', '>=', $begin_time)
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

    public function agentData() {
        $today_time = UTC_DAY;
        $yesterday_time = UTC_DAY - 86400;

        $data = [
            'today' => null,
            'yesterday' => null,
        ];

        $list = Statistic::where('agent_id', APP_CURRENT_AGENT_ID)->whereIn('day', [$today_time, $yesterday_time])->get();

        foreach ($list as $item) {
            if ($item->day == $today_time) {
                $data['today'] = $item;
            } else {
                $data['yesterday'] = $item;
            }
        }
        return $data;
    }

    public function proxyChart() {
        $begin_time = UTC_DAY - 86400 * 6;
        $end_time   = UTC_DAY;

        $fee_chart = [
            'columns' => [
                ['订单金额'],
                ['支付金额'],
                ['服务费收入'],
            ],
            'categories' => []
        ];

        $payment_chart = [
            'columns' => [],
            'categories' => []
        ];

        $fee_list = Statistic::where('agent_id', APP_CURRENT_AGENT_ID)
                            ->where('day', '>=', $begin_time)
                            ->where('day', '<=', $end_time)
                            ->orderBy('day', 'ASC')
                            ->get()
                            ->getKeyList('day');


        $default_column = [];

        for ($time = $begin_time; $time <= $end_time; $time += 86400) {
            if (isset($fee_list[$time])) {
                $data = $fee_list[$time];
                $fee_chart['columns'][0][] = $data->order_money;
                $fee_chart['columns'][1][] = $data->pay_money;
                $fee_chart['columns'][2][] = $data->server_fee_income;
            } else {
                $fee_chart['columns'][0][] = 0;
                $fee_chart['columns'][1][] = 0;
                $fee_chart['columns'][2][] = 0;
            }

            $fee_chart['categories'][] = Time::toDate($time, 'Y-m-d');
            $payment_chart['categories'][] = Time::toDate($time, 'Y-m-d');
            $default_column[$time]  = 0;
        }

        $payment_list = PaymentStatistic::where('agent_id', APP_CURRENT_AGENT_ID)
                                        ->where('day', '>=', $begin_time)
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

    public function orderChart() {

    }

    public function paymentOrderChart() {

    }
}