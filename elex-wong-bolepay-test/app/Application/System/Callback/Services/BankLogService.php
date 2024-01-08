<?php 
namespace App\Application\System\Callback\Services;

use App\Services\System\BankService;

class BankLogService extends \App\Services\System\BankLogService {

    public function updateStatus($bankId, $sn) {
        $bank = BankService::instance()->getById($bankId);

        sleep(2);

        $bankLog = $this->getBySn($bank->id, $sn);
        if (!$bankLog) {
            return;
        }

        if ($bankLog->status === 0) {
            $status = OrderService::instance()->updateByBankLog($bankLog, $bank);

            if ($status == -2) {
                $bankLog->warn_status = 1;
                $status = -1;
            }
            $bankLog->status = $status;

            $bankLog->save();
        }
    }
}