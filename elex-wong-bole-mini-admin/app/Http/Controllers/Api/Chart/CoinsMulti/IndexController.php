<?php
namespace App\Http\Controllers\Api\Chart\CoinsMulti;

use App\Http\Controllers\Api\Controller;
use App\Http\Requests\Chart\CoinsPlay\Stats\CoinListRequest;
use App\Http\Requests\Chart\CoinsPlay\Stats\AgencyListRequest;
use App\Http\Requests\Chart\CoinsPlay\Stats\GameListRequest;
use App\Models\Multi\Stats\AgencyModel as StatsAgencyModel;
use App\Models\Multi\Stats\AgencyGameModel as StatsAgencyGameModel;
use App\Services\Chart\CoinsMulti\Stats\ChartService;

class IndexController extends Controller
{

    /**
     * 获取金币数据【全部】
     */
    public function getCoinList(CoinListRequest $request)
    {
        $orgId = $this->agent()->getOrgId();
        $page = intval($request->query('page', 1));
        $pageSize = intval($request->query('page_size', 50));
        $order = $request->query('order', StatsAgencyModel::ORDER_TIMED_DESC);
        $param = $request->all();
        
        $chartService = new ChartService();
        list ($collection, $count, $sumTotal) = $chartService->selectCoinList($orgId, $page, $pageSize, $param, $order);
        
        $data['sum_total'] = $sumTotal;
        $data['count'] = [
            'total' => $count,
            'page' => $page,
            'page_size' => $pageSize
        ];
        $data['data'] = $collection->all();
        
        return $this->response->setResponseData($data)->getResponse();
    }
    
    /**
     * 获取金币数据【代理】
     *
     * @param int $orgId
     */
    public function getAgencyList(AgencyListRequest $request)
    {
        $this->validate($request, [
            'org_id' => 'nullable|integer|min:1'
        ]);
        
        $orgId = $this->agent()->getOrgId();
        $page = intval($request->query('page', 1));
        $pageSize = intval($request->query('page_size', 50));
        $order = $request->query('order', StatsAgencyModel::ORDER_TIMED_DESC);
        $param = $request->all();
        
        $chartService = new ChartService();
        list ($collection, $count, $sumTotal) = $chartService->selectAgencyList($orgId, $page, $pageSize, $param, $order);
        
        $data['sum_total'] = $sumTotal;
        $data['count'] = [
            'total' => $count,
            'page' => $page,
            'page_size' => $pageSize
        ];
        $data['data'] = $collection->all();
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 获取金币数据【游戏】
     *
     * @param int $gameId            
     */
    public function getGameList(GameListRequest $request)
    {
        $this->validate($request, [
            'game_id' => 'nullable|integer|min:1'
        ]);
        
        $orgId = $this->agent()->getOrgId();
        $page = intval($request->query('page', 1));
        $pageSize = intval($request->query('page_size', 50));
        $order = $request->query('order', StatsAgencyGameModel::ORDER_TIMED_DESC);
        $param = $request->all();
        
        $chartService = new ChartService();
        list ($collection, $count, $sumTotal) = $chartService->selectGameList($orgId, $page, $pageSize, $param, $order);
        
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