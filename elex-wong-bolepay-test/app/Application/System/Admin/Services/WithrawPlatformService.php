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
        unset($data['code'],$data['total_withdraw']);

        return parent::update($data);
    }

    
}