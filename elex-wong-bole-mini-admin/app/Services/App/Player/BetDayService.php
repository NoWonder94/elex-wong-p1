<?php
namespace App\Services\App\Player;

use Illuminate\Support\Facades\DB;
use App\Models\AppLog\Player\BetDayModel;

class BetDayService {
    
    /**
     * 获取查询字段
     *
     * @return string
     */
    protected function makeListFields()
    {
        return 'd.*';
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
    public function selectList($orgId, $page = 1, $pageSize = 50, $param = array(), $order = BetDayModel::ORDER_TIMED_DESC)
    {
        $queryList = BetDayModel::dbTable('d');
        $queryCount = clone $queryList;
        
        $where[] = ['d.org_id', $orgId];
        // 时间
        if (isset($param['datetime']) && ! empty($param['datetime'])) {
            $where[] = ['d.timed', '>=', $param['datetime'][0]];
            $where[] = ['d.timed', '<=', $param['datetime'][1]];
        }
        // 游戏
        if (isset($param['game_id']) && ! empty($param['game_id'])) {
            $where[] = ['d.game_id', $param['game_id']];
        }
        // 场景
        if (isset($param['scene_id']) && ! empty($param['scene_id'])) {
            $where[] = ['d.scene_id', $param['scene_id']];
        }
        // 搜索
        if (isset($param['keyword']) && ! empty($param['keyword'])) {
            $where[] = ['d.account_id', $param['keyword']];
        }
        
        // 查询数量
        $count = $queryCount->where($where)->count();
        // 构造语句
        $queryList->select(DB::raw($this->makeListFields()))
            ->where($where)
            ->offset(($page - 1) * $pageSize)
            ->limit($pageSize);
        // 排序
        switch ($order) {
            case BetDayModel::ORDER_TIMED_ASC:
                $queryList->orderBy('d.timed', 'asc');
                break;
            case BetDayModel::ORDER_TIMED_DESC:
                $queryList->orderBy('d.timed', 'desc');
                break;
            default:
                $queryList->orderBy('d.timed', 'desc');
        }
        // 查询数据
        $collection = $queryList->get();

        // 汇总统计
        $sumTotal = $this->sumTotal($where);

        return array(
            $collection,
            $count,
            $sumTotal
        );
    }

    /**
     * 获取查询字段
     *
     * @return string
     */
    protected function makeSumTotalFields()
    {
        return implode(',', [
            'IFNULL(SUM(number), 0) as number',
            'IFNULL(SUM(bet_base), 0) as bet_base',
            'IFNULL(SUM(bet_num), 0) as bet_num',
            'IFNULL(SUM(gain_gold), 0) as gain_gold',
            'IFNULL(SUM(income_gold), 0) as income_gold'
        ]);
    }

    /**
     * 汇总统计
     *
     * @param $where
     * @return array
     */
    protected function sumTotal($where)
    {
        return BetDayModel::dbTable('d')->select(DB::raw($this->makeSumTotalFields()))
            ->where($where)
            ->get()
            ->shift();
    }
}