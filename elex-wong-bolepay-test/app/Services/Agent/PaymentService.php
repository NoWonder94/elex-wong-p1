<?php 
namespace App\Services\Agent;

use App\Models\Agent\Payment;
use App\Services\System\PaymentService as SystemPaymentService;
use App\Utils\Calc;
use AgentCache;

class PaymentService extends \App\Services\BaseService {

    public function getPaymentsById($id, $isCache = true) {
        $payments = AgentCache::assign($id)->get('payments');
        if (!$payments || !$isCache) {
            $payments = Payment::where('agent_id', $id)->get()->getKeyListArray('payment_id');
            AgentCache::assign($id)->forever('payments', $payments);
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
        $enable_payments = AgentCache::assign($id)->get('enable_payments');
        if (!$enable_payments) {
            $enable_payments = [];
            $system_payments = SystemPaymentService::instance()->getCacheByCode('payments');
            $list = Payment::where('agent_id', $id)->where('status', 1)->get();
            foreach ($list as $item) {
                $item = $item->toArray();
                $item['name'] = $system_payments[$item['payment_id']]['name'];
                $item['code'] = $system_payments[$item['payment_id']]['code'];
                $enable_payments[] = $item;
            }
            AgentCache::assign($id)->forever('enable_payments', $enable_payments);
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
                //$agent_payment['create_fee'] = (float)Calc::add($payment['create_fee'], $agent_payment['create_fee']);
                $agent_payment['status'] = $agent_payment['status'] == 1 ? $payment['status'] : $agent_payment['status'];
                $agent_payments[$payment_id] = $agent_payment;
            }
        }

        $list = [];
        $system_payments = SystemPaymentService::instance()->getCacheByCode('payments');
        foreach ($system_payments as $payment_id => $payment) {
            if (!isset($agent_payments[$payment_id])) {
                continue;
            }

            $agent_payment = $agent_payments[$payment_id];
            $payment['rate'] = (float)Calc::add($payment['rate'], $agent_payment['rate']);
            //$payment['create_fee'] = (float)Calc::add($payment['create_fee'], $agent_payment['create_fee']);
            $payment['status']  = $agent_payment['status'] == 1 ? $payment['status'] : $agent_payment['status'];
            $payment['confirm_status'] = $agent_payment['confirm_status'];
            $payment['agent_rules'] = !empty($agent_payment['rules']) ? json_decode($agent_payment['rules'], true) : [];
            $list[$payment_id] = $payment;
        }

        return $list;
    }
}