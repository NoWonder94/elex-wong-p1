<?php
namespace App\Application\System\Admin\Services;

use App\Models\Agent\WithdrawPlatform;
use App\Models\System\WithdrawPlatform as SysPayment;

class WithdrawPlatformService extends \App\Services\System\WithdrawPlatformService {
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

    
}