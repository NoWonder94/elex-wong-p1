<?php
namespace App\Http\Controllers\Api\Order;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\Controller;
use App\Models\Coin\Order\GameModel as OrderGameModel;
use App\Services\Coin\Order\GameService as OrderGameService;
use App\Http\Requests\Order\Game\ListRequest;

class GameController extends Controller
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
        $order = $request->query('order', OrderGameModel::ORDER_ID_DESC);
        $param = $request->all();
        
        $orderGameService = new OrderGameService();
        list ($collection, $count, $sumTotal) = $orderGameService->selectList($orgId, $page, $pageSize, $param, $order);
        
        $data['sum_total'] = $sumTotal;
        $data['count'] = [
            'total' => $count,
            'page' => $page,
            'page_size' => $pageSize
        ];
        $data['data'] = $collection->all();
        
        return $this->response->setResponseData($data)->getResponse();
    }
}