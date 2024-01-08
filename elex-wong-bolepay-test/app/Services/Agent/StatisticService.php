<?php 
namespace App\Services\Agent;

use App\Models\Agent\Statistic;
use App\Models\Agent\PaymentStatistic;
use App\Models\Agent\WithdrawPlatformStatistic;
use App\Models\Agent\PlatformStatistic;
use App\Services\System\PaymentService;
use App\Services\System\WithdrawPlatformService;
use Illuminate\Database\Query\Expression;
use Time;

class StatisticService extends \App\Services\BaseService {

    public function getPaymentDayMoney($id, $channelId) {
        return PaymentStatistic::where('agent_id', $id)->where('day', UTC_DAY)->where('channel_id', $channelId)->value('pay_money');
    }

    public function statistic($agentId, $amounts, $day = null) {
        if (!$day) {
            $day = UTC_DAY;
        }
        $month = Time::toDate(UTC_DAY, 'm');

        $statistic = Statistic::where('agent_id', $agentId)->where('day', $day)->first();
        if (!$statistic) {
            $statistic = new Statistic;
            $statistic->agent_id = $agentId;
            $statistic->day = $day;
            $statistic->month = $month;
            $statistic->save();
        }

        $data = [];
        foreach ($amounts as $field => $amount) {
            if ($amount > 0) {
                $data[$field] = new Expression("{$field} + {$amount}");
            } elseif ($amount < 0) {
                $data[$field] = new Expression("{$field} - " . abs($amount));
            }
        }

        if (count($data) > 0) {
            Statistic::where('agent_id', $agentId)->where('day', $day)->update($data);
        }
    }

    public function paymentStatistic($agentId, $channel, $channelId, $amounts, $day = null) {
        if (!$day) {
            $day = UTC_DAY;
        }
        $month = Time::toDate(UTC_DAY, 'm');

        $statistic = Statistic::where('agent_id', $agentId)->where('day', $day)->first();
        if (!$statistic) {
            $statistic = new Statistic;
            $statistic->agent_id = $agentId;
            $statistic->day = $day;
            $statistic->month = $month;
            $statistic->save();
        }

        $payment  = PaymentService::instance()->get($channelId);
        $platform = $payment['type'];

        $platform_statistic = PlatformStatistic::where('agent_id', $agentId)->where('day', $day)->where('platform', $platform)->first();
        if (!$platform_statistic) {
            $platform_statistic = new PlatformStatistic;
            $platform_statistic->agent_id = $agentId;
            $platform_statistic->platform = $platform;
            $platform_statistic->day = $day;
            $platform_statistic->month = $month;
            $platform_statistic->save();
        }

        $payment_statistic = PaymentStatistic::where('agent_id', $agentId)->where('day', $day)->where('channel_id', $channelId)->first();
        if (!$payment_statistic) {
            $payment_statistic = new PaymentStatistic;
            $payment_statistic->agent_id = $agentId;
            $payment_statistic->channel = $channel;
            $payment_statistic->channel_id = $channelId;
            $payment_statistic->day = $day;
            $payment_statistic->month = $month;
            $payment_statistic->save();
        }

        $data = [];
        foreach ($amounts as $field => $amount) {
            if ($amount > 0) {
                $data[$field] = new Expression("{$field} + {$amount}");
            }
        }

        if (count($data) > 0) {
            Statistic::where('agent_id', $agentId)->where('day', $day)->update($data);
            PlatformStatistic::where('agent_id', $agentId)->where('day', $day)->where('platform', $platform)->update($data);
            PaymentStatistic::where('agent_id', $agentId)->where('day', $day)->where('channel_id', $channelId)->update($data);
        }
    }
    public function apiWithdrawStatistic($agentId, $channelId, $amounts, $day = null) {
        if (!$day) {
            $day = UTC_DAY;
        }
        $month = Time::toDate(UTC_DAY, 'm');

        $statistic = Statistic::where('agent_id', $agentId)->where('day', $day)->first();
        if (!$statistic) {
            $statistic = new Statistic;
            $statistic->agent_id = $agentId;
            $statistic->day = $day;
            $statistic->month = $month;
            $statistic->save();
        }

        $payment  = WithdrawPlatformService::instance()->get($channelId);

        $payment_statistic = WithdrawPlatformStatistic::where('agent_id', $agentId)->where('day', $day)->where('channel_id', $channelId)->first();
        if (!$payment_statistic) {
            $payment_statistic = new WithdrawPlatformStatistic();
            $payment_statistic->agent_id = $agentId;
            $payment_statistic->channel_id = $channelId;
            $payment_statistic->day = $day;
            $payment_statistic->month = $month;
            $payment_statistic->save();
        }

        $data = [];
        foreach ($amounts as $field => $amount) {
            if ($amount > 0) {
                $data[$field] = new Expression("{$field} + {$amount}");
            }
        }

        if (count($data) > 0) {
            Statistic::where('agent_id', $agentId)->where('day', $day)->update($data);
            WithdrawPlatformStatistic::where('agent_id', $agentId)->where('day', $day)->where('channel_id', $channelId)->update($data);
        }
    }
}