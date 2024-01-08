<?php 
namespace App\Services\Agent;

use App\Services\System\StatisticService as SystemStatisticService;
use App\Application\System\Admin\Services\PaymentPlatformService;
use App\Models\Agent\Withdraw;
use App\Models\System\Agent;
use App\Traits\AgentTrait;
use App\Utils\Calc;
use Lang;

class WithdrawService extends EloquentService {
    use AgentTrait;

    public function updateByCreate($withdraw, $agent) {
        //$this->lockAgent($agent->id);

        $money = $withdraw->money;

        //更新代理统计
        StatisticService::instance()->statistic($agent->id, [
            'withdraw_num' => 1,
            'withdraw_money' => $money
        ]);

        //更新系统统计
        SystemStatisticService::instance()->statistic([
            'withdraw_num' => 1,
            'withdraw_money' => $money
        ]);

        $amount =  -$money;
        //冻结金额
        $balance = $this->updateMoney($agent->id, $amount);

        //写入日志
        MoneyLogService::instance()->created($agent, $amount, $balance, $withdraw->sn, 'withdraw', Lang::format('common.withdraw.freeze_money', $withdraw->sn));
    }

    public function updateByCancel($withdraw, $agent) {
        //$this->lockAgent($agent->id);

        $amount = $withdraw->money;

        //更新代理统计
        StatisticService::instance()->statistic($agent->id, [
            'withdraw_num' => -1,
            'withdraw_money' => -$amount
        ], $withdraw->create_date);

        //更新系统统计
        SystemStatisticService::instance()->statistic([
            'withdraw_num' => -1,
            'withdraw_money' => -$amount
        ], $withdraw->create_date);

        $balance = $this->updateMoney($agent->id, $amount);

        MoneyLogService::instance()->created($agent, $amount, $balance, $withdraw->sn, 'withdraw', Lang::format('common.withdraw.cancel_refund', $withdraw->sn));
    }

    public function updateByComplete($withdraw, $agent) {
        $service_fee = $withdraw->service_fee;
        $withdraw_money = $withdraw->money;

        //如果是从帐户余额扣款
        if ($service_fee > 0) {
            $update_data = [
                'withdraw_fee' => $service_fee
            ];

            if ($withdraw->service_fee_type == 1) {//从代付金额扣除手续费，减少代付金额统计
                $update_data['withdraw_money'] = -$service_fee;
                $withdraw_money = $withdraw_money - $service_fee;
            }

            //更新代理统计
            StatisticService::instance()->statistic($agent->id, $update_data, $withdraw->create_date);

            //更新系统统计
            SystemStatisticService::instance()->statistic($update_data, $withdraw->create_date);

            if ($withdraw->service_fee_type == 2) {//从代理余额扣除手续费
                $amount =  -$service_fee;

                //$this->lockAgent($agent->id);

                //扣除手续费
                $balance = $this->updateMoney($agent->id, $amount);

                //写入日志
                MoneyLogService::instance()->created($agent, $amount, $balance, $withdraw->sn, 'withdraw', Lang::format('common.withdraw.service_fee_deduct', $withdraw->sn));
            }
        }

        $this->updateWithdrawMoney($agent->id, $withdraw_money);
    }

    public function updateByManage($withdraw, $agent) {
        $service_fee    = $withdraw->service_fee;
        $withdraw_money = $withdraw->money;

        //更新代理统计
        StatisticService::instance()->statistic($agent->id, [
            'withdraw_num'   => 1,
            'withdraw_money' => $withdraw_money,
            'withdraw_fee'   => $service_fee
        ]);

        //更新系统统计
        SystemStatisticService::instance()->statistic([
            'withdraw_num'   => 1,
            'withdraw_money' => $withdraw_money,
            'withdraw_fee'   => $service_fee
        ]);

        $amount =  -floatval(Calc::add($withdraw_money, $service_fee, 2));
        //扣除金额
        $balance = $this->updateMoney($agent->id, $amount);

        //写入日志
        MoneyLogService::instance()->created($agent, $amount, $balance, $withdraw->sn, 'withdraw', Lang::format('common.withdraw.manage_money', $withdraw->sn));

        $this->updateWithdrawMoney($agent->id, $withdraw_money);
    }
	
	public function notify($sn,$amount,$status,$remark){
		$withdraw = Withdraw::where('sn', $sn)->whereNotIn('status', [-1, 2]);
        $connection = $withdraw->getConnection();
        $connection->beginTransaction();
        try{
			//锁定提现数据
            $withdraw = $withdraw->lockForUpdate()->first();
			if (!$withdraw) {
				die('1');
                return false;
            }
			if($amount != $withdraw->really_money){
				die('2');
				return false;
			}
			
			if ($withdraw->service_fee_type == 2) {
                $agent = Agent::find($withdraw->agent_id);
            }
			$messages = Lang::get('admin.withdraw.validators');
            if ($status == 2) {
                if ($withdraw->service_fee_type == 1) {//从代付金额扣手续费
                    $withdraw_fee = Calc::add($withdraw->really_money, $withdraw->service_fee, 2);
                    if ($withdraw_fee != $withdraw->money) {
						die('3');
						return false;
                    }
                } else {//从代理余额扣手续费
                    if ($agent->money < $withdraw->service_fee) {
						die('4');
                        return false;
                    }
                    $withdraw->really_money = $withdraw->money;
                    $withdraw_fee = Calc::add($withdraw->money, $withdraw->service_fee, 2);
                }

				$payment_platforms[] = [
					'code'    => $withdraw->platform_code,
					'money'   => $withdraw->really_money * 100
				];

                foreach ($payment_platforms as $pindex => $payment_platform) {
                    $payment_platforms[$pindex]['balance'] = PaymentPlatformService::instance()->updateBalance($payment_platform['code'], $payment_platform['money'] / 100);
                }
				$withdraw->payment_platforms = $payment_platforms;
				
            }
			
			$withdraw->status = $status;
			$withdraw->operation_time = UTC_TIME;
			$withdraw->remark = $remark;
			$withdraw->save();
			if($status == 2){
				$this->updateByComplete($withdraw, $agent);
			}else{
				$this->updateByCancel($withdraw, $agent);
			}
			
			$connection->commit();
		}catch(\Exception $e){
            $connection->rollback();
            throw $e;
        }
	}
}