<?php
namespace App\Http\Controllers\App\Cq9;

use App\Http\Controllers\App\Cq9\Controller;
use App\Services\App\Logs\IndexService as LogService;
use App\Models\App\SettlementLogModel;

class DetailController extends Controller
{

    public function index()
    {
        return view('app.cq9.detail');
    }

    /**
     * 获取游戏详情
     */
    public function getInfo()
    {
        $uid = $this->cq9()->getParam()['aux']['uid'];
        $gameId = $this->cq9()->getParam()['aux']['game_id'];
        $roomId = $this->cq9()->getParam()['aux']['room_id'];
        // CQ9 参数
        $data['cq9'] = $this->cq9()->getParam();
        
        $logService = new LogService();
        // 结算信息
        $data['item'] = $logService->getItem($uid, $gameId, $roomId);
        // 扩展信息【json解析】
        $data['item']['ext'] = empty($data['item']['ext']) ? [] : json_decode($data['item']['ext'], true);
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 获取玩家游戏明细
     */
    public function getPlayerRecord()
    {
        $uid = $this->cq9()->getParam()['aux']['uid'];
        $roomId = $this->cq9()->getParam()['aux']['room_id'];
        
        $data = SettlementLogModel::getPlayerRecord($uid, $roomId);
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 获取游戏回放
     */
    public function getPlayback()
    {
        $uid = $this->cq9()->getParam()['aux']['uid'];
        $reportId = $this->cq9()->getParam()['aux']['report_id'];
        
        $logService = new LogService();
        $data = $logService->getPlaybackByCq9($uid, $reportId);
        
        return $this->response->setResponseData($data)->getResponse();
    }
}