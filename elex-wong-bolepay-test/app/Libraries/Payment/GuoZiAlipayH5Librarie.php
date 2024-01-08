<?php
namespace App\Libraries\Payment;

/**
 * 果子支付
 */
class GuoZiAlipayH5Librarie extends GuoZiLibrarie {
    protected $type = 'alipay_wap';
    protected $isQrcode = true;
}