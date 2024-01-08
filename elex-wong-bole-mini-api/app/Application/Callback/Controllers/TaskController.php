<?php
namespace App\Application\Callback\Controllers;

use App\Models\Site;
use App\Models\Site\Proxy;
use App\Models\Site\User;
use App\Models\Site\ProxyLevel;
use App\Models\Site\ProxyLevelLog;
use App\Models\Site\ProxyCommission;
use App\Models\Site\UserMonthStatistics;
use App\Services\SiteService;
use App\Services\SystemConfigService;
use Illuminate\Database\Query\Expression;
use App\Application\Www\Services\ProxyCommissionService;
use App\Application\Api\Services\UserService;
use App\Application\Www\Services\ProxyLevelService;
use Request, Time, Http, Helper, DB, SiteCache;

class TaskController extends BaseController { 

    public function show() {   
        if (isset($_REQUEST['time'])){
            echo Time::toDate($_REQUEST['time'])."<br>";
            echo Time::toTime(Time::toDate($_REQUEST['time'], 'Y-m-01'));
        }
        echo "---------";
        if (isset($_REQUEST['date'])){
            echo Time::toTime($_REQUEST['date']);
        }
    }

    public function index() {   

        if (!isset($_REQUEST['test'])) {
            // exit;
        }

        file_put_contents(storage_path().'/logs/'.'task_'.APP_SITE_DOMAIN.'.log', '');
        
        echo '下次执行佣金计算时间'.Time::toDate(SiteCache::get('commission_update_time')).'<br>'; 
        
        //每天18点执行
        if (UTC_TIME > (int)SiteCache::get('commission_update_time') || true) {
            $time = time();
            self::commissionCalculate();
            file_put_contents(storage_path().'/logs/task/commissionCalculate.log', Time::toDate(UTC_TIME, 'Y-m-d H:i:s') . '====>总耗时：' . (time() - $time) . "\n", FILE_APPEND);
        }
        
        echo '下次投注统计计算时间'.Time::toDate(SiteCache::get('bet_calculate_time')).'<br>'; 

        //每天0点执行
        if (UTC_TIME > (int)SiteCache::get('bet_calculate_time')) {
            $time = time();
            self::betCalculate();
            file_put_contents(storage_path().'/logs/task/betCalculate.log', Time::toDate(UTC_TIME, 'Y-m-d H:i:s') . '====>总耗时：' . (time() - $time) . "\n", FILE_APPEND);
        }
        
        echo '下次有效会员统计计算时间'.Time::toDate(SiteCache::get('effect_user_time')).'<br>'; 

        //每天0点5分执行有效会员统计
        if (UTC_TIME > (int)SiteCache::get('effect_user_time')) {
            $time = time();
            self::effectUser();
            file_put_contents(storage_path().'/logs/task/effectUser.log', Time::toDate(UTC_TIME, 'Y-m-d H:i:s') . '====>总耗时：' . (time() - $time) . "\n", FILE_APPEND);
        } 
        
        echo '下次自动升级等级时间'.Time::toDate(SiteCache::get('auto_level_time')).'<br>'; 

        if ((int)SiteCache::get('auto_level_time') == 0) { 
            $lastDayTime = Time::getMonthLastDay() + 3600; 
            SiteCache::forever('auto_level_time', $lastDayTime); 
        }

        //每月1日0点执行代理等级调整
        if (UTC_TIME > (int)SiteCache::get('auto_level_time')) {
            $time = time();
            self::autoLevel();
            file_put_contents(storage_path().'/logs/task/autoLevel.log', Time::toDate(UTC_TIME, 'Y-m-d H:i:s') . '====>总耗时：' . (time() - $time) . "\n", FILE_APPEND);
        } 
        
        echo '下次修改等级时间'.Time::toDate(SiteCache::get('update_level_time')).'<br>'; 

        if ((int)SiteCache::get('update_level_time') == 0) { 
            $lastDayTime = Time::getMonthLastDay() + 7200; 
            SiteCache::forever('update_level_time', $lastDayTime); 
        }

        //每月1日1点修改等级
        if (UTC_TIME > (int)SiteCache::get('update_level_time')) {
            $time = time();
            self::updateLevel();
            file_put_contents(storage_path().'/logs/task/updateLevel.log', Time::toDate(UTC_TIME, 'Y-m-d H:i:s') . '====>总耗时：' . (time() - $time) . "\n", FILE_APPEND);
        } 
        
        echo "SUCCESS";
    }

