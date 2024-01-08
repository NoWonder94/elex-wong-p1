<?php
namespace App\Http\Controllers\Api\Index;

use App\Http\Controllers\Api\Controller;
use App\Services\Index\Stats\IndexService;

class IndexController extends Controller
{

    /**
     * 金币收益汇总
     */
    public function getCoinStats()
    {
        $orgId = $this->agent()->getOrgId();
        
        $indexService = new IndexService();
        $data = $indexService->sumCoinByStats($orgId);
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 代理金币汇总
     */
    public function getCoinAgency()
    {
        $orgId = $this->agent()->getOrgId();
        
        $indexService = new IndexService();
        $data = $indexService->sumCoinByAgency($orgId);
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 计算玩家数量
     */
    public function getGamePlayer()
    {
        $orgId = $this->agent()->getOrgId();
        
        $indexService = new IndexService();
        $data = $indexService->countGamePlayer($orgId);
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 游戏实时数据
     */
    public function getGameStatus()
    {
        $orgId = $this->agent()->getOrgId();
        
        $indexService = new IndexService();
        $data = $indexService->countGameStatus($orgId);
        
        return $this->response->setResponseData($data)->getResponse();
    }

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

    /**
     * 玩家活跃走势
     */
    public function getActiveLine()
    {
        $orgId = $this->agent()->getOrgId();
        
        $indexService = new IndexService();
        $data = $indexService->selectActiveList($orgId);
        
        return $this->response->setResponseData($data)->getResponse();
    }
}