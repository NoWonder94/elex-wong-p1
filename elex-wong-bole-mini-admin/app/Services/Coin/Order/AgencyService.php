<?php
namespace App\Services\Coin\Order;

use Illuminate\Support\Facades\DB;
use App\Exceptions\Response\Service\ServiceException;
use App\Exceptions\Response\Service\ServiceCode;
use App\Models\Coin\Order\AgencyModel as OrderAgencyModel;
use App\Models\Coin\Order\AgencyErrorModel as OrderAgencyErrorModel;
use App\Mappers\Coin\Order\AgencyMapper as OrderAgencyMapper;
use App\Models\Agency\OrgModel;
use App\Services\Coin\AgencyService as CoinAgencyService;
use App\Services\Coin\AgencyRecordService as CoinAgencyRecordService;
use App\Models\Coin\AgencyRecordModel as CoinAgencyRecordModel;

class AgencyService
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
            'o.name as sub_org_name,de.cause as error_cause'
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
    public function selectList($orgId, $page = 1, $pageSize = 50, $param = array(), $order = OrderAgencyModel::ORDER_ID_DESC)
    {
        $queryList = OrderAgencyModel::dbTable('d');
        $queryCount = clone $queryList;
        
        $where[] = ['d.sup_org_id', $orgId];
        // 时间
        if (isset($param['datetime']) && ! empty($param['datetime'])) {
            $where[] = ['d.created', '>=', $param['datetime'][0]];
            $where[] = ['d.created', '<=', $param['datetime'][1]];
        }
        // 代理
        if (isset($param['org_id']) && ! empty($param['org_id'])) {
            $where[] = ['d.sub_org_id', $param['org_id']];
        }
        // 来源
        if (isset($param['source']) && ! empty($param['source'])) {
            $where[] = ['d.source', $param['source']];
        }
        // 类型
        if (isset($param['type']) && ! empty($param['type'])) {
            $where[] = ['d.type', $param['type']];
        }
        // 状态
        if (isset($param['status']) && ! empty($param['status'])) {
            $where[] = ['d.status', $param['status']];
        }
        // 搜索（订单号）
        if (isset($param['keyword']) && ! empty($param['keyword'])) {
            $where[] = ['d.sn', 'like', '%' . $param['keyword'] . '%'];
        }
        
        // 查询数量
        $count = $queryCount->where($where)->count();
        // 构造语句
        $queryList->select(DB::raw($this->makeFieldList()))
            ->join(OrgModel::TABLENAME . ' as o', 'o.id', '=', 'd.sub_org_id')
            ->leftJoin(OrderAgencyErrorModel::TABLENAME . ' as de', 'de.order_id', '=', 'd.id')
            ->where($where)
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
     * 创建数据
     *
     * @param \Illuminate\Http\Request $request            
     * @throws ServiceException
     * @return id
     */
    public function create($request)
    {
        // 数据映射
        $dataMapper = new OrderAgencyMapper($request->all());
        $data = $dataMapper->make()->toArray();
        
        $coinAgencyService = new CoinAgencyService();
        // 充值提现金币数量验证
        if ($data['type'] == OrderAgencyModel::TYPE_OUT) {
            // 验证当前持有金币（自己）
            $coinAgencyService->verifyCoinCurrent($data['sub_org_id'], $data['amount']);
        } else {
            // 验证当前持有金币（父级）
            $coinAgencyService->verifyCoinCurrent($data['sup_org_id'], $data['amount']);
        }
        // 创建订单数据
        if (! ($id = OrderAgencyModel::create($data))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
        return $id;
    }

    /**
     * 订单处理（充值、提现）
     *
     * @param int $id            
     * @throws ServiceException
     * @return void
     */
    public function handle($id)
    {
        // 获取订单数据
        if (! ($order = OrderAgencyModel::findById($id)->shift())) {
            throw new ServiceException(ServiceCode::SERVICE_NOT_EXIST_DATA);
        }
        // 判断订单是否已处理
        if ($order['status'] != OrderAgencyModel::STATUS_START) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_DISABLE);
        }
        
        try {
            // 订单充值
            if ($order['type'] == OrderAgencyModel::TYPE_IN) {
                $this->orderIn($order);
            }
            // 订单提现
            if ($order['type'] == OrderAgencyModel::TYPE_OUT) {
                $this->orderOut($order);
            }
        } catch (\Throwable $e) {
            // 修改订单状态（失败）
            OrderAgencyModel::update($order['id'], [
                'status' => OrderAgencyModel::STATUS_ERROR
            ]);
            // 记录错误原因
            OrderAgencyErrorModel::create($order['id'], $e);
            // 继续抛出异常（Api提示）
            throw $e;
        }
    }

    /**
     * 订单充值（事务回滚）
     *
     * @param array $order            
     * @throws ServiceException
     * @return void
     */
    private function orderIn($order)
    {
        DB::transaction(function () use ($order) {
            // 代理金币充值
            $coinAgencyService = new CoinAgencyService();
            // 子级（加）
            $coinAgencyService->coinIn($order['sub_org_id'], $order['amount']);
            // 父级（减）
            $coinAgencyService->coinInAgency($order['sup_org_id'], $order['amount']);
            
            // 金币转账记录
            $coinAgencyRecordService = new CoinAgencyRecordService();
            // 子级（充值）
            $coinAgencyRecordService->createByAgency($order['sub_org_id'], $order['sup_org_id'], $order['id'], CoinAgencyRecordModel::TYPE_IN);
            // 父级（发放代理）
            $coinAgencyRecordService->createByAgency($order['sup_org_id'], $order['sub_org_id'], $order['id'], CoinAgencyRecordModel::TYPE_AGENCY_OUT);
            
            // 修改订单状态（成功）
            if (! ($status = OrderAgencyModel::update($order['id'], [
                'status' => OrderAgencyModel::STATUS_SUCCES
            ]))) {
                throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
            }
        });
    }

    /**
     * 订单提现（事务回滚）
     *
     * @param array $order            
     * @throws ServiceException
     * @return void
     */
    private function orderOut($order)
    {
        DB::transaction(function () use ($order) {
            // 代理金币提现
            $coinAgencyService = new CoinAgencyService();
            // 子级（减）
            $coinAgencyService->coinOut($order['sub_org_id'], $order['amount']);
            // 父级（加）
            $coinAgencyService->coinOutAgency($order['sup_org_id'], $order['amount']);
            
            // 金币转账记录
            $coinAgencyRecordService = new CoinAgencyRecordService();
            // 子级（提现）
            $coinAgencyRecordService->createByAgency($order['sub_org_id'], $order['sup_org_id'], $order['id'], CoinAgencyRecordModel::TYPE_OUT);
            // 父级（代理提现）
            $coinAgencyRecordService->createByAgency($order['sup_org_id'], $order['sub_org_id'], $order['id'], CoinAgencyRecordModel::TYPE_AGENCY_IN);
            
            // 修改订单状态（成功）
            if (! ($status = OrderAgencyModel::update($order['id'], [
                'status' => OrderAgencyModel::STATUS_SUCCES
            ]))) {
                throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
            }
        });
    }
    
    /**
     * 取消订单
     *
     * @param int $id
     * @throws ServiceException
     * @return boolean
     */
    public function cancel($id)
    {
        // 获取订单数据
        if (! ($order = OrderAgencyModel::findById($id)->shift())) {
            throw new ServiceException(ServiceCode::SERVICE_NOT_EXIST_DATA);
        }
        // 判断订单是否已处理
        if ($order['status'] != OrderAgencyModel::STATUS_START) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_DISABLE);
        }
        // 取消订单
        if (! ($number = OrderAgencyModel::update($id, [
            'status' => OrderAgencyModel::STATUS_CANCEL
        ]))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
        return (boolean) $number;
    }
}