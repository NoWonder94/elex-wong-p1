<?php
namespace App\Services\App;

use Illuminate\Support\Facades\DB;
use App\Models\App\LoginLogModel;

class LoginLogService {
    
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
     * 获取登录记录数据
     *
     * @param int $orgId
     * @param int $page
     * @param int $pageSize
     * @param array $param
     * @param int $order
     * @return array(\Illuminate\Support\Collection, int)
     */
    public function selectList($orgId, $page = 1, $pageSize = 50, $param = array(), $order = LoginLogModel::ORDER_ID_DESC)
    {
        $queryList = LoginLogModel::dbTable('d');
        $queryCount = clone $queryList;
        
        $where[] = ['d.operator_id', $orgId];
        // 时间
        if (isset($param['datetime']) && ! empty($param['datetime'])) {
            $where[] = ['d.create_time', '>=', $param['datetime'][0]];
            $where[] = ['d.create_time', '<=', $param['datetime'][1]];
        }
        // 游戏
        if (isset($param['game_id']) && ! empty($param['game_id'])) {
            if ($param['game_id'] > 0) {
                $where[] = ['d.game_id', $param['game_id']];
            } else {
                $where[] = ['d.game_id', '<=' , 0];
            }
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
            case LoginLogModel::ORDER_ID_ASC:
                $queryList->orderBy('d.id', 'asc');
                break;
            case LoginLogModel::ORDER_ID_DESC:
                $queryList->orderBy('d.id', 'desc');
                break;
            default:
                $queryList->orderBy('d.id', 'desc');
        }
        // 查询数据
        $collection = $queryList->get();

        return array(
            $collection,
            $count
        );
    }
}