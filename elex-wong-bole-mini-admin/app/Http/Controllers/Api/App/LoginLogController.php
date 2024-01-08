<?php
namespace App\Http\Controllers\Api\App;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\Controller;
use App\Http\Requests\App\LoginLog\ListRequest;
use App\Http\Resources\App\LoginLog\ListResource;
use App\Models\App\LoginLogModel;
use App\Services\App\LoginLogService;
use App\Models\Base\GameModel;

class LoginLogController extends Controller
{

    /**
     * 游戏记录列表
     */
    public function getList(ListRequest $request)
    {
        $page = intval($request->query('page', 1));
        $pageSize = intval($request->query('page_size', 50));
        $order = $request->query('order', LoginLogModel::ORDER_ID_DESC);
        $param = $request->all();
        $orgId = $this->agent()->getOrgId();
        
        $loginLogService = new LoginLogService();
        list ($collection, $count) = $loginLogService->selectList($orgId, $page, $pageSize, $param, $order);
        
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