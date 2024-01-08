<?php
namespace App\Services\Agent;

use App\Models\Agent\ApiWithdrawNotify;
use App\Services\System\StatisticService as SystemStatisticService;
use App\Application\System\Admin\Services\WithdrawPlatformService;
use App\Services\System\AgentService;
use App\Models\Agent\ApiWithdraw;
use App\Models\System\Agent;
use App\Traits\AgentTrait;
use App\Utils\Calc;
use App\Utils\Http;
use Lang,Helper,Time;

class ApiWithdrawService extends EloquentService {
    use AgentTrait;

    public function pay($sn, float $money,$status,$remark = '', $dataClosure = null, $preClosure = null, $successClosure = null) {
        $withdraw = ApiWithdraw::where('sn', $sn)->where('status', 0);
        $connection = $withdraw->getConnection();
        $connection->beginTransaction();
        try{
            //锁定存款数据
            $withdraw = $withdraw->lockForUpdate()->first();
            if (!$withdraw) {
                return;
            }

            $is_finish = false;
            if ($preClosure instanceof \Closure) {
                call_user_func_array($preClosure, [&$withdraw, &$money, &$is_finish]);
            }

            if ($money <= 0 || $money != $withdraw->money) {
                $this->throwException('common.api_withdraw.money_error');
            }

            $withdraw->status = $status;
            $withdraw->update_time = UTC_TIME;
            $withdraw->remark = $remark;

            if ($dataClosure instanceof \Closure) {
                call_user_func_array($dataClosure, [&$withdraw]);
            }

            $result = $withdraw->save();
            if ($result > 0) {
                if($status == 1){
                    $agent = AgentService::instance()->getCacheById($withdraw->agent_id);
                    $this->updateByWithdrawPay($agent, $withdraw);

                    if ($successClosure instanceof \Closure) {
                        call_user_func_array($successClosure, [$withdraw]);
                    }
                }else{
                    $agent = AgentService::instance()->getCacheById($withdraw->agent_id);
                    $this->updateByWithdrawFail($agent, $withdraw);
                }
            }
            $withdrawNotify = new ApiWithdrawNotify();
            $withdrawNotify->id = $withdraw->id;
            $withdrawNotify->sn = $withdraw->sn;
            $withdrawNotify->notify_status = 1;
            $withdrawNotify->notify_num = 1;
            $withdrawNotify->notify_time = UTC_TIME;
            $withdrawNotify->notify_next_time = UTC_TIME + 10;
            $withdrawNotify->save();

            $connection->commit();
        } catch(\Exception $e){
            $connection->rollback();
            throw $e;
        }

        if ($result > 0) {
            Http::ansync(Helper::urlByPlatform('system', 'callback#ApiWithdraw/notify', ['sn' => $sn]));
        }
    }


    public function notify($sn, $isForce = false) {
        $withdraw = ApiWithdraw::where('sn', $sn)->first();
        if (!$withdraw) {
            $withdraw = ApiWithdraw::where('sn', $sn)->disableQueryBigDB()->first();
        }

        if (!$withdraw) {
            return false;
        }

        $data = [
            'sn'         => $withdraw->sn,
            'trade_no'   => $withdraw->trade_no,
            'money'      => (float)$withdraw->money,
            'status'     => $withdraw->status,
            'remark'	 => $withdraw->remark,
            'pay_time'   => Time::toDate($withdraw->update_time)
        ];

        $agent = AgentService::instance()->getCacheById($withdraw->agent_id);
        $data  = AgentService::instance()->formatRequestArgs($agent, $data);
        $response = Http::post($withdraw->notify_url, $data, [], 20);
        $response = $response ? strtoupper(trim($response)) : '';
        switch ($response) {
            case 'WITHDRAW_SUCCESS':
                $this->updateNotifyStatus($withdraw, 1);
                return true;
                break;

            case 'WITHDRAW_FAIL':
                $this->updateNotifyStatus($withdraw, -1);
                return true;
                break;

            default:
                $this->updateNotifyStatus($withdraw, 0);
                \Log::info("withdraw_notify_url:" . $withdraw->notify_url);
                \Log::info("withdraw_notify_data:" . http_build_query($data));
                \Log::info("withdraw_notify_response:" . $response);
                return false;
                break;
        }
    }

    public function updateNotifyStatus($withdraw, $status) {
        sleep(2);
        if ($status != 0) {
            ApiWithdraw::where('sn', $withdraw->sn)->update([
                'notify_status' => 1,
                'notify_time'   => UTC_TIME
            ]);

            ApiWithdrawNotify::where('sn', $withdraw->sn)->update([
                'notify_status' => 2
            ]);
        } else {
            ApiWithdrawNotify::where('sn', $withdraw->sn)->update([
                'notify_status' => 0
            ]);
        }
    }
}