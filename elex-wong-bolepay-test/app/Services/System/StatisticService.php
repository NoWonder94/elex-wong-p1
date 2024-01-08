<?php 
namespace App\Services\System;

use App\Models\System\Statistic;
use App\Models\System\PaymentStatistic;
use App\Models\System\WithdrawPlatformStatistic;
use App\Models\System\PlatformStatistic;
use App\Models\System\PaymentPlatform;
use App\Models\System\WithdrawPlatform;
use App\Utils\Calc;
use Illuminate\Database\Query\Expression;
use Time;

class StatisticService extends \App\Services\BaseService {

    public function statistic($amounts, $day = null) {
        if (!$day) {
            $day = UTC_DAY;
        }
        $month = Time::toDate(UTC_DAY, 'm');

        $statistic = Statistic::where('day', $day)->first();
        if (!$statistic) {
            $statistic = new Statistic;
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
            Statistic::where('day', $day)->update($data);
        }
    }

    public function paymentStatistic($channel, $channelId, $amounts, $day = null) {
        if (!$day) {
            $day = UTC_DAY;
        }
        $month = Time::toDate(UTC_DAY, 'm');

        $statistic = Statistic::where('day', $day)->first();
        if (!$statistic) {
            $statistic = new Statistic;
            $statistic->day = $day;
            $statistic->month = $month;
            $statistic->save();
        }

        $payment  = PaymentService::instance()->get($channelId);
        $platform = $payment['type'];

        $platform_statistic = PlatformStatistic::where('day', $day)->where('platform', $platform)->first();
        if (!$platform_statistic) {
            $platform_statistic = new PlatformStatistic;
            $platform_statistic->platform = $platform;
            $platform_statistic->day = $day;
            $platform_statistic->month = $month;
            $platform_statistic->save();
        }

        $payment_statistic = PaymentStatistic::where('day', $day)->where('channel_id', $channelId)->first();
        if (!$payment_statistic) {
            $payment_statistic = new PaymentStatistic;
            $payment_statistic->channel    = $channel;
            $payment_statistic->channel_id = $channelId;
            $payment_statistic->day        = $day;
            $payment_statistic->month      = $month;
            $payment_statistic->save();
        }

        $data = [];
        foreach ($amounts as $field => $amount) {
            if ($amount > 0) {
                $data[$field] = new Expression("{$field} + {$amount}");
            }
        }

        if (isset($amounts['pay_money']) && $amounts['pay_money'] > 0) {
            $platform_fee   = Calc::div(Calc::mul($amounts['pay_money'], $payment['rate'], 2), 100, 2);
            $platform_money = Calc::sub($amounts['pay_money'], $platform_fee, 2);

            if (isset($amounts['fee_income'])) {
                $real_income = Calc::sub($amounts['fee_income'], $platform_fee, 2);
                if ($real_income > 0) {
                    $data['real_income'] = new Expression("real_income + {$real_income}");
                }
            }

            PaymentPlatform::where('code', $platform)->update([
                'total_money' => new Expression("total_money + {$platform_money}"),
                'balance' => new Expression("balance + {$platform_money}")
            ]);
        }

        if (count($data) > 0) {
            Statistic::where('day', $day)->update($data);
            PlatformStatistic::where('day', $day)->where('platform', $platform)->update($data);
            PaymentStatistic::where('day', $day)->where('channel_id', $channelId)->update($data);
        }
    }

    public function apiWithdrawStatistic($channelId, $amounts, $day = null) {
        if (!$day) {
            $day = UTC_DAY;
        }
        $month = Time::toDate(UTC_DAY, 'm');

        $statistic = Statistic::where('day', $day)->first();
        if (!$statistic) {
            $statistic = new Statistic;
            $statistic->day = $day;
            $statistic->month = $month;
            $statistic->save();
        }

        $payment  = WithdrawPlatformService::instance()->get($channelId);

        $payment_statistic = WithdrawPlatformStatistic::where('day', $day)->where('channel_id', $channelId)->first();
        if (!$payment_statistic) {
            $payment_statistic = new WithdrawPlatformStatistic;
            $payment_statistic->channel_id = $channelId;
            $payment_statistic->day        = $day;
            $payment_statistic->month      = $month;
            $payment_statistic->save();
        }

        $data = [];
        foreach ($amounts as $field => $amount) {
            if ($amount > 0) {
                $data[$field] = new Expression("{$field} + {$amount}");
            }
        }
        if (isset($amounts['api_withdraw_pay_money']) && $amounts['api_withdraw_pay_money'] > 0) {
            $platform_fee   = Calc::div(Calc::mul($amounts['api_withdraw_pay_money'], $payment['rate'], 2), 100, 2);

            if (isset($amounts['api_withdraw_income'])) {
                $real_income = Calc::sub($amounts['api_withdraw_income'], $platform_fee, 2);
                if ($real_income > 0) {
                    $data['api_withdraw_real_income'] = new Expression("api_withdraw_real_income + {$real_income}");
                }
            }

            WithdrawPlatform::where('id', $channelId)->update([
                'total_withdraw' => new Expression("total_withdraw + {$amounts['api_withdraw_pay_money']}")
            ]);
        }


        if (count($data) > 0) {
            Statistic::where('day', $day)->update($data);
            WithdrawPlatformStatistic::where('day', $day)->where('channel_id', $channelId)->update($data);
        }
    }
}