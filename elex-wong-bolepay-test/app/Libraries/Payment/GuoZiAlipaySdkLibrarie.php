<?php
namespace App\Libraries\Payment;

/**
 * 果子支付
 */
class GuoZiAlipaySdkLibrarie extends GuoZiLibrarie {
    protected $type = 'alipay_sdk';

    public function check($agentId, $money) {
        if ($money % 99 != 0) {
            $this->throwException('支付金额只支持99的倍数');
        }
        parent::check($agentId, $money);
    }
}