<?php
namespace App\Services\Chart\CoinsPlay\StatsMonth;

use Illuminate\Support\Facades\DB;
use App\Models\Play\StatsMonth\AgencyModel as StatsMonthAgencyModel;
use App\Models\Play\StatsMonth\AgencyGameModel as StatsMonthAgencyGameModel;
use App\Models\Agency\OrgModel;
use App\Models\Base\GameModel;

class ChartService
{

    /**
     * 获取查询字段
     *
     * @return string
     */
    protected function makeCoinFields()
    {
        return 'd.bet_num,d.income,d.robot_gain,d.amount,d.tree_bet_num,d.tree_income,d.tree_robot_gain,d.tree_amount,d.timed';
    }

    /**
     * 获取金币数据【全部】
     *
     * @param int $orgId            
     * @param int $page            
     * @param int $pageSize            
     * @param array $param            
     * @param int $order            
     * @return array(\Illuminate\Support\Collection, int)
     */
    public function selectCoinList($orgId, $page = 1, $pageSize = 50, $param = array(), $order = StatsMonthAgencyModel::ORDER_TIMED_DESC)
    {
        $queryList = StatsMonthAgencyModel::dbTable('d');
        $queryCount = clone $queryList;
        
        $where[] = ['d.org_id', $orgId];
        // 时间
        if (isset($param['datetime']) && ! empty($param['datetime'])) {
            $where[] = ['d.timed', $param['datetime']];
        }
        
        // 查询数量
        $count = $queryCount->where($where)->count();
        // 构造语句
        $queryList->select(DB::raw($this->makeCoinFields()))
            ->where($where)
            ->offset(($page - 1) * $pageSize)
            ->limit($pageSize);
        // 排序
        switch ($order) {
            case StatsMonthAgencyModel::ORDER_TIMED_ASC:
                $queryList->orderBy('d.timed', 'asc');
                break;
            case StatsMonthAgencyModel::ORDER_TIMED_DESC:
                $queryList->orderBy('d.timed', 'desc');
                break;
            default:
                $queryList->orderBy('d.timed', 'desc');
        }
        // 查询数据
        $collection = $queryList->get();
        
        return array(
            $collection,
            $count
        );
    }
    
    /**
     * 获取查询字段
     *
     * @return string
     */
    protected function makeAgencyFields()
    {
        return 'd.org_id,o.name as org_name,d.bet_num,d.income,d.robot_gain,d.amount,d.tree_bet_num,d.tree_income,d.tree_robot_gain,d.tree_amount,d.timed';
    }
    
    /**
     * 获取金币数据【代理】
     *
     * @param int $orgId
     * @param int $page
     * @param int $pageSize
     * @param array $param
     * @param int $order
     * @return array(\Illuminate\Support\Collection, int)
     */
    public function selectAgencyList($orgId, $page = 1, $pageSize = 50, $param = array(), $order = StatsMonthAgencyModel::ORDER_TIMED_DESC)
    {
        $queryList = StatsMonthAgencyModel::dbTable('d');
        $queryCount = clone $queryList;
        
        $where = [];
        // 时间
        if (isset($param['datetime']) && ! empty($param['datetime'])) {
            $where[] = ['d.timed', $param['datetime']];
        }
        // 游戏
        if (isset($param['org_id']) && ! empty($param['org_id'])) {
            $orgIds = [$param['org_id']];
        } else {
            $orgIds = OrgModel::selectByParentId($orgId)->pluck('id')->all();
        }
        
        // 查询数量
        $count = $queryCount->whereIn('d.org_id', $orgIds)->where($where)->count();
        // 构造语句
        $queryList->select(DB::raw($this->makeAgencyFields()))
            ->join(OrgModel::TABLENAME . ' as o', 'o.id', '=', 'd.org_id')
            ->whereIn('d.org_id', $orgIds)
            ->where($where)
            ->offset(($page - 1) * $pageSize)
            ->limit($pageSize);
        // 排序
        switch ($order) {
            case StatsMonthAgencyModel::ORDER_TIMED_ASC:
                $queryList->orderBy('d.timed', 'asc')->orderBy('d.org_id', 'asc');
                break;
            case StatsMonthAgencyModel::ORDER_TIMED_DESC:
                $queryList->orderBy('d.timed', 'desc')->orderBy('d.org_id', 'asc');
                break;
            default:
                $queryList->orderBy('d.timed', 'desc')->orderBy('d.org_id', 'asc');
        }
        // 查询数据
        $collection = $queryList->get();
        
        return array(
            $collection,
            $count
        );
    }
    
    /**
     * 获取查询字段
     *
     * @return string
     */
    protected function makeGameFields()
    {
        return 'd.game_id,g.name as game_name,d.bet_num,d.income,d.robot_gain,d.amount,d.tree_bet_num,d.tree_income,d.tree_robot_gain,d.tree_amount,d.timed';
    }
    
    /**
     * 获取金币数据【游戏】
     *
     * @param int $orgId     
     * @param int $page            
     * @param int $pageSize            
     * @param array $param            
     * @param int $order            
     * @return array(\Illuminate\Support\Collection, int)
     */
    public function selectGameList($orgId, $page = 1, $pageSize = 50, $param = array(), $order = StatsMonthAgencyGameModel::ORDER_TIMED_DESC)
    {
        $queryList = StatsMonthAgencyGameModel::dbTable('d');
        $queryCount = clone $queryList;
        
        $where[] = ['d.org_id', $orgId];
        // 时间
        if (isset($param['datetime']) && ! empty($param['datetime'])) {
            $where[] = ['d.timed', $param['datetime']];
        }
        // 游戏
        if (isset($param['game_id']) && ! empty($param['game_id'])) {
            $where[] = ['d.game_id', $param['game_id']];
        }
        
        // 查询数量
        $count = $queryCount->where($where)->count();
        // 构造语句
        $queryList->select(DB::raw($this->makeGameFields()))
            ->join(GameModel::TABLENAME . ' as g', 'g.id', '=', 'd.game_id')
            ->where($where)
            ->offset(($page - 1) * $pageSize)
            ->limit($pageSize);
        // 排序
        switch ($order) {
            case StatsMonthAgencyModel::ORDER_TIMED_ASC:
                $queryList->orderBy('d.timed', 'asc')->orderBy('d.game_id', 'asc');
                break;
            case StatsMonthAgencyModel::ORDER_TIMED_DESC:
                $queryList->orderBy('d.timed', 'desc')->orderBy('d.game_id', 'asc');
                break;
            default:
                $queryList->orderBy('d.timed', 'desc')->orderBy('d.game_id', 'asc');
        }
        // 查询数据
        $collection = $queryList->get();
        
        return array(
            $collection,
            $count
        );
    }
}