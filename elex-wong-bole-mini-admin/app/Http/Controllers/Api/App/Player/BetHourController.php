<?php
namespace App\Http\Controllers\Api\App\Player;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\Controller;
use App\Http\Requests\App\Player\BetHour\ListRequest;
use App\Http\Resources\App\Player\BetHour\ListResource;
use App\Models\AppLog\Player\BetHourModel;
use App\Services\App\Player\BetHourService;
use App\Models\Base\GameModel;

class BetHourController extends Controller
{

    /**
     * 玩家投注列表
     */
    public function getList(ListRequest $request)
    {
        $orgId = $this->agent()->getOrgId();
        $page = intval($request->query('page', 1));
        $pageSize = intval($request->query('page_size', 50));
        $order = $request->query('order', BetHourModel::ORDER_TIMED_DESC);
        $param = $request->all();
        
        $betHourService = new BetHourService();
        list ($collection, $count, $sumTotal) = $betHourService->selectList($orgId, $page, $pageSize, $param, $order);
        
        $data['sum_total'] = $sumTotal;
        $data['count'] = [
            'total' => $count,
            'page' => $page,
            'page_size' => $pageSize
        ];
        $data['data'] = [];
        
        if ($collection->isNotEmpty()) {
            // 所有游戏
            $gameList = GameModel::selectAll()->all();
            // 制作数据
            $data['data'] = (new ListResource($collection))->setGameList($gameList);
        }
        
        return $this->response->setResponseData($data)->getResponse();
    }
}