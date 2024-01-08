<?php
namespace App\Http\Controllers\Api\App\Game\Sangong;

use App\Http\Controllers\Api\Controller;
use App\Services\App\Game\Sangong\IndexService;

class IndexController extends Controller
{

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
}