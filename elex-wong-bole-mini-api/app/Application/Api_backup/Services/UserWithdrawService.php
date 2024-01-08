<?php 
namespace App\Application\Site\Api\Services;

use App\Application\Site\Api\Models\UserWithdraw;
use App\Models\Site\UserStatisticDay;
use App\Models\Site\Statistic;

use App\Services\System\IpRegionService;
use App\Services\Site\UserTradeService;
use App\Events\Site\TemplateEvent;
use App\Events\Site\UserWithdrawEvent;
use App\Traits\UserTrait;
use Helper, Lang, Event, Time;

class UserWithdrawService extends BaseService {
    use UserTrait;

    public function lists(int $userId, string $beginTime, string $endTime, int $status, int $page = 1, int $pageSize = 20) {
        $list = UserWithdraw::where('user_id', $userId)->orderBy('create_time', 'DESC');

        $beginTime = Time::toTime($beginTime);
        $endTime   = Time::toTime($endTime);

        if ($beginTime > 0) {
            $list->where('create_time', '>=', $beginTime);
        }

        if ($endTime > 0) {
            $list->where('create_time', '<', $endTime + 86400);
        }

        switch ($status) {
            case -1:
                $list->whereIn('status', [WITHDRAW_FAILED, WITHDRAW_REJECT, WITHDRAW_CANCLE]);
                break;
            
            case 1:
                $list->where('status', WITHDRAW_SUCCESS);
                break;
        }

        $max_count = 10000;
        $count = $list->count();
        
        if ($count > $max_count) {
            $count = $max_count;
        }

        $page = max(0, $page - 1);
        $offset = $page * $pageSize;
        if ($offset + $pageSize > $max_count) {
            $offset = $max_count - $pageSize;
        }

        $list = $list->offset($offset)->limit($pageSize)->get();
        return ['count' => $count, 'list' => $list];
    }

    public function create($user, $data) {
        if($user->is_disabled_withdrawal == 1){
            $this->throwException('common.withdraw.disabled_withdraw');
        }
        
        $money = (float)$data['money'];
        if ($user->balance < $money) {
            $this->throwException('common.withdraw.balance_error');
        }

        if($money < $user->userGroup->min_withdrawal_money) {
            $this->throwException(['common.withdraw.money_min_error', $user->userGroup->min_withdrawal_money]);
        }

        if($user->userGroup->max_withdrawal_money > 0 && $money > $user->userGroup->max_withdrawal_money) {
            $this->throwException(['common.withdraw.money_max_error', $user->userGroup->max_withdrawal_money]);
        }

        $now_withdrawal = UserWithdraw::where('user_id', $user->id)
                                      ->whereIn('status', [WITHDRAW_UNTREATED, WITHDRAW_VERIFY, WITHDRAW_VERIFY_SUCCESS])
                                      ->disableQueryBigDB()
                                      ->first();

        if($now_withdrawal){
            $this->throwException('common.withdraw.processing');
        }

        if ($user->userGroup->withdrawal_limit > 0) {
            $withdraw_num = UserStatisticDay::where('user_id', $user->id)
                                            ->where('day', UTC_DAY)
                                            ->getOne('withdraw_num');
            if ($withdraw_num >= $user->userGroup->withdrawal_limit) {
                $this->throwException(['common.withdraw.day_withdraw_num', $user->userGroup->withdrawal_limit]);
            }
        }

        $bank = UserBankService::instance()->get($user->id, $data['bank_id']);
        if (!$bank) {
            $this->throwException('common.withdraw.bank_error');
        }

        //获取地理位置信息
        $ip_result = IpRegionService::instance()->getRegionByIp(CLIENT_IP);

        $user_withdraw = new UserWithdraw();
        $user_withdraw->getConnection()->beginTransaction();
        try{
            //锁定会员
            $this->lockUser($user->id);

            $user_withdraw->sn               = Helper::getSn();
            $user_withdraw->site_id          = $user->site_id;
            $user_withdraw->user_id          = $user->id;
            $user_withdraw->user_name        = $user->name;
            $user_withdraw->proxy_id         = $user->proxy_id;
            $user_withdraw->proxy_name       = $user->proxy_name;
            $user_withdraw->money            = $money;
            $user_withdraw->balance          = $user->balance;
            $user_withdraw->bank_info        = $bank->getInfo($user->real_name);
            $user_withdraw->remark           = isset($data['remark']) ? $data['remark'] : '';
            $user_withdraw->status           = 0;
            $user_withdraw->create_time      = UTC_TIME;
            $user_withdraw->create_date      = UTC_DAY;
            $user_withdraw->create_hour      = UTC_HOUR_STR;
            $user_withdraw->ip               = CLIENT_IP;
            $user_withdraw->country          = $ip_result['country'];
            $user_withdraw->province         = $ip_result['province'];  
            $user_withdraw->save();

            $balance = $this->updateBalance($user->id, 'balance', -$user_withdraw->money);

            UserTradeService::instance()->create($user, '', -$money, $balance, $user_withdraw->sn, $user_withdraw->getTable(), 0);

            Event::fire(new UserWithdrawEvent('created', $user_withdraw));
            
            $user_withdraw->getConnection()->commit();
            return true;
        } catch(\Exception $e){
            $user_withdraw->getConnection()->rollback();
            throw $e;
        }
    }

    public function lockBalance($userId) {
        return UserWithdraw::where('user_id', $userId)
                           ->whereIn('status', [WITHDRAW_UNTREATED, WITHDRAW_VERIFY, WITHDRAW_VERIFY_SUCCESS])
                           ->disableQueryBigDB()
                           ->sum('money');
    }

    public function getAvgTime() {
        $val = (int) Statistic::where('key', 'withdraw_avg_time')->getOne('val');
        if ($val == 0) {
            return '--';
        }
        return Time::getTimelag($val, "i' s");
    }

    public function getSuccessRate() {
        return (float) Statistic::where('key', 'withdraw_success_rate')->getOne('val');
    }
}