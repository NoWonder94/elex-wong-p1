<?php
namespace App\Http\Controllers\Api\App\Player;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\Controller;
use App\Http\Requests\App\Player\BetDay\ListRequest;
use App\Http\Resources\App\Player\BetDay\ListResource;
use App\Models\AppLog\Player\BetDayModel;
use App\Services\App\Player\BetDayService;
use App\Models\Base\GameModel;

class BetDayController extends Controller
{

    /**
     * 玩家投注列表
     */
    public function getList(ListRequest $request)
    {
        $orgId = $this->agent()->getOrgId();
        $page = intval($request->query('page', 1));
        $pageSize = intval($request->query('page_size', 50));
        $order = $request->query('order', BetDayModel::ORDER_TIMED_DESC);
        $param = $request->all();
        
        $betDayService = new BetDayService();
        list ($collection, $count, $sumTotal) = $betDayService->selectList($orgId, $page, $pageSize, $param, $order);
        
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