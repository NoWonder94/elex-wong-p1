<?php
namespace App\Services\App\Game\Mahjong;

use Illuminate\Support\Facades\DB;
use App\Models\App\SettlementInfoModel;
use App\Models\Base\GameModel;

class LogService {
    
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
    public function selectList($orgId, $page = 1, $pageSize = 50, $param = array(), $order = SettlementInfoModel::ORDER_ID_DESC)
    {
        $queryList = SettlementInfoModel::dbTable('d');
        $queryCount = clone $queryList;
        
        $where[] = ['d.operator_id', $orgId];
        $where[] = ['d.game_id', GameModel::GAME_ID_MAHJONG];
        $where[] = ['d.user_type', SettlementInfoModel::USER_TYPE_PLAYER];
        // 时间
        if (isset($param['datetime']) && ! empty($param['datetime'])) {
            $where[] = ['d.create_time', '>=', $param['datetime'][0]];
            $where[] = ['d.create_time', '<=', $param['datetime'][1]];
        }
        // 搜索
        if (isset($param['keyword']) && ! empty($param['keyword'])) {
            if ($param['keyword_type'] == SettlementInfoModel::KEYWORD_TYPE_ACCOUNT) {
                $where[] = ['d.account_id', $param['keyword']];
            } elseif ($param['keyword_type'] == SettlementInfoModel::KEYWORD_TYPE_ROOM) {
                $where[] = ['d.room_id', $param['keyword']];
            }
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
            case SettlementInfoModel::ORDER_ID_ASC:
                $queryList->orderBy('d.id', 'asc');
                break;
            case SettlementInfoModel::ORDER_ID_DESC:
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