    /**
     * 根据代理每日佣金 xxxxxx 数据库查询 满足每个等级的条件的代理, 更新代理的数据
     */
    public function autoLevel() { 
        $lastDayTime = Time::getMonthLastDay() ;
        //每月1日0点计算
        SiteCache::forever('auto_level_time', $lastDayTime);  
        //代理所有级别
        $proxyLevels = ProxyLevel::where('status', 1)->orderBy('commission_rate', 'ASC')->get();

        $proxys = Proxy::select('id', 'level_id', 'effective_user', 'month_profit') 
                      ->with('proxyLevel')
                      ->get(); 

        foreach ($proxys as $proxy) {
            ProxyLevelService::instance()->updateLevel($proxy, $proxyLevels);
        }

        //清理上个月的有效会员数量和月利润
        Proxy::where('id', '>', 0)->update(['effective_user' => 0, 'month_profit' => 0]);

    }


    /**
     * 替换代理等级，并生成日志
     */
    public function updateLevel() {
        $lastDayTime = Time::getMonthLastDay() + 3600;
        //每月1日1点计算
        SiteCache::forever('update_level_time', $lastDayTime); 
        //修改代理等级，并调整等级记录
        $proxys = Proxy::where('update_level_id', '>', 0)->select('id', 'level_id', 'update_level_id', 'update_level_time')->get();
        foreach ($proxys as $proxy) {
            try {
                DB::connection()->beginTransaction();  
                $proxyData = [
                    'level_id' => $proxy->update_level_id,
                    'update_level_id' => 0,
                    'update_level_time' => 0, 
                    'update_level_modifier' => ''
                ];
                Proxy::where('id', $proxy->id)->update($proxyData);
                $proxyLevelLog = new ProxyLevelLog();
                $proxyLevelLog->proxy_id = $proxy->id;
                $proxyLevelLog->level_id = $proxy->update_level_id;
                $proxyLevelLog->before_level_id = $proxy->level_id;
                $proxyLevelLog->update_time = $proxy->update_level_time;
                $proxyLevelLog->create_time = UTC_TIME;
                $proxyLevelLog->modifier = $proxy->update_level_modifier;
                $proxyLevelLog->save();
                DB::connection()->commit();
                
            } catch(\Exception $e) {
                DB::connection()->rollback(); 
                file_put_contents(storage_path().'/logs/a_task_updateLevel.log', print_r($e->getMessage(), 1).print_r($proxy, 1), FILE_APPEND); 
            } 
        }
    }


    /**
     * 有效会员计算
     */
    protected function effectUser() {
        //每天0点
        SiteCache::forever('effect_user_time', UTC_DAY + 86400 );
        $monthDeposit = SystemConfigService::instance()->getByCode('month_deposit');
        $monthBet = SystemConfigService::instance()->getByCode('month_bet');
        $monthDepositVal = isset($monthDeposit['val']) ? $monthDeposit['val'] : 0;
        $monthBetVal = isset($monthBet['val']) ? $monthBet['val'] : 0;
        // DB::connection()->enableQueryLog();
        $proxyEffectUsers = User::select('user.proxy_id')
                     ->addSelect(new Expression('COUNT(user.id) AS num'))
                     ->leftJoin('user_month_statistics', function($join) {
                        $join->on('user.id', '=', 'user_month_statistics.user_id');
                     }) 
                     ->leftJoin('proxy', function($join) {
                        $join->on('user.proxy_id', '=', 'proxy.id');
                     }) 
                     ->where('month_deposit_num', '>=', $monthDepositVal)
                     ->where('month_bet_num', '>=', $monthBetVal)
                     ->where('create_month', '=', Time::toTime(Time::toDate(UTC_TIME, 'Y-m-01')))
                     ->where('proxy_id', '>', 0)
                     ->groupBy('proxy_id')     
                     ->get();

        // var_dump(DB::getQueryLog()); 
        try {
            DB::connection()->beginTransaction(); 
            //更新代理的有效会员
            foreach ($proxyEffectUsers as $proxyInfo) {
                Proxy::where('id', $proxyInfo->proxy_id)->update(['effective_user'=>$proxyInfo->num]);
            }
            DB::connection()->commit();
        } catch(\Exception $e) {
            DB::connection()->rollback(); 
            file_put_contents(storage_path().'/logs/a_task_effectUser.log', print_r($e->getMessage(), 1), FILE_APPEND);
            throw $e;
        } 
    }

