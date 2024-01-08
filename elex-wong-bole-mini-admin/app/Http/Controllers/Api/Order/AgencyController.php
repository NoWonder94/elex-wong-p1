<?php
namespace App\Http\Controllers\Api\Order;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\Controller;
use App\Models\Coin\Order\AgencyModel as OrderAgencyModel;
use App\Services\Coin\Order\AgencyService as OrderAgencyService;
use App\Http\Requests\Order\Agency\ItemRequest;
use App\Http\Requests\Order\Agency\ListRequest;

class AgencyController extends Controller
{

    /**
     * 数据列表
     *
     * @param int $page            
     * @param int $page_size            
     * @param int $status            
     * @param string $keyword            
     * @param int $order            
     */
    public function getList(ListRequest $request)
    {
        $orgId = $this->agent()->getOrgId();
        
        $page = intval($request->query('page', 1));
        $pageSize = intval($request->query('page_size', 50));
        $order = $request->query('order', OrderAgencyModel::ORDER_ID_DESC);
        $param = $request->all();
        
        $orderAgencyService = new OrderAgencyService();
        list ($collection, $count) = $orderAgencyService->selectList($orgId, $page, $pageSize, $param, $order);
        
        $data['count'] = [
            'total' => $count,
            'page' => $page,
            'page_size' => $pageSize
        ];
        $data['data'] = $collection->all();
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 创建数据
     */
    public function create(ItemRequest $request)
    {
        $orderAgencyService = new OrderAgencyService();
        $data['id'] = $orderAgencyService->create($request);
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 处理订单
     */
    public function handle(Request $request)
    {
        $this->validate($request, [
            'id' => 'required|integer|min:1'
        ]);
        $data['id'] = $id = $request->post('id');
        
        // 处理订单
        $orderAgencyService = new OrderAgencyService();
        $orderAgencyService->handle($id);
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 取消订单
     */
    public function cancel(Request $request)
    {
        $this->validate($request, [
            'id' => 'required|integer|min:1'
        ]);
        $data['id'] = $id = $request->post('id');
        
        // 取消订单
        $orderAgencyService = new OrderAgencyService();
        $orderAgencyService->cancel($id);
        
        return $this->response->setResponseData($data)->getResponse();
    }
}