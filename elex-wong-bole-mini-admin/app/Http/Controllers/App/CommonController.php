<?php
namespace App\Http\Controllers\App;

use Illuminate\Http\Request;
use App\Models\Base\GameModel;
use App\Services\App\UserService;

class CommonController extends Controller
{

    /**
     * 游戏列表
     */
    public function getGameList(Request $request)
    {
        $this->validate($request, [
            'type' => 'nullable|integer|min:1'
        ]);
        $type = $request->query('type');
        
        if (! empty($type)) {
            $data = GameModel::selectAllByType($type)->all();
        } else {
            $data = GameModel::selectAll()->all();
        }
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 搜索玩家自动补全
     */
    public function searchPlayer(Request $request)
    {
        $this->validate($request, [
            'keyword' => 'nullable|string|max:60',
            'page_size' => 'nullable|integer|between:1,100'
        ]);
        $keyword = $request->query('keyword', '');
        $pageSize = $request->query('page_size', 10);
        
        $userService = new UserService();
        $collection = $userService->searchAutoList($this->orgId, $keyword, $pageSize);
        
        $data = $collection->isEmpty() ? [] : $collection->all();
        
        return $this->response->setResponseData($data)->getResponse();
    }
}