    /**
     * 投注额计算
     */
    public function betCalculate() { 
        //每天0点
        SiteCache::forever('bet_calculate_time', UTC_DAY + 86400);
        $create_date = UTC_DAY - 86400; 
        $dbInfo = DB::connection(APP_SITE_DOMAIN); 
        $betSql = "SELECT sum(bets) as total_bet, name FROM sky_user_game_bet as sugb LEFT JOIN sky_user as su on sugb.user_id = su.id where create_date = ".$create_date." and p_id > 0 group by user_id;";
        $betResult = $dbInfo->select($betSql); 
        try {
            DB::connection()->beginTransaction(); 

            for ($i = 0; $i < count($betResult); $i++) {   
                $userInfo = User::where('name', $betResult[$i]->name)->pluck('id');  
                $userId = isset($userInfo[0]) ? $userInfo[0] : 0;  
                if ($userId > 0) { 
                    $time = Time::toTime(Time::toDate($create_date, 'Y-m-01'));  
                    $userMonthStatistics = UserMonthStatistics::where('create_month', $time)->where('user_id', $userId)->first(); 
                    if ($userMonthStatistics) {
                        $data['month_bet_num'] = new Expression('month_bet_num + '.$betResult[$i]->total_bet);
                        UserMonthStatistics::where('id', $userMonthStatistics->id)->update($data);
                    } else {
                        $data['month_bet_num'] = $betResult[$i]->total_bet;
                        $data['create_month'] = $time;
                        $data['user_id'] = $userId;
                        UserMonthStatistics::insert($data);
                    }
                }  
            } 
            DB::connection()->commit();
        } catch(\Exception $e) {
            DB::connection()->rollback(); 
            file_put_contents(storage_path().'/logs/a_task_betCalculate.log', print_r($e->getMessage(), 1), FILE_APPEND);
            throw $e;
        } 
    }


