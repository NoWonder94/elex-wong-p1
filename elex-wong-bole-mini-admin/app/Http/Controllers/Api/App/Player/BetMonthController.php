<?php
namespace App\Http\Controllers\Api\App\Player;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\Controller;
use App\Http\Requests\App\Player\BetMonth\ListRequest;
use App\Http\Resources\App\Player\BetMonth\ListResource;
use App\Models\AppLog\Player\BetMonthModel;
use App\Services\App\Player\BetMonthService;
use App\Models\Base\GameModel;

class BetMonthController extends Controller
{

    /**
     * 玩家投注列表
     */
    public function getList(ListRequest $request)
    {
        $orgId = $this->agent()->getOrgId();
        $page = intval($request->query('page', 1));
        $pageSize = intval($request->query('page_size', 50));
        $order = $request->query('order', BetMonthModel::ORDER_TIMED_DESC);
        $param = $request->all();
        
        $betMonthService = new BetMonthService();
        list ($collection, $count, $sumTotal) = $betMonthService->selectList($orgId, $page, $pageSize, $param, $order);
        
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