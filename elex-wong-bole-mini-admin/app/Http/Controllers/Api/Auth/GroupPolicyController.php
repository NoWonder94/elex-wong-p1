<?php
namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\Controller;
use App\Models\Agency\Auth\GroupPolicyModel;

class GroupPolicyController extends Controller
{

    /**
     * 获取权限组列表
     *
     * @param int $group_id            
     * @param \Illuminate\Http\Request $request            
     */
    public function getList(Request $request)
    {
        $this->validate($request, [
            'group_id' => 'required|integer|min:1'
        ]);
        $groupId = $request->query('group_id');
        
        $data = GroupPolicyModel::selectByGroupId($groupId)->all();
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 保存数据（多条）
     *
     * @param int $group_id            
     * @param array $policy_ids            
     * @param \Illuminate\Http\Request $request            
     */
    public function saveList(Request $request)
    {
        $this->validate($request, [
            'group_id' => 'required|integer|min:1',
            'policy_ids' => 'nullable|array'
        ]);
        $groupId = $request->post('group_id');
        $policyIds = $request->post('policy_ids', []);
        
        // 保存数据
        GroupPolicyModel::saveByGroupId($groupId, $policyIds);
        // 获取数据
        $data = GroupPolicyModel::selectByGroupId($groupId)->all();
        
        return $this->response->setResponseData($data)->getResponse();
    }
}