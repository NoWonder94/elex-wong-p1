<?php
namespace App\Application\Agent\Admin\Services;

use App\Models\Agent\Payment;
use AgentCache;

class PaymentService extends \App\Services\Agent\PaymentService {

    public function confirm($id) {
        Payment::where('agent_id', APP_CURRENT_AGENT_ID)->where('payment_id', $id)->update(['confirm_status' => 1]);
        AgentCache::forget('payments');
    }

    public function getConfirmCount($agent) {
        $payments = $this->getPayments($agent, false);
        $num = 0;
        foreach ($payments as $payment) {
            if ($payment['status'] == 1 && $payment['confirm_status'] == 0) {
                $num++;
            }
        }
        return $num;
    }
}