    /**
     * 佣金计算
     *
     */
    private function commissionCalculate(){

        //每天下午6点
        SiteCache::forever('commission_update_time', UTC_DAY + 86400 + 64800);

        //判断是否有代理
        $proxyLists = Proxy::where('status', 1)->get()->toArray();
        if (count($proxyLists) <= 0) {
            echo "no lists";
            exit;
        }
        //查询不存在的代理编号
        $noExitsProxy = Proxy::where('status', '<>', 1)->pluck('id')->toArray();
        $site = SiteService::instance()->getByDomain(APP_SITE_DOMAIN);

        //获取更新时间
        if ($site->update_time == 0) {
            $updateTime = UTC_DAY - 86400*2;
        } else {
            $updateTime = $site->update_time;
        } 

        $subTime = UTC_DAY - 86400 - $updateTime; 

        $times = $subTime / 86400;    

        for ($i = 0; $i < $times; $i++) { 

            $startTime = $updateTime + 86400*($i + 1); 
 
            $endTime = $startTime + 86399;   

            //判断今日是否有发放佣金
            $proxyCommissions = ProxyCommission::where('give_time', $startTime)->get()->toArray();

            if (count($proxyCommissions) > 0){   
                continue;
            }

            $dbInfo = DB::connection(APP_SITE_DOMAIN); 
            
            if (empty($noExitsProxy)) { 
                //查询此代理的会员当日所有的投注和赔付
                $betSql = "SELECT sum(bets) as total_bet, sum(winning) as total_winning, p_id FROM sky_user_game_bet as sugb LEFT JOIN sky_user as su on sugb.user_id = su.id where create_time >= ".$startTime." and create_time <= ".$endTime." and p_id > 0 group by p_id;";

                //查询此代理的会员当日所有的奖金
                $bonusSql = "SELECT sum(money) as total_bonus, p_id FROM sky_user_bonus as sub LEFT JOIN sky_user as su on sub.user_id = su.id where create_time >= ".$startTime." and create_time <= ".$endTime." and p_id > 0 group by p_id;"; 

                //查询此代理的会员当日所有的返水
                $returnSql = "SELECT sum(money) as total_return, p_id FROM sky_user_integral as sui LEFT JOIN sky_user as su on sui.user_id = su.id where create_time >= ".$startTime." and create_time <= ".$endTime." and p_id > 0 group by p_id;"; 
            } else {
                //查询此代理的会员当日所有的投注和赔付
                $betSql = "SELECT sum(bets) as total_bet, sum(winning) as total_winning, p_id FROM sky_user_game_bet as sugb LEFT JOIN sky_user as su on sugb.user_id = su.id where create_time >= ".$startTime." and create_time <= ".$endTime." and p_id > 0 and p_id not in (".implode(',', $noExitsProxy).") group by p_id;";

                //查询此代理的会员当日所有的奖金
                $bonusSql = "SELECT sum(money) as total_bonus, p_id FROM sky_user_bonus as sub LEFT JOIN sky_user as su on sub.user_id = su.id where create_time >= ".$startTime." and create_time <= ".$endTime." and p_id > 0 and p_id not in (".implode(',', $noExitsProxy).") group by p_id;"; 

                //查询此代理的会员当日所有的返水
                $returnSql = "SELECT sum(money) as total_return, p_id FROM sky_user_integral as sui LEFT JOIN sky_user as su on sui.user_id = su.id where create_time >= ".$startTime." and create_time <= ".$endTime." and p_id > 0 and p_id not in (".implode(',', $noExitsProxy).") group by p_id;"; 
            }

            $betResult = $dbInfo->select($betSql);
            $bonusResult = $dbInfo->select($bonusSql);
            $returnResult = $dbInfo->select($returnSql);

            try {
                DB::connection()->beginTransaction();

                $fixed_percent = SystemConfigService::instance()->getByCode('fixed_percent');

                $fixed_percent_val = isset($fixed_percent['val']) ? $fixed_percent['val'] : 0;

                foreach ($proxyLists as $proxy) {    
                    $proxyLevel = ProxyLevel::where('id', $proxy['level_id'])->first();
                    if (empty($proxyLevel)){ 
                        continue;
                    }
                    $commission_rate_val = $proxyLevel->commission_rate;
                    $totalBet = 0;
                    $totalWinning = 0;
                    $totalBonus = 0;
                    $totalReturn = 0;
                    for ($j = 0; $j < count($betResult); $j++) { 
                        if ($proxy['id'] == $betResult[$j]->p_id) {
                            $totalBet = $betResult[$j]->total_bet;
                            $totalWinning = $betResult[$j]->total_winning;
                        }
                    }
                    for ($j = 0; $j < count($bonusResult); $j++) { 
                        if ($proxy['id'] == $bonusResult[$j]->p_id) {
                            $totalBonus = $bonusResult[$j]->total_bonus; 
                        }
                    }
                    for ($j = 0; $j < count($returnResult); $j++) { 
                        if ($proxy['id'] == $returnResult[$j]->p_id) {
                            $totalReturn = $returnResult[$j]->total_return; 
                        }
                    }
                    //利润计算
                    $profit = ProxyCommissionService::instance()->commissionCount($totalBet, $totalWinning, $totalBonus, $totalReturn, 0, $fixed_percent_val); 

                    $originalCommission = $profit * $commission_rate_val;

                    $proxyCommission = new ProxyCommission();
                    $proxyCommission->sn = Helper::getSn();
                    $proxyCommission->proxy_id = $proxy['id']; 
                    $proxyCommission->original_commission = $originalCommission; 
                    $proxyCommission->commission = $originalCommission; 
                    $proxyCommission->total_bet = $totalBet; 
                    $proxyCommission->total_winning = $totalWinning; 
                    $proxyCommission->total_bonus = $totalBonus;  
                    $proxyCommission->total_return = $totalReturn; 
                    $proxyCommission->fixed_percent = $fixed_percent_val; 
                    $proxyCommission->percent = $commission_rate_val; 
                    $proxyCommission->profit = $profit; 
                    $proxyCommission->status = 0; 
                    $proxyCommission->give_time = $startTime;
                    $proxyCommission->create_time = UTC_TIME; 
                    $proxyCommission->create_date = UTC_DAY; 
                    $proxyCommission->create_hour = UTC_HOUR_STR;
                    $proxyCommission->save();

                    $clearTime = Proxy::where('id', $proxy['id'])->pluck('clear_time');

                    $proxyData = [
                        'commission' => new Expression('commission + '.$originalCommission), 
                    ];

                    $lastMonthDayTime = Time::getMonthLastDay();

                    if ($clearTime[0] == 0) {
                        $proxyData['clear_time'] = $lastMonthDayTime;
                        $proxyData['month_profit'] = new Expression('month_profit + '.$profit);
                    } elseif ($clearTime[0] <= $lastMonthDayTime){
                        $proxyData['month_profit'] = new Expression('month_profit + '.$profit);
                    } else {
                        $proxyData['month_profit'] = 0;
                    }
                    Proxy::where('id', $proxy['id'])
                         ->update($proxyData); 
                }
                //存储上次采集的时间天
                Site::where('domain', APP_SITE_DOMAIN)->update(['update_time' => $startTime]);
                DB::connection()->commit();
            } catch(\Exception $e) {
                DB::connection()->rollback(); 
                file_put_contents(storage_path().'/logs/a_task_commissionCalculate', print_r($e->getMessage(), 1), FILE_APPEND);
                throw $e;
            }
        }
    }

}
