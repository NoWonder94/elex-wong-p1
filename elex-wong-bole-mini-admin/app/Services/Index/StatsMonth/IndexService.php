<?php
namespace App\Services\Index\StatsMonth;

use Illuminate\Support\Facades\DB;
use App\Models\View\StatsMonth\AgencyModel as StatsMonthAgencyModel;
use App\Models\Other\StatsMonth\PlayerAgencyModel as StatsMonthPlayerAgencyModel;
use Helper\Timed;

class IndexService
{

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
        return StatsMonthAgencyModel::dbTable()->select(DB::raw($this->makeCoinListFields()))
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
        return StatsMonthPlayerAgencyModel::dbTable()->select(DB::raw($this->makePlayerListFields()))
            ->where('org_id', $orgId)
            ->orderBy('timed', 'desc')
            ->limit(1000)
            ->get();
    }
}