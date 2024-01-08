<?php 
namespace App\Application\System\Api\Services;

use App\Cache\SystemCache;
use App\Services\System\ServerService;
use App\Application\System\Api\Models\Bank;
use SiteCache;

class BankService extends \App\Services\System\BankService {

    public function getById($id) {
        $list = $this->getSystemCacheByCode('banks');
        if (!isset($list[$id])) {
            $this->throwException('common.bank.not_exist');
        }
        return new Bank($list[$id]);
    }

	public function getReceive(string $type) {
		$bank = Bank::where('type', $type)->where('mode', 'receive')->where('status', 1)->orderBy('deposit_count', 'ASC')->first();
		if (!$bank) {
            $this->throwException('common.bank.not_exist');
        }
		return $bank;
	}

    public function updateDepositCount(int $id) {
        return Bank::where('id', $id)->where('status', 1)->increment('deposit_count');
    }
	
	public function checkIp(int $id) {
		$bank   = $this->getById($id);
		$server = ServerService::instance()->getServer($bank->server_id);
		if (!$server) {
			return false;
		}
		return $server->public_ip == CLIENT_IP;
    }

    public function setRunStatus(int $id, int $status, string $msg) {
    	if ($id < 1) {
    		$this->throwException('common.bank.not_exist');
    	}

    	$bank = Bank::where('id', $id)->first();
    	if (!$bank) {
    		$this->throwException('common.bank.not_exist');
    	}

    	$bank->run_status = $status;
    	$bank->run_msg    = $msg;
		$bank->run_time   = UTC_TIME;
    	$bank->save();
    }
	
	public function setAppStatus(int $id, int $status, string $msg) {
    	if ($id < 1) {
    		$this->throwException('common.bank.not_exist');
    	}

    	$bank = Bank::where('id', $id)->first();
    	if (!$bank) {
    		$this->throwException('common.bank.not_exist');
    	}

    	$bank->app_status = $status;
    	$bank->app_msg    = $msg;
		$bank->app_time   = UTC_TIME;
    	$bank->save();
    }

    public function setCache() {
        $list = Bank::orderBy('id', 'DESC')->get()->getDictionaryArray();
        SystemCache::forever('banks', $list);
        return false;
    }
}