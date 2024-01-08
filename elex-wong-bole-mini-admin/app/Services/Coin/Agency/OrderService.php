<?php
namespace App\Services\Coin\Agency;

use Illuminate\Support\Facades\DB;
use App\Exceptions\Response\Service\ServiceException;
use App\Exceptions\Response\Service\ServiceCode;
use App\Models\Coin\Order\AgencyModel as OrderAgencyModel;
use App\Models\Coin\Order\AgencyErrorModel as OrderAgencyErrorModel;
use App\Mappers\Coin\Agency\OrderMapper as AgencyOrderMapper;
use App\Services\Coin\AgencyService as CoinAgencyService;

class OrderService
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
    public function selectList($orgId, $page = 1, $pageSize = 50, $param = array(), $order = OrderAgencyModel::ORDER_ID_DESC)
    {
        $queryList = OrderAgencyModel::dbTable('d');
        $queryCount = clone $queryList;
        
        $where[] = ['d.sub_org_id', $orgId];
        // 时间
        if (isset($param['datetime']) && ! empty($param['datetime'])) {
            $where[] = ['d.created', '>=', $param['datetime'][0]];
            $where[] = ['d.created', '<=', $param['datetime'][1]];
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
        $dataMapper = new AgencyOrderMapper($request->all());
        $data = $dataMapper->make()->toArray();
        
        // 验证当前持有金币（提现）
        if ($data['type'] == OrderAgencyModel::TYPE_OUT) {
            $coinAgencyService = new CoinAgencyService();
            $coinAgencyService->verifyCoinCurrent($data['sub_org_id'], $data['amount']);
        }
        // 创建订单数据
        if (! ($id = OrderAgencyModel::create($data))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
        return $id;
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