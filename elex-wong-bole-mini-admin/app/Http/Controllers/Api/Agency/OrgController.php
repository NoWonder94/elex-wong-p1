<?php
namespace App\Http\Controllers\Api\Agency;

use App\Http\Controllers\Api\Controller;
use Illuminate\Http\Request;
use App\Models\Agency\OrgModel;
use App\Services\Agency\OrgService;
use App\Http\Requests\Agency\Org\ItemRequest;
use App\Http\Resources\Agency\Org\ListResource;

class OrgController extends Controller
{
    
    /**
     * 获取父级数据
     */
    public function getParent(Request $request)
    {
        $orgId = $this->agent()->getOrgId();
        
        $orgService = new OrgService();
        $data = $orgService->findParent($orgId);
        
        return $this->response->setResponseData($data)->getResponse();
    }
    
    /**
     * 获取子代理列表
     */
    public function getSubList(Request $request)
    {
        $orgId = $this->agent()->getOrgId();
        
        $data = OrgModel::selectByParentId($orgId)->all();
        
        return $this->response->setResponseData($data)->getResponse();
    }
    
    /**
     * 获取组织架构列表
     */
    public function getList(Request $request)
    {
        $orgId = $this->agent()->getOrgId();

        $dataList = OrgModel::selectAllById($orgId);
        
        $data = new ListResource($dataList);
        
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
        $id = $request->post('id', null);
        
        $orgService = new OrgService();
        $number = $orgService->saveItem($request, $id);
        
        // 查询当前节点数据
        $data = OrgModel::findById($id ?: $number)->shift();
        
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
        
        $orgService = new OrgService();
        $orgService->destroy($id);
        
        return $this->response->setResponseData($data)->getResponse();
    }
}