<?php 
namespace App\Services\System;

use App\Models\System\BankLog;

class BankLogService extends \App\Services\BaseEloquentService {

    public function getBySn($bankId, $sn) {
        return BankLog::where('sn', $sn)->where('bank_id', $bankId)->first();
    }
}