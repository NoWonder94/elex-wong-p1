<?php
namespace App\Services\App\Logs;

use Illuminate\Support\Facades\DB;
use App\Models\App\Multi\SettlementInfoModel;
use App\Models\AppLog\Multi\SettlementInfoModel as AppLogSettlementInfoModel;
use App\Exceptions\Response\Service\ServiceException;
use App\Exceptions\Response\Service\ServiceCode;
use App\Services\Agency\OrgService;
use Helper\Timed;

class MultiService
{

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
        // 30天前的数据查询备份表，且备份表存在
        if (isset($param['datetime']) && ! empty($param['datetime'])) {
            if ($param['datetime'][0] < Timed::getDayCurrentTimed(time() - 86400 * 30)) {
                if ($param['datetime'][1] > Timed::getDayNextTimed($param['datetime'][0])) {
                    throw new ServiceException(ServiceCode::SERVICE_DATE_RANGE_ERROR);
                } elseif (AppLogSettlementInfoModel::verifyBackFinish($param['datetime'][0])) {
                    $queryList = AppLogSettlementInfoModel::dbTableByTimed($param['datetime'][0], 'd');
                }
            }
        }
        $queryList = isset($queryList) ? $queryList : SettlementInfoModel::dbTable('d');
        $queryCount = clone $queryList;
        $queryTotal = clone $queryList;
        
        //获取所有可查询代理编号
        $all_org_ids = (new OrgService())->getAllIds($orgId);

        // 代理
        if (isset($param['org_id']) && in_array($param['org_id'], $all_org_ids)) {
            $where[] = ['d.operator_id', $param['org_id']];
        } else {
            $where[] = ['d.operator_id', $orgId];
        }

        // 时间
        if (isset($param['datetime']) && ! empty($param['datetime'])) {
            $where[] = ['d.create_time', '>=', $param['datetime'][0]];
            $where[] = ['d.create_time', '<=', $param['datetime'][1]];
        }
        // 游戏
        if (isset($param['game_id']) && ! empty($param['game_id'])) {
            $where[] = ['d.game_id', $param['game_id']];
        }
        // 场景
        if (isset($param['scene_id']) && ! empty($param['scene_id'])) {
            $where[] = ['d.scene_id', $param['scene_id']];
        }
        // 状态
        if (isset($param['status']) && ! empty($param['status'])) {
            $where[] = ['d.status', $param['status']];
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

        // 汇总统计
        $sumTotal = $this->sumTotal($where, $queryTotal);

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
            'IFNULL(SUM(gain_gold), 0) as gain_gold',
            'IFNULL(SUM(income_gold), 0) as income_gold',
            'IFNULL(SUM(bet_base), 0) as bet_base',
            'IFNULL(SUM(bet_num), 0) as bet_num',
            'IFNULL(SUM(bet_num_valid), 0) as bet_num_valid'
        ]);
    }

    /**
     * 汇总统计
     *
     * @param $where
     * @param $queryTotal
     * @return array
     */
    protected function sumTotal($where, $queryTotal)
    {
        return $queryTotal->select(DB::raw($this->makeSumTotalFields()))
            ->where($where)
            ->get()
            ->shift();
    }
}