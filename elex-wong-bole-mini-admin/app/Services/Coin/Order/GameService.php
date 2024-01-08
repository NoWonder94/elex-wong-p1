<?php
namespace App\Services\Coin\Order;

use Illuminate\Support\Facades\DB;
use App\Models\Coin\Order\GameModel as OrderGameModel;
use App\Models\Coin\Order\GameErrorModel as OrderGameErrorModel;

class GameService
{
    
    /**
     * 获取查询字段
     *
     * @return string
     */
    protected function makeFields()
    {
        return 'd.*';
    }
    
    /**
     * 获取查询字段（列表）
     *
     * @return string
     */
    protected function makeFieldList()
    {
        return implode(',', [
            $this->makeFields(),
            'de.cause as error_cause'
        ]);
    }
    
    /**
     * 获取列表数据
     *
     * @param int $orgId
     * @param int $page
     * @param int $pageSize
     * @param array $param
     * @param int $order
     * @return array(\Illuminate\Support\Collection, int)
     */
    public function selectList($orgId, $page = 1, $pageSize = 50, $param = array(), $order = OrderGameModel::ORDER_ID_DESC)
    {
        $queryList = OrderGameModel::dbTable('d');
        $queryCount = clone $queryList;
        
        $where[] = ['d.org_id', $orgId];
        // 时间
        if (isset($param['datetime']) && ! empty($param['datetime'])) {
            $where[] = ['d.created', '>=', $param['datetime'][0]];
            $where[] = ['d.created', '<=', $param['datetime'][1]];
        }
        // 类型
        if (isset($param['type']) && ! empty($param['type'])) {
            $where[] = ['d.type', $param['type']];
        }
        // 状态
        if (isset($param['status']) && ! empty($param['status'])) {
            $where[] = ['d.status', $param['status']];
        }
        // 搜索（玩家账号）
        if (isset($param['keyword']) && ! empty($param['keyword'])) {
            // $where[] = ['d.sn', 'like', '%' . $param['keyword'] . '%'];
            $where[] = ['d.org_player_account', $param['keyword']];
        }
        
        // 查询数量
        $count = $queryCount->where($where)->count();
        // 构造语句
        $queryList->select(DB::raw($this->makeFieldList()))
            ->leftJoin(OrderGameErrorModel::TABLENAME . ' as de', 'de.order_id', '=', 'd.id')
            ->where($where)
            ->offset(($page - 1) * $pageSize)
            ->limit($pageSize);
        // 排序
        switch ($order) {
            case OrderGameModel::ORDER_ID_ASC:
                $queryList->orderBy('d.id', 'asc');
                break;
            case OrderGameModel::ORDER_ID_DESC:
                $queryList->orderBy('d.id', 'desc');
                break;
            default:
                $queryList->orderBy('d.id', 'desc');
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
     * 汇总统计
     *
     * @param $where
     * @return array
     */
    protected function sumTotal($where)
    {
        return OrderGameModel::dbTable('d')->where($where)->sum('amount');
    }
}