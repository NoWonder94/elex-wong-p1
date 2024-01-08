<?php 
namespace App\Application\Site\Api\Services;

use App\Services\Site\UserGameService;
use App\Application\Site\Api\Models\UserIntegral;
use App\Traits\UserTrait;
use Helper, Time;

class UserIntegralService extends BaseService {
    use UserTrait;

    public function getPlatformIntegral($userId, $platform) {
        $user_game = UserGameService::instance()->getUserGame($userId, $platform);
        if (!$user_game) {
            $this->throwException('common.game.platform_not_reg');
        }
        return $user_game->integral;
    }

    public function exchange($user, $data) {
        if($user->is_disabled_bonus == 1){
            $this->throwException('common.integral.disabled_bonus');
        }

        $user_game = UserGameService::instance()->getUserGame($user->id, $data['platform']);
        if (!$user_game) {
            $this->throwException('common.game.platform_not_reg');
        }

        $amount = (float)$data['amount'];

        if (bccomp($user_game->integral, $amount) < 0) {
            $this->throwException('common.integral.integral_error');
        }

        //计算兑换后的奖金  
        $money = round(bcdiv($amount, $user->userGroup->integral_exchange_ratio, 3), 2);
        if($money <= 0){
            $this->throwException('common.integral.integral_error');
        }

        $platform_lib = GamePlatformService::instance()->getEnablePlatformByCode($data['platform']);
        $platform = $platform_lib->getPlatformInfo();
        //如果游戏平台禁止转入时
        if ($platform->transfer_status == 1) {
            $this->throwException('common.transfer.platform_transfer_disable', 'platform');
        }

        $user_integral = new UserIntegral();
        $user_integral->getConnection()->beginTransaction();
        try{
            //锁定会员
            $this->lockUser($user->id);

            $game_balance = $platform_lib->getBalance($user_game);
            $user_bonus_service = UserBonusService::instance();

            //检测奖金
            if (!$user_bonus_service->checkByPlatform($user->id, $platform, $game_balance)) {
                $this->throwException('common.bonus.wait_complete');
            }

            //扣除积分
            $integral_balance = UserGameService::instance()->updateIntegral($user->id, $platform->code, -$amount);

            $user_integral->sn                  = Helper::getSn();
            $user_integral->site_id             = $user->site_id;
            $user_integral->user_id             = $user->id;
            $user_integral->user_name           = $user->name;
            $user_integral->game_platform_code  = $platform->code;
            $user_integral->type                = 2;
            $user_integral->integral            = $amount;
            $user_integral->integral_balance    = $integral_balance;
            $user_integral->money               = $money;
            $user_integral->balance             = $game_balance;
            $user_integral->exchange_ratio      = $user->userGroup->bonus_ratio;
            $user_integral->status              = 1;
            $user_integral->create_time         = UTC_TIME;
            $user_integral->create_date         = UTC_DAY;
            $user_integral->create_hour         = UTC_HOUR_STR;
            $user_integral->save();

            //更新会员统计
            $this->updateUserStatistic($user, 'integral_bonus', $money);

            //更新游戏平台统计
            $this->updatePlatformStatistic($user->id, $user->site_id, $platform->code, 'integral_bonus', $money);

            //创建奖金
            $user_bonus_service->createByIntegral($user, $platform->code, $user_integral->getTable(), $user_integral->sn, $amount, $user_integral->money);

            //更新游戏平台余额
            $platform_lib->deposit($user_game, $money, $user_integral->sn);

            $user_integral->getConnection()->commit();
            return true;
        } catch(\Exception $e){
            $user_integral->getConnection()->rollback();
            throw $e;
        }
    }

    public function lists(int $userId, string $beginTime, string $endTime, string $platform, int $type, int $page = 1, int $pageSize = 20) {
        $list = UserIntegral::where('user_id', $userId)->orderBy('create_time', 'DESC');

        $beginTime = Time::toTime($beginTime);
        $endTime   = Time::toTime($endTime);

        if ($beginTime > 0) {
            $list->where('create_time', '>=', $beginTime);
        }

        if ($endTime > 0) {
            $list->where('create_time', '<', $endTime + 86400);
        }

        if ($type > 0) {
            $list->where('type', $type - 1);
        }

        if (!empty($platform)) {
            $list->where('game_platform_code', $platform);
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
}