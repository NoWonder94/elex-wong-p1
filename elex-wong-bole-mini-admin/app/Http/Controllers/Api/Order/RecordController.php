<?php
namespace App\Http\Controllers\Api\Order;

use App\Http\Controllers\Api\Controller;
use App\Http\Requests\Order\Record\ListRequest;
use App\Models\Coin\AgencyRecordModel as CoinAgencyRecordModel;
use App\Services\Coin\AgencyRecordService as CoinAgencyRecordService;

class RecordController extends Controller
{

    /**
     * 数据列表
     *
     * @param int $page            
     * @param int $page_size            
     * @param array $datetime            
     * @param string $keyword            
     * @param int $order            
     */
    public function getList(ListRequest $request)
    {
        $orgId = $this->agent()->getOrgId();
        
        $page = intval($request->query('page', 1));
        $pageSize = intval($request->query('page_size', 50));
        $order = $request->query('order', CoinAgencyRecordModel::ORDER_ID_DESC);
        $param = $request->all();
        
        $coinAgencyRecordService = new CoinAgencyRecordService();
        list ($collection, $count) = $coinAgencyRecordService->selectList($orgId, $page, $pageSize, $param, $order);
        
        $data['count'] = [
            'total' => $count,
            'page' => $page,
            'page_size' => $pageSize
        ];
        $data['data'] = $collection->all();
        
        return $this->response->setResponseData($data)->getResponse();
    }
}