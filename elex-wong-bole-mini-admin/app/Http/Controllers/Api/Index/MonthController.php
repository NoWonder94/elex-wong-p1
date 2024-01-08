<?php
namespace App\Http\Controllers\Api\Index;

use App\Http\Controllers\Api\Controller;
use App\Services\Index\StatsMonth\IndexService;

class MonthController extends Controller
{

    /**
     * 金币走势
     */
    public function getCoinLine()
    {
        $orgId = $this->agent()->getOrgId();
        
        $indexService = new IndexService();
        $collection = $indexService->selectCoinList($orgId);
        
        $data = $collection->isNotEmpty() ? $collection->all() : [];
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 玩家走势
     */
    public function getPlayerLine()
    {
        $orgId = $this->agent()->getOrgId();
        
        $indexService = new IndexService();
        $collection = $indexService->selectPlayerList($orgId);
        
        $data = $collection->isNotEmpty() ? $collection->all() : [];
        
        return $this->response->setResponseData($data)->getResponse();
    }
}