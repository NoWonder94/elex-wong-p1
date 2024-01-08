<?php 
namespace App\Application\System\Callback\Services;

use App\Models\Agent\Order;
use App\Models\Agent\ApiWithdraw;
use App\Models\Agent\MoneyLog;
use App\Models\Agent\PaymentStatistic;
use App\Models\System\PaymentStatistic as sysPaymentStatistic;
use App\Models\Agent\Statistic;
use App\Models\System\Statistic as sysStatistic;
use App\Models\Agent\Withdraw;
use App\Models\Agent\WithdrawPlatformStatistic;
use App\Models\System\WithdrawPlatformStatistic as sysWithdrawPlatformStatistic;
use App\Models\System\AddressLog;
use App\Models\Agent\PlatformStatistic;
use App\Models\System\PlatformStatistic as sysPlatformStatistic;
use Time;

class TaskService extends \App\Services\BaseService {

    /**
     * 删除三个月之前的数据
     * @return boolean
     * @throws \Exception
     */
    public function delData(){
        try{
           $time = strtotime('-3 month',mktime(0,0,0,date('m'),1,date('Y')));
           Order::where('create_time','<',$time)->delete();
           ApiWithdraw::where('create_time','<',$time)->delete();
           MoneyLog::where('create_time','<',$time)->delete();
           PaymentStatistic::where('day','<',$time)->delete();
           sysPaymentStatistic::where('day','<',$time)->delete();
           Statistic::where('day','<',$time)->delete();
           sysStatistic::where('day','<',$time)->delete();
           Withdraw::where('create_time','<',$time)->delete();
           WithdrawPlatformStatistic::where('day','<',$time)->delete();
           sysWithdrawPlatformStatistic::where('day','<',$time)->delete();
           AddressLog::where('create_time','<',$time)->delete();
           PlatformStatistic::where('day','<',$time)->delete();
           sysPlatformStatistic::where('day','<',$time)->delete();
        } catch (\Exception $e){
            throw $e;
        }
        return true;
    }
}