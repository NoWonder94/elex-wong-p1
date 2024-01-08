<?php 
namespace App\Application\Site\Api\Services;

use App\Application\Site\Api\Models\UserBonus;
use App\Application\Site\Api\Models\UserCoin;
use App\Models\Site\UserBonusStatistic;
use App\Application\Site\Api\Models\BonusTemplate; 
use App\Traits\UserTrait;
use App\Traits\BonusTemplateTrait;
use App\Services\System\IpRegionService;
use App\Services\Site\UserTradeService;
use App\Events\Site\TemplateEvent;
use App\Services\Site\UserGameService;
use App\Services\Site\UserBonusService as BaseUserBonusService;
use Helper, Lang, Event, Time, DB;

class UserBonusService extends BaseUserBonusService {
    use UserTrait;
    use BonusTemplateTrait;

    public function waitReceive($user) {
        $connection = DB::connection('site');
        $connection->beginTransaction();
        try {
            $sql = "UPDATE site_user_bonus_statistic AS ubs 
                    INNER JOIN (
                        SELECT ub.template_id, COUNT(ub.id) AS num FROM site_user_bonus AS ub 
                        WHERE ub.user_id = {$user->id} AND ub.status = 0 
                            AND ub.expired_time < " . UTC_TIME . " 
                        GROUP BY ub.template_id 
                        HAVING COUNT(ub.id) > 0
                    ) AS T ON T.template_id = ubs.template_id 
                    SET ubs.num = ubs.num - T.num 
                    WHERE ubs.user_id = {$user->id} AND ubs.day = 0";
            $connection->unprepared($sql);

            $sql = "UPDATE site_user_bonus_statistic AS ubs 
                    INNER JOIN (
                        SELECT ub.template_id, ub.create_date, COUNT(ub.id) AS num FROM site_user_bonus AS ub 
                        WHERE ub.user_id = {$user->id} AND ub.status = 0 
                            AND ub.expired_time < " . UTC_TIME . " 
                        GROUP BY ub.template_id, ub.create_date 
                        HAVING COUNT(ub.id) > 0
                    ) AS T ON T.template_id = ubs.template_id AND T.create_date = ubs.day 
                    SET ubs.num = ubs.num - T.num 
                    WHERE ubs.user_id = {$user->id}";
            $connection->unprepared($sql);

            UserBonus::where('user_id', $user->id)
                ->where('status', 0)
                ->where('expired_time', '<', UTC_TIME)
                ->update([
                    'status' => -1
                ]);
            $connection->commit();
        }catch(\Exception $e){
            $connection->rollback();
            throw $e;
        }
        
        return UserBonus::where('user_id', $user->id)
						->where('related_money', '<=', $user->balance)
                        ->where('status', 0)
                        ->disableQueryBigDB()
                        ->get();
    }

    public function getBonus($user, $bonusId) {
        $user_bonus = UserBonus::where('id', $bonusId)
                               ->where('user_id', $user->id)
							   ->where('related_money', '<=', $user->balance)
                               ->where('status', 0)
                               ->where('expired_time', '>', UTC_TIME)
                               ->disableQueryBigDB()
                               ->first();
        if (!$user_bonus) {
            $this->throwException('common.bonus.not_exist');
        }

        $list = [];
        $templates = BonusTemplate::whereIn('id', $user_bonus->template_ids)->get();
        foreach ($templates as $template) {
            //检测是否已经过期
            $expired_time = $template->rule['expired_day'] * 86400 + $user_bonus->create_time;
            if ($expired_time <= UTC_TIME) {
                continue;
            }

            $amounts = $this->getAmount($template, $user_bonus->related_money, 0);
            if ($amounts['amount'] <= 0) {
                continue;
            }

            $template = $template->toArray();
            $template['amounts'] = $amounts;
            $template['bouns_id'] = $user_bonus->id;
            $list[] = $template;
        }
        return $list;
    }

