<?php 
namespace App\Application\System\Api\Services;

use App\Models\System\BankLog;
use Time, Helper, Http;

class BankLogService extends \App\Services\System\BankLogService {

	public function check($bankId, $sn) {
		$bank = BankService::instance()->getById($bankId);
		$sn   = $this->getSn($bank->id, $sn);
		
		$bankLog = $this->getBySn($bank->id, $sn);
		if (!$bankLog) {
			return -1;
		}
		
		if ($bankLog->status === 0) {
            Http::ansync(Helper::url('callback#BankLog/updateStatus'), [
                'bank_id' => $bankId,
                'sn' => $sn
            ]);
		}
		return 1;
	}

	public function saved($data) {
        $time = Time::toTime($data['pay_time']);
		$bank = BankService::instance()->getById((int)$data['bank_id']);
		$sn   = $this->getSn($bank->id, $data['sn']);

        $bankLog = $this->getBySn($bank->id, $sn);
		if (!$bankLog) {
            $bankLog = new BankLog();
            $bankLog->id          = $sn;
            $bankLog->sn          = $sn;
            $bankLog->trade_no    = $data['trade_no'];
            $bankLog->bank_id     = $bank->id;
            $bankLog->deposit     = $data['deposit'];
            $bankLog->withdraw    = $data['withdraw'];
            $bankLog->balance     = $data['balance'];
            $bankLog->payer       = $this->getPayer($data['payer'], $data['remark'], $bank->type);
            $bankLog->remark      = $data['remark'];
            $bankLog->pay_date    = Time::toDayTime($time);
            $bankLog->pay_time    = $time;
            $bankLog->create_date = UTC_DAY;
            $bankLog->create_time = UTC_TIME;
			//如果为存款时
			if ($bankLog->deposit > 0) {
                $bankLog->status  = 0; //未匹配存款数据
			} else {
                $bankLog->status  = -1; //不用匹配存款数据
			}
            $bankLog->save();
			$result = 1; //新增
		} else {
			$result = -1; //存在
		}

		if ($bankLog->status === 0) {
            Http::ansync(Helper::url('callback#BankLog/updateStatus'), [
                'bank_id' => $bank->id,
                'sn' => $sn
            ]);
		}
        return $result;
	}

	protected function getPayer($payer, $remark, $type) {
	    if ($payer == '财付通支付科技有限公司') {
            return '财付通';
        }

		switch ($type) {
			case 'Cmbc':
			case 'Icbc':
                preg_match('/^银联入账\-商户资金结算\-(?<name>.+?)支付.*$/u', $remark, $match);
				if ($match) {
                    return $match['name'];
                }

				preg_match('/^银联入账：(?<name>.+?)支付宝.*$/u', $remark, $match);
				if ($match) {
					return $match['name'];
				}
				
				preg_match('/^(?<name>.+?)支付宝.*$/u', $remark, $match);
				if ($match) {
					return $match['name'];
				}
				break;

            case 'Citic':
                preg_match('/^银联入账：\/(?<name>.+?)支付宝/u', $remark, $match);
                if ($match) {
                    return $match['name'];
                }

                preg_match('/^(?<name>.+?)支付宝.*$/u', $remark, $match);
                if ($match) {
                    return $match['name'];
                }
                break;
		}
		return $payer;
	}

	protected function getSn($bankId, $sn) {
		return md5("bank:{$bankId}\n{$sn}");
	}
}