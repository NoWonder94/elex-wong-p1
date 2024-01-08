<?php
namespace App\Application\Www\Controllers;

use App\Application\Www\Services\SalesCallLogService;
use App\Application\Www\Services\SalesSmsLogService;
use App\Application\Www\Services\SalesSmsTplService;
use DB, Request;

class SalesUserController  extends UserController {
	protected function getSmsLogService() {
		return SalesSmsLogService::instance();
	}
	
	protected function getCallLogService() {
		return SalesCallLogService::instance();
	}
	
	protected function getSmsTplService() {
		return SalesSmsTplService::instance();
	}
	
	public function bigimport() {
		$index = (int)Request::get('index');
		$list  = include base_path() . '/resources/users/sky133.php';
		$total = count($list);
		$step  = 500;
		
		if ($index >= $total) {
			echo 'OK';
		}
		
        set_time_limit(0);
		$service = $this->getService();
		DB::connection()->beginTransaction();
		try {
			$count = 0;
			for($count; $count < $step; $count++){
				if ($index >= $total) {
					break;
				}
				$data = $list[$index];
				print_r($data);
				echo '<br/>';
				$index++;
				$user = $service->getBigImportUser($data);
				if (!$user) {
					continue;
				}
				
				if ($user->id > 0) {
					$user->modifier    = APP_CURRENT_ADMIN_NAME;
					$user->modify_time = UTC_TIME;
				} else {
					$user->creator     = APP_CURRENT_ADMIN_NAME;
					$user->reg_time    = UTC_TIME;
					$user->create_time = UTC_TIME;
				}
				$user->save();
				usleep(1);
			}
			DB::connection()->commit();
		} catch(\Exception $e) {
            DB::connection()->rollback();
            throw $e;
        }
		
		if ($count < $step) {
			echo 'OK';
		} else {
			echo '<script>setTimeout(function(){
				location.href="https://www.service.go6677.com/sky133/SalesUser/bigimport?index='.$index.'";
			}, 100);</script>';
		}
    }
}