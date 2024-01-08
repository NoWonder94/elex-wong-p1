<?php
namespace App\Http\Controllers\Api\Agency;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\Controller;
use App\Services\App\SystemService;
use App\Models\Base\GameModel;

class GameController extends Controller
{

    /**
     * 获取代理游戏
     */
    public function getList(Request $request)
    {
        $this->validate($request, [
            'orgId' => 'required|int|min:1'
        ]);
        
        $orgId = $request->query('orgId');
        
        $systemService = new SystemService();
        // 屏蔽游戏
        $data['shieldIds'] = $systemService->getShieldGame($orgId);
        // 游戏列表
        $data['gameList'] = GameModel::selectAll()->all();
        
        return $this->response->setResponseData($data)->getResponse();
    }
}