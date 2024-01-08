<?php 
namespace App\Application\Site\Api\Services;

use App\Services\Site\UserGameService;
use App\Services\System\IpRegionService;
use App\Services\Site\UserTradeService;

use App\Models\Site\UserStatisticDay;
use App\Application\Site\Api\Models\UserTransfer;

use App\Traits\UserTransferTrait;
use App\Traits\BonusTemplateTrait;

use App\Events\Site\TemplateEvent;
use Helper, Lang, Event, Time;

class UserTransferService extends BaseService {
    use UserTransferTrait;
    use BonusTemplateTrait;

    public function lists(int $userId, string $beginTime, string $endTime, string $platform, int $type, int $page = 1, int $pageSize = 20) {
        $list = UserTransfer::with('platform')->where('user_id', $userId)->orderBy('create_time', 'DESC');

        if (!empty($platform)) {
            $list->where('game_platform_code', $platform);
        }

        $beginTime = Time::toTime($beginTime);
        $endTime   = Time::toTime($endTime);
        if ($beginTime > 0) {
            $list->where('create_time', '>=', $beginTime);
        }

        if ($endTime > 0) {
            $list->where('create_time', '<', $endTime + 86400);
        }

        if ($type > 0) {
            $list->where('type', $type);
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

    public function add($user, $userGame, $platformLib, $data, $userTransfer = null, $remark = '') {
        if (!$userTransfer) {
            $userTransfer = new UserTransfer($data);
        }

        $userTransfer->sn                  = Helper::getSn();
        $userTransfer->site_id             = $user->site_id;
        $userTransfer->user_id             = $user->id;
        $userTransfer->user_name           = $user->name;
        $userTransfer->proxy_id            = $user->proxy_id;
        $userTransfer->proxy_name          = $user->proxy_name;
        $userTransfer->balance_before      = $user->balance;
        $userTransfer->balance_after       = $user->balance + ($userTransfer->type == 1 ? -$userTransfer->money : $userTransfer->money);
        $userTransfer->status              = 1;
        $userTransfer->create_time         = UTC_TIME;
        $userTransfer->create_date         = UTC_DAY;
        $userTransfer->create_hour         = UTC_HOUR_STR;
        $userTransfer->save();

        $money = $userTransfer->money;

        if ($userTransfer->type == 1) {//转入
            $balance = $this->updateBalance($user->id, 'balance', -$money);
            $this->updatePlatformStatistic($userTransfer->user_id, $userTransfer->site_id, $userTransfer->game_platform_code, 'deposit', $money);
            $money = -$money;
        } else {//转出
            $balance = $this->updateBalance($user->id, 'balance', $money);
            $this->updatePlatformStatistic($userTransfer->user_id, $userTransfer->site_id, $userTransfer->game_platform_code, 'withdraw', $money);
        }

        UserTradeService::instance()->create($user, $userTransfer->game_platform_code, $money, $balance, $userTransfer->sn, $userTransfer->getTable(), 1, $remark);

        if ($userTransfer->type == 1) {//转入
            $platformLib->deposit($userGame, $userTransfer->money, $userTransfer->sn);
        } else {//转出
            $platformLib->withdraw($userGame, $userTransfer->money, $userTransfer->sn);
        }
        return $userTransfer;
    }

    public function create($user, $data) {
        $money = (float)$data['money'];
        $type  = (int)$data['type'];
        if (!in_array($type, [1, 2])) {
            $this->throwException('common.transfer.type_required', 'type');
        }

        //如果为转入
        if ($type == 1 && $user->balance < $money) {
            $this->throwException('common.transfer.user_balance_error', 'moeny');
        }

        $platform_lib = GamePlatformService::instance()->getEnablePlatformByCode($data['platform']);

        $platform = $platform_lib->getPlatformInfo();
        //如果为转入，并且游戏平台禁止转入时
        if ($type == 1 && $platform->transfer_status == 1) {
            $this->throwException('common.transfer.platform_transfer_disable', 'platform');
        }

        $user_game = UserGameService::instance()->getUserGame($user->id, $platform->code);
        if (!$user_game) {
            $this->throwException('common.game.platform_not_reg');
        }

        $user_transfer = new UserTransfer();
        $user_transfer->getConnection()->beginTransaction();
        try{
            //锁定会员
            $this->lockUser($user->id);

            $game_balance = $platform_lib->getBalance($user_game);

            //检测奖金
            if (!$this->checkByPlatform($user->id, $platform, $game_balance)) {
                $this->throwException('common.bonus.wait_complete');
            }

            //如果为转出，检测游戏平台余额
            if ($type == 2 && $game_balance < $money) {
                $this->throwException('common.transfer.platform_balance_error', 'moeny');
            }
            
            $user_transfer->type                = $type;
            $user_transfer->game_platform_code  = $platform->code;
            $user_transfer->money               = $money;
            $user_transfer->game_balance        = $game_balance;

            $user_transfer = $this->add($user, $user_game, $platform_lib, [], $user_transfer);

            $user_transfer->getConnection()->commit();
            return true;
        } catch(\Exception $e){
            $user_transfer->getConnection()->rollback();
            throw $e;
        }
        return false;
    }
}