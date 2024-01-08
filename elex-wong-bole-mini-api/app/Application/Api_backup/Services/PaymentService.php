<?php 
namespace App\Application\Site\Api\Services;

use App\Application\Site\Api\Models\Payment;
use SiteCache, Time, Lang;

class PaymentService extends BaseService {
    private static $payments = null;

    protected function initialize($data = []) {
        parent::initialize($data);

        if (self::$payments === null) {
            self::$payments = SiteCache::get('payments');
            self::$payments = null;
            if (!self::$payments) {
                self::$payments['pc'] = Payment::whereRaw("FIND_IN_SET('pc', device_support) and FIND_IN_SET(".APP_CURRENT_SITE_ID.", site_ids)") 
                                               ->where('status', 1)
                                               ->orderBy('sort', 'ASC')
                                               ->get()
                                               ->getKeyList('id');

                self::$payments['wap'] = Payment::whereRaw("FIND_IN_SET('wap', device_support) and FIND_IN_SET(".APP_CURRENT_SITE_ID.", site_ids)")
                                                ->where('status', 1)
                                                ->orderBy('wapsort', 'ASC')
                                                ->get()
                                                ->getKeyList('id');

                self::$payments['app'] = Payment::whereRaw("FIND_IN_SET('app', device_support) and FIND_IN_SET(".APP_CURRENT_SITE_ID.", site_ids)")
                                                ->where('status', 1)
                                                ->orderBy('wapsort', 'ASC')
                                                ->get()
                                                ->getKeyList('id');

                SiteCache::forever(CACHE_PAYMENTS, self::$payments);
            }
        }
    }

    public function get(int $id, string $client, $user) {
        if (!isset(self::$payments[$client]) || !isset(self::$payments[$client][$id])) {
            $this->throwException('common.payment.pnot_exist');
        }

        $payment = self::$payments[$client][$id];
        if (!in_array($user->user_group_id, $payment->user_group_ids)) {
            $this->throwException('common.payment.user_group_error');
        }

        //如果有限制时间段
        if (count($payment->open_time) > 0) {
            $str = [];
            foreach ($payment->open_time as $times) {
                $str[] = "{$times[0]} ~ {$times[1]}";
                if ($time >= $times[0] && $time <= $times[1]) {
                    $this->formatDepositMoney($user->userGroup, $payment);
                    return $payment;
                }
            }
            $this->throwException(['common.payment.time_error', implode('、', $str)]);
        } else {
            $this->formatDepositMoney($user->userGroup, $payment);
            return $payment;
        }
    }

    public function lists(string $client, $user) {
        if (!isset(self::$payments[$client])) {
            return [];
        }

        $list = [];

        $time = Time::toDate(UTC_TIME, 'H:i');

        foreach (self::$payments[$client] as $id => $payment) {
            if (!in_array($user->user_group_id, $payment->user_group_ids)) {
                continue;
            }

            //如果有限制时间段
            if (count($payment->open_time) > 0) {
                foreach ($payment->open_time as $times) {
                    if ($time >= $times[0] && $time <= $times[1]) {
                        $this->formatDepositMoney($user->userGroup, $payment);
                        $list[$payment->model][] = $payment->toArray();
                        break;
                    }
                }
            } else {
                $this->formatDepositMoney($user->userGroup, $payment);
                $list[$payment->model][] = $payment->toArray();
            }
        }

        $payment_models = Lang::get('root::common.payment_model');
        $payment_briefs = Lang::get('root::common.payment_brief');

        $result = [];

        foreach ($list as $key => $payments) {
            $result[$key] = [
                'name' => $payment_models[$key],
                'brief' => $payment_briefs[$key],
                'payments' => $payments
            ];
        }
        
        return $result;
    }

    protected function formatDepositMoney($userGroup, &$payment) {
        $payment->min_deposit = max($payment->min_deposit, $userGroup->min_deposit_money);
        if ($payment->max_deposit > 0 && $userGroup->max_deposit_money > 0) {
            $payment->max_deposit = min($payment->max_deposit, $userGroup->max_deposit_money);
        } elseif ($userGroup->max_deposit_money > 0) {
            $payment->max_deposit = $userGroup->max_deposit_money;
        }
    }

    public function getLibrarie($payment) {
        $librarie = "\App\Libraries\Payment\\". ucfirst($payment->code) ."Librarie";
        if (!class_exists($librarie)) {
            return false;
        }
        return new $librarie($payment);
    }

    public function getLibrarieByCode($code) {
        $librarie = "\App\Libraries\Payment\\". ucfirst($code) ."Librarie";
        if (!class_exists($librarie)) {
            return false;
        }
        return new $librarie();
    }
}