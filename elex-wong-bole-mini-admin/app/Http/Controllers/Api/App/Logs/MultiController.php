<?php
namespace App\Http\Controllers\Api\App\Logs;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\Controller;
use App\Http\Requests\App\Log\ListRequest;
use App\Http\Resources\App\Log\ListResource;
use App\Services\App\Logs\MultiService as LogService;
use App\Models\App\Multi\SettlementInfoModel;
use App\Models\App\Multi\SettlementLogModel;
use App\Models\Agency\OrgModel;
use App\Models\Base\GameModel;

class MultiController extends Controller
{

    /**
     * 游戏记录列表
     */
    public function getList(ListRequest $request)
    {
        $orgId = $this->agent()->getOrgId();
        $page = intval($request->query('page', 1));
        $pageSize = intval($request->query('page_size', 50));
        $order = $request->query('order', SettlementInfoModel::ORDER_ID_DESC);
        $param = $request->all();
        
        $logService = new LogService();
        list ($collection, $count, $sumTotal) = $logService->selectList($orgId, $page, $pageSize, $param, $order);
        
        $data['sum_total'] = $sumTotal;
        $data['count'] = [
            'total' => $count,
            'page' => $page,
            'page_size' => $pageSize
        ];
        $data['data'] = [];
        
        if ($collection->isNotEmpty()) {
            // 所有代理
            $orgList = OrgModel::selectAllById($orgId)->all();
            // 所有游戏
            $gameList = GameModel::selectAll()->all();
            // 制作数据
            $data['data'] = (new ListResource($collection))->setOrgList($orgList)->setGameList($gameList);
        }
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 获取游戏详情
     */
    public function getRecordDetails(Request $request)
    {
        $this->validate($request, [
            'report_id' => 'required|string|min:1'
        ]);
        $reportId = $request->query('report_id');
        
        $data = SettlementLogModel::getRecordDetails($reportId);
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 获取玩家游戏明细
     */
    public function getPlayerRecord(Request $request)
    {
        $this->validate($request, [
            'uid' => 'required|integer|min:1',
            'report_id' => 'required|string|min:1'
        ]);
        $uid = $request->query('uid');
        $reportId = $request->query('report_id');
        
        $data = SettlementLogModel::getPlayerRecord($uid, $reportId);
        
        return $this->response->setResponseData($data)->getResponse();
    }
}