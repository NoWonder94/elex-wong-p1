<?php
namespace App\Application\System\Admin\Services;

use App\Models\Agent\Payment;
use App\Models\System\Payment as SysPayment;

class PaymentService extends \App\Services\System\PaymentService {
    public function lists($data = []) {
        $this->listFormatOrder = function(&$builder, &$data, &$attributes) {
            $builder->orderBy('sort', 'ASC');
        };
        return parent::lists($data);
    }

    public function update($data) {
        unset($data['code'], $data['channel']);

        $this->saveExtend[] = function($primary_val, &$data, &$attributes) {
            global $auth_old_data;
            //如果费率增加，代理/商家需要确认费率
            if ($auth_old_data['rate'] < $data['rate']) {
                Payment::where('payment_id', $primary_val)->update(['confirm_status' => 0]);
            }
        };

        return parent::update($data);
    }

    public function getPaymentsByChannel($payment){
        $data = SysPayment::/*where('channel',$payment['channel'])
                            ->*/where('id','<>', $payment['id'])
                            ->get();
        return $data;
    }
}