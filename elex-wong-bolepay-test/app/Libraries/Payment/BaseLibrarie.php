<?php 
namespace App\Libraries\Payment;

use App\Services\Agent\StatisticService;
use Endroid\QrCode\QrCode;
use App\Traits\ThrowException;
use Helper, Storage, Time;

/**
 * 支付方式基类
 */
class BaseLibrarie { 
    use ThrowException;

    public $payment;

    public function __construct($payment = null) {
        $this->payment = $payment;
    }

    protected function apiLog($content) {
        Helper::cloudLog('PaymentLibrarie/' . $this->payment['code'], $content);
    }

    public function notify($data) {
        return 'SUCCESS';
    }

    protected function createQrcode($url, $sn) {
        $qrcode = new QrCode($url);
        $qrcode->setSize(200);
        $qrcode->setMargin(5);

        $store = Storage::disk('s3');
        $path  = 'resources/qrcodes/' . Time::toDate(UTC_TIME, 'Y-m-d') . '/' . $sn .  '.jpg';
        if ($store->put($path, $qrcode->writeString())) {
            $qrcode_url = $store->url($path);
        } else {
            $this->throwException('common.order.save_qrcode_error');
        }
        return $qrcode_url;
    }

    public function check($agentId, $money) {
        if ($this->payment['min_money'] > 0 && $this->payment['min_money'] > $money) {
            $this->throwException(['common.order.min_money_error', $this->payment['min_money']]);
        }

        if ($this->payment['max_money'] > 0 && $this->payment['max_money'] < $money) {
            $this->throwException(['common.order.max_money_error', $this->payment['max_money']]);
        }

        if (!IS_DEV_MODE && $this->payment['day_money'] > 0) {
            $day_money = (int)StatisticService::instance()->getPaymentDayMoney($this->payment['code'], $this->payment['id']);
            if ($day_money + $money > $this->payment['day_money']) {
                $this->throwException('common.order.day_money_error');
            }
        }
    }

    public function getMoneys() {
        return [];
    }

    public function getPayInfo(&$order) {
        return $order->data;
    }
}