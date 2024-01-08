<?php
namespace App\Application\Agent\Api\Services;
use App\Services\System\WithdrawPlatformService as SystemPaymentService;
use App\Models\Agent\Order;
use App\Utils\Calc;

class WithdrawPlatformService extends \App\Services\Agent\WithdrawPlatformService {

    public function getByChannelId($agent, $channelId) {

        $agent_payments  = $this->getPayments($agent, false);
        if (!isset($agent_payments[$channelId])) {
            $this->throwException('common.order.payment_not_exist');
        }

        $payment = $agent_payments[$channelId];

        if ($payment['status'] != 1) {
            $this->throwException('common.order.payment_close');
        }

        if ($payment['confirm_status'] != 1) {
            $this->throwException('common.order.payment_confirm');
        }

        $librarie = '\App\Libraries\Withdraw\\' . $payment['code'] . 'Librarie';
        return new $librarie($payment);
    }

    public function getMoneys($agent, $channelId) {
        $agent_payments  = $this->getPayments($agent, false);
        if (!isset($agent_payments[$channelId])) {
            $this->throwException('common.order.payment_not_exist');
        }

        $payment = $agent_payments[$channelId];

        if ($payment['status'] != 1) {
            $this->throwException('common.order.payment_close');
        }

        if ($payment['confirm_status'] != 1) {
            $this->throwException('common.order.payment_confirm');
        }

        $librarie = '\App\Libraries\Withdraw\\' . $payment['code'] . 'Librarie';
        $librarie = new $librarie($payment);
        return $librarie->getMoneys();
    }



}