    public function receive($user, $bonusId, $templateId, $platform) {
        if($user->is_disabled_bonus == 1){
            $this->throwException('common.integral.disabled_bonus');
        }

        $user_game = UserGameService::instance()->getUserGame($user->id, $platform);
        if (!$user_game) {
            $this->throwException('common.game.platform_not_reg');
        }

        $platform_lib = GamePlatformService::instance()->getEnablePlatformByCode($platform);
        $platform = $platform_lib->getPlatformInfo();
        //如果游戏平台禁止转入时
        if ($platform->transfer_status == 1) {
            $this->throwException('common.user_transfer.platform_transfer_disable', 'platform');
        }

        $user_bonus = UserBonus::where('id', $bonusId)
                               ->where('user_id', $user->id)
                               ->where('status', 0)
                               ->where('expired_time', '>', UTC_TIME);

        $user_bonus->getConnection()->beginTransaction();
        try{

            $user_bonus = $user_bonus->lockForUpdate()->first();
            if (!$user_bonus) {
                $this->throwException('common.bonus.not_exist');
            }

            $template = BonusTemplate::where('id', $templateId)->first();
            //检测是否已经过期
            $expired_time = $template->rule['expired_day'] * 86400 + $user_bonus->create_time;
            if ($expired_time <= UTC_TIME) {
                $this->throwException('common.bonus.expired');
            }

            //检测平台
            if (!in_array($platform->code, $template->game_platform_code)) {
                $this->throwException('common.bonus.platform_error');
            }

            $amounts = $this->getAmount($template, $user_bonus->related_money, 0);
            if ($amounts['amount'] <= 0) {
                $this->throwException('common.bonus.balance_error');
            }

            $game_balance = $platform_lib->getBalance($user_game);
            //检测奖金
            if (!$this->checkByPlatform($user->id, $platform, $game_balance)) {
                $this->throwException('common.bonus.wait_complete');
            }

            $data = [
                'template_id' => $template->id,
                'game_platform_code' => $platform->code,
                'money' => $amounts['amount'],
                'bet_money' => $amounts['bet'],
                'receive_time' => UTC_TIME,
                'status' => 1
            ];

            UserBonus::where('id', $bonusId)->update($data);

            //更新会员统计
            $this->updateUserStatistic($user, 'bonus', $amounts['amount']);

            //更新游戏平台统计
            $this->updatePlatformStatistic($user->id, $user->site_id, $platform->code, 'bonus', $amounts['amount']);
            
            $data = [
                'type'               => 1,
                'game_platform_code' => $platform->code,
                'money'              => $user_bonus->related_money,
                'game_balance'       => $game_balance
            ];
            UserTransferService::instance()->add($user, $user_game, $platform_lib, $data, null, Lang::get('common.bonus_receive') . $user_bonus->sn);

            //更新游戏平台余额
            $platform_lib->deposit($user_game, $amounts['amount'], $user_bonus->sn);

            UserTradeService::instance()->create($user, $data['game_platform_code'], $data['money'], $user->balance, $user_bonus->sn, $user_bonus->getTable(), $data['status'], '');

            $user_bonus->getConnection()->commit();
            return true;
        } catch(\Exception $e){
            $user_bonus->getConnection()->rollback();
            throw $e;
        }
    }

    public function createByDeposit($user, $relatedType, $relatedKey, $relatedMoney) {
        $templates = $this->getBonusTemplates('deposit', $user, $relatedMoney, true);
        if (count($templates) < 1) {
            return;
        }

        //金币奖金
        if (isset($templates['type_1']['coin'])) {
            $this->createCoin($user, $relatedType, $relatedKey, $relatedMoney, current($templates['type_1']['coin']['list']));
        }

        $type = $user->is_deposit == 1 ? 'again' : 'first';
        //游戏平台奖金
        if (isset($templates['type_0'][$type])) {
            $expired_day = $templates['type_0'][$type]['expired_day'];

            $data = [
                'money'                 => 0,
                'related_money'         => $relatedMoney,
                'template_id'           => 0,
				'template_ids'          => implode(',', array_keys($templates['type_0'][$type]['list'])),
                'type'                  => $type,
                'bet_money'             => 0,
                'game_platform_code'    => '',
                'expired_time'          => $expired_day > 0 ? UTC_TIME + $expired_day * 86400 : 0,
                'receive_time'          => 0,
                'related_type'          => $relatedType,
                'related_key'           => $relatedKey,
                'status'                => 0,
            ];

            $this->create($user, $data);
        }
    }

    public function createCoin($user, $relatedType, $relatedKey, $relatedMoney, $template, $coin = 0) {
        $amounts = $this->getAmount($template, $relatedMoney, $coin);
        if ($amounts['amount'] <= 0) {
            return;
        }

        $types = [
            'user_deposit'  => 1,
            'sign_in'       => 4
        ];

        $data = [
            'type'          => $types[$relatedType],
            'template_id'   => $template->id,
            'related_money' => $relatedMoney,
            'related_type'  => $relatedType,
            'related_key'   => $relatedKey
        ];

        UserCoinService::instance()->create($user, $amounts['amount'], $data);
    }

    public function createByIntegral($user, $platform, $relatedType, $relatedKey, $relatedMoney, $money = 0) {
        $template = $this->getBonusTemplate('integral', $user, $platform, $relatedMoney, false);
        if (!$template) {
            return;
        }

        if (!$this->checkBonusTemplate($user, $template)) {
            return;
        }

        $amounts = $this->getAmount($template, $relatedMoney, $money);
        if ($amounts['amount'] <= 0) {
            return;
        }

        $data = [
            'money'                 => $amounts['amount'],
            'related_money'         => $relatedMoney,
            'type'                  => 'integral',
            'template_id'           => $template->id,
            'bet_money'             => $amounts['bet'],
            'game_platform_code'    => $platform,
            'expired_time'          => $template->rule['expired_day'] > 0 ? UTC_TIME + $template->rule['expired_day'] * 86400 : 0,
            'receive_time'          => UTC_TIME,
            'related_type'          => $relatedType,
            'related_key'           => $relatedKey,
            'status'                => 1,
        ];

        $this->create($user, $data);
    }  

	public function lists(int $userId, string $beginTime, string $endTime, string $platform, string $type, int $page = 1, int $pageSize = 20) {
		$list = UserBonus::where('user_id', $userId)->where('status', 1)->orderBy('create_time', 'DESC');

        $beginTime = Time::toTime($beginTime);
        $endTime   = Time::toTime($endTime);

        if ($beginTime > 0) {
            $list->where('create_time', '>=', $beginTime);
        }

        if ($endTime > 0) {
            $list->where('create_time', '<', $endTime + 86400);
        }

        if (!empty($type)) {
            $list->where('type', $type);
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