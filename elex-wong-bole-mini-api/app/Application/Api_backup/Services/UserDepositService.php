<?php 
namespace App\Application\Site\Api\Services;

use App\Application\Site\Api\Models\User;
use App\Application\Site\Api\Models\UserDeposit; 
use App\Models\Site\Statistic;
use App\Services\System\IpRegionService;
use App\Services\Site\UserTradeService;
use App\Traits\UserTrait;
use App\Events\Site\UserDepositEvent;
use Illuminate\Database\Query\Expression; 
use Helper, Lang, Event, Time;

class UserDepositService extends BaseService {
    use UserTrait;

    public function lists(int $userId, string $beginTime, string $endTime, int $paymentId, int $status, int $page = 1, int $pageSize = 20) {
        $list = UserDeposit::where('user_id', $userId)->orderBy('create_time', 'DESC');

        $beginTime = Time::toTime($beginTime);
        $endTime   = Time::toTime($endTime);

        if ($beginTime > 0) {
            $list->where('create_time', '>=', $beginTime);
        }

        if ($endTime > 0) {
            $list->where('create_time', '<', $endTime + 86400);
        }

        if ($paymentId != 0) {
            $list->where('payment_id', $paymentId);
        }

        if ($status != 0) {
            $list->where('status', $status);
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

    public function create($user, $client, $data) {
        if($user->is_disabled_payment == 1){
            $this->throwException('common.deposit.disabled_payment');
        }
        
        $money = (float)$data['money'];
        if ($money <= 0) {
            $this->throwException('common.deposit.money_required');
        }

        $payment_service = PaymentService::instance();

        $payment = $payment_service->get($data['payment_id'], $client, $user);
        $payment_librarie = $payment_service->getLibrarie($payment);

        //检查数据
        $payment_librarie->checkCreate($user, $client, $money, $data);

        //格式化金额
        $money = $payment_librarie->formatMoney($money);

        //获取地理位置信息
        $ip_result = IpRegionService::instance()->getRegionByIp(CLIENT_IP);

        $user_deposit     = new UserDeposit();
        $user_deposit->sn = Helper::getSn();

        $user_deposit->getConnection()->beginTransaction();
        try{
            //锁定会员
            $this->lockUser($user->id);
            $user_deposit->site_id          = $user->site_id;
            $user_deposit->user_id          = $user->id;
            $user_deposit->user_name        = $user->name;
            $user_deposit->money            = $money;
            $user_deposit->fee              = $payment->fee > 0 ? $payment->fee * $money / 100 : 0;
            $user_deposit->payment_id       = $payment->id;
            $user_deposit->payment_type     = $payment->type;
            $user_deposit->payment_model    = $payment->model;
            $user_deposit->payment_code     = $payment->code;
            $user_deposit->payment_name     = $payment->name;
            $user_deposit->create_time      = UTC_TIME;
            $user_deposit->create_date      = UTC_DAY;
            $user_deposit->create_hour      = UTC_HOUR_STR;
            $user_deposit->ip               = CLIENT_IP;
            $user_deposit->country          = $ip_result['country'];
            $user_deposit->province         = $ip_result['province'];  
            $user_deposit->status           = 0;
            $user_deposit->save();

            try {
                $result = $payment_librarie->create($user, $user_deposit, $client, $data);
            } catch(\Exception $ex){
                $user_deposit->status = -1;
                $user_deposit->remark = $ex->getMessage();
                $payment_librarie->remove($user_deposit->sn);
            }
            
            UserTradeService::instance()->create($user, '', $money, $user->balance, $user_deposit->sn, $user_deposit->getTable(), $user_deposit->status, $user_deposit->remark);

            Event::fire(new UserDepositEvent('created', $user_deposit));
            $user_deposit->getConnection()->commit();

            if ($user_deposit->status == -1) {
                $this->throwException($user_deposit->remark);
            }
            return $result;
        } catch(\Exception $e){
            $user_deposit->getConnection()->rollback();
            $payment_librarie->remove($user_deposit->sn);
            throw $e;
        }
    }

    public function result(string $sn, int $status, float $money = 0, string $remark = '') {
        $user_deposit = UserDeposit::where('sn', $sn);
        if ($money > 0) {
            $user_deposit->where('money', $money);
        }
        $connection = $user_deposit->getModel()->getConnection();
        $connection->beginTransaction();

        try{
            //锁定存款数据
            $user_deposit = $user_deposit->lockForUpdate()->first();
            if (!$user_deposit) {
                $this->throwException('root::common.deposit_not_exist');
            }

            //锁定会员
            $this->lockUser($user_deposit->user_id);

            $data = [
                'pay_time' => UTC_TIME,
                'pay_date' => UTC_DAY,
                'pay_hour' => UTC_HOUR_STR,
                'status'   => $status
            ];

            if (!empty($remark)) {
                $data['remark'] = empty($user_deposit->remark) ? $remark : $user_deposit->remark . "；" .$remark;
            }

            $result = UserDeposit::where('id', $user_deposit->id)
                                 ->where('pay_time', 0)
                                 ->where('status', 0)
                                 ->update($data);
            if ($result > 0) {
                $balance = false;
                $update_time = 0;

                if ($status == 1) {
                    $balance = $this->updateBalance($user_deposit->user_id, 'balance', $user_deposit->money);
                    $update_time = UTC_TIME;

                    $user = UserService::instance()->get($user_deposit->user_id);
                    $this->updateUserStatistic($user, 'deposit', $user_deposit->money);
                    UserBonusService::instance()->createByDeposit($user, $user_deposit->getTable(), $user_deposit->sn, $user_deposit->money);

                    Event::fire(new UserDepositEvent('complete', $user_deposit));
                }

                UserTradeService::instance()->updateStatus($user_deposit->sn, $user_deposit->getTable(), $status  == 1 ? 1 : -1, $balance, $update_time);

                $connection->commit();
            }
            return true;
        } catch(\Exception $e){
            $connection->rollback();
            throw $e;
        }
    }

    public function getAvgTime() {
        $val = (int) Statistic::where('key', 'deposit_avg_time')->getOne('val');
        if ($val == 0) {
            return '--';
        }
        return Time::getTimelag($val, "i' s");
    }

    public function getSuccessRate() {
        return (float) Statistic::where('key', 'deposit_success_rate')->getOne('val');
    }
}