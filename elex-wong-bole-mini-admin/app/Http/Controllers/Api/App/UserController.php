<?php
namespace App\Http\Controllers\Api\App;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\Controller;
use App\Models\App\UserModel;
use App\Services\App\UserService;
use App\Http\Requests\App\User\ItemRequest;
use App\Http\Requests\App\User\ListRequest;
use App\Models\Base\GameModel;
use App\Http\Resources\App\User\DetailResource;

class UserController extends Controller
{

    /**
     * 用户列表
     *
     * @param int $page            
     * @param int $page_size            
     * @param int $status            
     * @param string $keyword            
     * @param int $order            
     */
    public function getList(ListRequest $request)
    {
        $orgId = $this->agent()->getOrgId();
        $page = intval($request->query('page', 1));
        $pageSize = intval($request->query('page_size', 50));
        $order = $request->query('order', UserModel::ORDER_SIGNIN_DESC);
        $param = $request->all();
        
        $userService = new UserService();
        list ($collection, $count, $sumTotal) = $userService->selectList($orgId, $page, $pageSize, $param, $order);
        
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
     * 获取玩家信息
     */
    public function getPlayerDetail(Request $request)
    {
        $this->validate($request, [
            'id' => 'required|integer|min:1'
        ]);
        $id = $request->query('id');
        
        $userService = new UserService();
        $collection = $userService->getPlayerDetail($id);
        
        if ($collection->isNotEmpty()) {
            // 所有游戏
            $gameList = GameModel::selectAll()->all();
            // 制作数据
            $data = (new DetailResource($collection))->setGameList($gameList);
        } else {
            $data = [];
        }
        
        return $this->response->setResponseData($data)->getResponse();
    }
    
    /**
     * 保存玩家信息
     *
     * @param ItemRequest $request
     */
    public function save(ItemRequest $request)
    {
        $userService = new UserService();
        $userService->save($request);
        
        return $this->response->getResponse();
    }
}