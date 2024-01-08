<?php
namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\Controller;
use Illuminate\Http\Request;
use App\Models\Agency\Auth\GroupModel;
use App\Services\Agency\Auth\GroupService;
use App\Http\Requests\Auth\Group\ItemRequest;

class GroupController extends Controller
{

    /**
     * 获取权限组列表
     */
    public function getList(Request $request)
    {
        $orgId = $this->agent()->getOrgId();

        $data = GroupModel::selectByOrgId($orgId)->all();
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 保存数据
     *
     * @param int $id            
     * @param \Illuminate\Http\Request $request            
     */
    public function saveItem(ItemRequest $request)
    {
        $orgId = $this->agent()->getOrgId();
        $id = $request->post('id', null);
        
        $groupService = new GroupService();
        $number = $groupService->saveItem($orgId, $request, $id);
        
        // 查询当前节点数据
        $data = GroupModel::findById($id ?: $number)->shift();
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 删除数据（一条）
     *
     * @param int $id            
     */
    public function destroy(Request $request)
    {
        $this->validate($request, [
            'id' => 'required|integer|min:1'
        ]);
        
        $data['id'] = $id = $request->post('id');
        
        $groupService = new GroupService();
        $groupService->destroy($id);
        
        return $this->response->setResponseData($data)->getResponse();
    }
}