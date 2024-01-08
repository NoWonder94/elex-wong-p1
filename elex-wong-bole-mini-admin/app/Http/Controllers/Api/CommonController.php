<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Base\GameModel;
use App\Models\Agency\OrgModel;
use App\Services\App\UserService;
use App\Http\Resources\Agency\Org\ListResource as OrgListResource;

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
     * 获取总代理列表
     */
    public function getOrgSubList()
    {
        $orgId = $this->agent()->getOrgId();
        
        $data = OrgModel::selectByParentId($orgId)->all();
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 获取代理树
     */
    public function getOrgTree()
    {
        $orgId = $this->agent()->getOrgId();
        $dataList = OrgModel::selectAllById($orgId);

        
        $data['dataList'] = $dataList->all();
        $data['dataTree'] = new OrgListResource($dataList);
        
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
        $orgId = $this->agent()->getOrgId();
        
        $userService = new UserService();
        $collection = $userService->searchAutoList($orgId, $keyword, $pageSize);
        
        $data = $collection->isEmpty() ? [] : $collection->all();
        
        return $this->response->setResponseData($data)->getResponse();
    }
}