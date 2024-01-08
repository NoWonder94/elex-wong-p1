<?php
namespace App\Services\Agent;

use App\Models\Agent\WithdrawPlatform;
use App\Services\System\WithdrawPlatformService as SystemPaymentService;
use App\Utils\Calc;
use AgentCache;

class WithdrawPlatformService extends \App\Services\BaseService {

    public function getPaymentsById($id, $isCache = true) {
        $payments = AgentCache::assign($id)->get('withdraw_platforms');
        if (!$payments || !$isCache) {
            $payments = WithdrawPlatform::where('agent_id', $id)->get()->getKeyListArray('payment_id');
            AgentCache::assign($id)->forever('withdraw_platforms', $payments);
        }
        return $payments;
    }

    public function getPayment($id, $paymentId) {
        $payments = $this->getPaymentsById($id);
        if (!isset($payments[$paymentId])) {
            return null;
        }
        return $payments[$paymentId];
    }

    public function getEnablePayments($id) {
        $enable_payments = AgentCache::assign($id)->get('enable_withdraw_platforms');
        if (!$enable_payments) {
            $enable_payments = [];
            $system_payments = SystemPaymentService::instance()->getCacheByCode('withdraw_platforms');
            $list = WithdrawPlatform::where('agent_id', $id)->where('status', 1)->get();
            foreach ($list as $item) {
                $item = $item->toArray();
                $item['name'] = $system_payments[$item['payment_id']]['name'];
                $item['code'] = $system_payments[$item['payment_id']]['code'];
                $enable_payments[] = $item;
            }
            AgentCache::assign($id)->forever('enable_withdraw_platforms', $enable_payments);
        }
        return $enable_payments;
    }

    public function getPayments($agent, $isCache = true) {

        $parent_ids = array_reverse($agent->getParentIds());
        $agent_payments = $this->getPaymentsById($agent->id, $isCache);

        foreach ($parent_ids as $pid) {
            $parent_payments = $this->getPaymentsById($pid);
            foreach ($parent_payments as $payment_id => $payment) {
                if (!isset($agent_payments[$payment_id])) {
                    continue;
                }
                $agent_payment = $agent_payments[$payment_id];
                $agent_payment['rate'] = (float)Calc::add($payment['rate'], $agent_payment['rate']);
                $agent_payment['rate_money'] = (float)Calc::add($payment['rate_money'], $agent_payment['rate_money']);
                $agent_payments[$payment_id] = $agent_payment;
            }
        }

        $list = [];
        $system_payments = SystemPaymentService::instance()->getCacheByCode('withdraw_platforms');
        foreach ($system_payments as $payment_id => $payment) {
            if (!isset($agent_payments[$payment_id])) {
                continue;
            }

            $agent_payment = $agent_payments[$payment_id];
            $payment['rate'] = (float)Calc::add($payment['rate'], $agent_payment['rate']);
            $payment['rate_money'] = (float)Calc::add($payment['rate_money'], $agent_payment['rate_money']);
            $payment['status']  = $agent_payment['status'] == 1 ? $payment['status'] : $agent_payment['status'];
            $payment['confirm_status'] = $agent_payment['confirm_status'];
            $list[$payment_id] = $payment;
        }
        return $list;
    }
}