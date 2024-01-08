<?php
namespace App\Services\Index\Stats;

use Illuminate\Support\Facades\DB;
use App\Models\Base\GameModel;
use App\Models\App\UserModel as AppUserModel;
use App\Models\Coin\AgencyModel as CoinAgencyModel;
use App\Models\View\Stats\AgencyModel as StatsAgencyModel;
use App\Models\Other\Stats\PlayerAgencyModel as StatsPlayerAgencyModel;
use App\Models\App\Daily\GameStatisticsModel as DailyGameStatisticsModel;
use App\Services\Postman\GameService as PostmanGameService;
use Helper\Timed;

class IndexService
{

    /**
     * 获取查询字段
     *
     * @return string
     */
    protected function makeCoinStatsFields()
    {
        return 'IFNULL(SUM(amount) + SUM(tree_amount), 0) as total_amount';
    }

    /**
     * 金币收益汇总
     *
     * @param int $orgId            
     * @return array
     */
    public function sumCoinByStats($orgId)
    {
        // 上月开始时间戳
        $monthPreTimed = Timed::getMonthPreTimed();
        // 当月开始时间戳
        $monthCurrentTimed = Timed::getMonthCurrentTimed();
        
        // 金币收益总计
        $data['amount_total'] = StatsAgencyModel::dbTable()->select(DB::raw($this->makeCoinStatsFields()))
            ->where('org_id', $orgId)
            ->get()
            ->pluck('total_amount')
            ->shift();
        // 当月金币收益
        $data['amount_month_current'] = StatsAgencyModel::dbTable()->select(DB::raw($this->makeCoinStatsFields()))
            ->where('org_id', $orgId)
            ->where('timed', '>=', $monthCurrentTimed)
            ->get()
            ->pluck('total_amount')
            ->shift();
        // 上月金币收益
        $data['amount_month_last'] = StatsAgencyModel::dbTable()->select(DB::raw($this->makeCoinStatsFields()))
            ->where('org_id', $orgId)
            ->where('timed', '>=', $monthPreTimed)
            ->where('timed', '<', $monthCurrentTimed)
            ->get()
            ->pluck('total_amount')
            ->shift();
        
        return $data;
    }

    /**
     * 获取查询字段
     *
     * @return string
     */
    protected function makeCoinAgencyFields()
    {
        return implode(',', [
            'IFNULL(total_in, 0) as total_in',
            'IFNULL(total_out, 0) as total_out',
            'IFNULL(current, 0) as current',
            'IFNULL(game, 0) as game',
            'IFNULL(agency, 0) as agency'
        ]);
    }

    /**
     * 代理金币汇总
     *
     * @param int $orgId            
     * @return array
     */
    public function sumCoinByAgency($orgId)
    {
        $data = CoinAgencyModel::dbTable()->select(DB::raw($this->makeCoinAgencyFields()))
            ->where('org_id', $orgId)
            ->get()
            ->shift();
        
        return $data ?: [
            'total_in' => 0,
            'total_out' => 0,
            'current' => 0,
            'game' => 0,
            'agency' => 0
        ];
    }

    /**
     * 计算玩家数量
     *
     * @param int $orgId            
     * @return array
     */
    public function countGamePlayer($orgId)
    {
        // 上月开始时间戳
        $monthPreTimed = Timed::getMonthPreTimed();
        // 当月开始时间戳
        $monthCurrentTimed = Timed::getMonthCurrentTimed();
        
        // 玩家总计
        $data['player_total'] = AppUserModel::dbTable()->where('operator_id', $orgId)->count();
        // 当月新增玩家
        $data['player_month_current'] = AppUserModel::dbTable()->where('operator_id', $orgId)
            ->where('create_time', '>=', $monthCurrentTimed)
            ->count();
        // 上月新增玩家
        $data['player_month_last'] = AppUserModel::dbTable()->where('operator_id', $orgId)
            ->where('create_time', '>=', $monthPreTimed)
            ->where('create_time', '<', $monthCurrentTimed)
            ->count();
        
        return $data;
    }

    /**
     * 获取游戏实时数据
     *
     * @param int $orgId            
     * @return array
     */
    public function countGameStatus($orgId)
    {
        $param['operator_id'][] = $orgId;
        
        $postmanGameService = new PostmanGameService();
        // 在线人数
        $data['amount_online'] = $postmanGameService->onlinePlayerCount($param)[$orgId];
        // 游戏人数
        $data['amount_playing'] = $postmanGameService->gamePlayerCount($param)[$orgId];
        // 机器人数量
        $data['amount_robot'] = $postmanGameService->gameRobotCount($param)[$orgId];
        
        return $data;
    }

    /**
     * 获取查询字段
     *
     * @return string
     */
    protected function makeCoinListFields()
    {
        return 'IFNULL(SUM(amount), 0) as amount,IFNULL(SUM(tree_amount), 0) as tree_amount,IFNULL(SUM(amount) + SUM(tree_amount), 0) as total_amount,timed';
    }

    /**
     * 游戏金币走势
     *
     * @param int $orgId            
     * @return \Illuminate\Support\Collection
     */
    public function selectCoinList($orgId)
    {
        // 查询数据
        return StatsAgencyModel::dbTable()->select(DB::raw($this->makeCoinListFields()))
            ->where('org_id', $orgId)
            ->groupBy('timed')
            ->orderBy('timed', 'desc')
            ->limit(1000)
            ->get();
    }

    /**
     * 获取查询字段
     *
     * @return string
     */
    protected function makePlayerListFields()
    {
        return 'newly,total,timed';
    }

    /**
     * 玩家人数走势
     *
     * @param int $orgId            
     * @return \Illuminate\Support\Collection
     */
    public function selectPlayerList($orgId)
    {
        // 查询数据
        return StatsPlayerAgencyModel::dbTable()->select(DB::raw($this->makePlayerListFields()))
            ->where('org_id', $orgId)
            ->orderBy('timed', 'desc')
            ->limit(1000)
            ->get();
    }

    /**
     * 获取查询字段
     *
     * @return string
     */
    protected function makeActiveListFields()
    {
        return 'sum(active_player_count) as amount,date_time as timed';
    }

    /**
     * 玩家活跃走势
     *
     * @param int $orgId            
     * @return array
     */
    public function selectActiveList($orgId)
    {
        $gameList = GameModel::selectAll();
        // 总计
        $data[0]['name'] = '总计';
        $data[0]['data'] = DailyGameStatisticsModel::dbTable()->select(DB::raw($this->makeActiveListFields()))
            ->where('operator_id', $orgId)
            ->groupBy('date_time')
            ->orderBy('date_time', 'desc')
            ->limit(100)
            ->get()
            ->all();
        // 分游戏
        foreach ($gameList as $game) {
            $data[$game['id']]['name'] = $game['name'];
            $data[$game['id']]['data'] = DailyGameStatisticsModel::dbTable()->select(DB::raw($this->makeActiveListFields()))
                ->where('operator_id', $orgId)
                ->where('game_id', $game['id'])
                ->groupBy('date_time')
                ->orderBy('date_time', 'desc')
                ->limit(100)
                ->get()
                ->all();
        }
        return $data;
    }
}