<?php
namespace App\Http\Controllers\Api\Agency;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\Controller;
use App\Services\Agency\AccessKeyService;
use App\Http\Requests\Agency\AccessKey\ItemStatusRequest;

class AccessKeyController extends Controller
{

    /**
     * 获取详情数据
     *
     * @param int $org_id
     */
    public function getDetail(Request $request)
    {
        $this->validate($request, [
            'org_id' => 'required|integer|min:1'
        ]);
        $orgId = $request->query('org_id');
        
        $accessKeyService = new AccessKeyService();
        $data = $accessKeyService->findDetail($orgId)->shift();
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 创建数据
     *
     * @param int $org_id            
     */
    public function create(Request $request)
    {
        $this->validate($request, [
            'org_id' => 'required|integer|min:1'
        ]);
        
        $orgId = $request->post('org_id');
        
        $accessKeyService = new AccessKeyService();
        $accessKeyService->create($orgId);
        
        $data = $accessKeyService->findDetail($orgId)->shift();
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 更新数据
     *
     * @param int $org_id            
     */
    public function update(Request $request)
    {
        $this->validate($request, [
            'org_id' => 'required|integer|min:1'
        ]);
        
        $orgId = $request->post('org_id');
        
        $accessKeyService = new AccessKeyService();
        $accessKeyService->update($orgId);
        
        $data = $accessKeyService->findDetail($orgId)->shift();
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 删除数据
     *
     * @param int $org_id            
     */
    public function destroy(Request $request)
    {
        $this->validate($request, [
            'org_id' => 'required|integer|min:1'
        ]);
        
        $data['org_id'] = $orgId = $request->post('org_id');
        
        $accessKeyService = new AccessKeyService();
        $accessKeyService->destroy($orgId);
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 修改状态
     *
     * @param int $id            
     * @param int $status            
     */
    public function saveItemStatus(ItemStatusRequest $request)
    {
        $data['org_id'] = $orgId = $request->post('org_id');
        $data['status'] = $status = $request->post('status');
        
        $accessKeyService = new AccessKeyService();
        $accessKeyService->saveItemStatus($orgId, $status);
        
        return $this->response->setResponseData($data)->getResponse();
    }
}