<?php
namespace App\Services\Coin;

use App\Exceptions\Response\Service\ServiceException;
use App\Exceptions\Response\Service\ServiceCode;
use App\Models\Coin\AgencyModel as CoinAgencyModel;
use App\Models\Coin\AgencyRecordModel as CoinAgencyRecordModel;
use App\Models\Coin\Order\AgencyModel as OrderAgencyModel;
use App\Models\Agency\OrgModel;

class AgencyRecordService
{

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
    public function selectList($orgId, $page = 1, $pageSize = 50, $param = array(), $order = OrderAgencyModel::ORDER_ID_DESC)
    {
        $queryList = CoinAgencyRecordModel::dbTable('d');
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
        // 订单分类
        if (isset($param['order_classify']) && ! empty($param['order_classify'])) {
            $where[] = ['d.order_classify', $param['order_classify']];
        }
        
        // 查询数量
        $count = $queryCount->where($where)->count();
        // 构造语句
        $queryList->where($where)
            ->offset(($page - 1) * $pageSize)
            ->limit($pageSize);
        // 排序
        switch ($order) {
            case OrderAgencyModel::ORDER_ID_ASC:
                $queryList->orderBy('d.id', 'asc');
                break;
            case OrderAgencyModel::ORDER_ID_DESC:
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

    /**
     * 获取代理金币
     *
     * @param int $orgId            
     * @throws ServiceException
     * @return array
     */
    private function getCoinAgency($orgId)
    {
        if (! ($coin = CoinAgencyModel::findByOrgId($orgId)->shift())) {
            throw new ServiceException(ServiceCode::SERVICE_NOT_EXIST_DATA);
        }
        return $coin;
    }

    /**
     * 获取目标对象（代理）
     *
     * @param int $orgId            
     * @throws ServiceException
     * @return array
     */
    private function getTargetAgency($orgId)
    {
        if (! ($org = OrgModel::findById($orgId)->shift())) {
            throw new ServiceException(ServiceCode::SERVICE_NOT_EXIST_DATA);
        }
        return $org;
    }

    /**
     * 获取订单数据（代理）
     *
     * @param int $orderId            
     * @throws ServiceException
     * @return array
     */
    private function getOrderAgency($orderId)
    {
        if (! ($order = OrderAgencyModel::findById($orderId)->shift())) {
            throw new ServiceException(ServiceCode::SERVICE_NOT_EXIST_DATA);
        }
        return $order;
    }

    /**
     * 创建金币记录（代理）
     *
     * @param int $orgId            
     * @param int $targetId            
     * @param int $orderId            
     * @param int $type            
     * @throws ServiceException
     * @return void
     */
    public function createByAgency($orgId, $targetId, $orderId, $type)
    {
        $data['org_id'] = $orgId;
        // 转账类型
        $data['type'] = $type;
        
        // 目标对象
        $org = $this->getTargetAgency($targetId);
        $data['target_id'] = $org['id'];
        $data['target_name'] = $org['name'];
        
        // 金币数量
        $order = $this->getOrderAgency($orderId);
        if (in_array($type, [
            CoinAgencyRecordModel::TYPE_OUT,
            CoinAgencyRecordModel::TYPE_AGENCY_OUT,
            CoinAgencyRecordModel::TYPE_GAME_OUT
        ])) {
            $data['amount'] = - $order['amount'];
        } else {
            $data['amount'] = $order['amount'];
        }
        
        // 代理金币
        $coin = $this->getCoinAgency($orgId);
        $data['current'] = $coin['current'];
        
        // 代理订单
        $data['order_id'] = $orderId;
        $data['order_classify'] = CoinAgencyRecordModel::ORDER_CLASSIFY_AGENCY;
        
        // 创建金币记录
        if (! ($status = CoinAgencyRecordModel::create($data))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
    }

    /**
     * 创建金币记录（游戏）
     *
     * @param int $orgId            
     * @param int $targetId            
     * @param int $orderId            
     * @throws ServiceException
     * @return void
     */
    public function createByGame($orgId, $targetId, $orderId)
    {}
}