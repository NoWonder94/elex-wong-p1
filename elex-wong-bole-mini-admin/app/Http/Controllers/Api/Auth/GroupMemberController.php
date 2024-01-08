<?php
namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\Controller;
use App\Models\Agency\Auth\GroupMemberModel;
use App\Http\Requests\Auth\GroupMember\SearchRequest;
use App\Models\Agency\MemberModel;
use App\Services\Agency\MemberService;

class GroupMemberController extends Controller
{
    
    /**
     * 搜索代理人
     *
     * @param int $page
     * @param int $page_size
     * @param string $keyword
     */
    public function search(SearchRequest $request)
    {
        $orgId = $this->agent()->getOrgId();
        $page = intval($request->query('page', 1));
        $pageSize = intval($request->query('page_size', 50));
        $param['keyword'] = $request->query('keyword', '');
        $param['type'] = MemberModel::TYPE_DEFAULT;
        
        $memberService = new MemberService();
        list ($collection, $count) = $memberService->selectList($orgId, $page, $pageSize, $param);
        
        $data['count'] = [
            'total' => $count,
            'page' => $page,
            'page_size' => $pageSize
        ];
        $data['data'] = $collection->all();
        
        return $this->response->setResponseData($data)->getResponse();
    }
    
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
        
        $data = GroupMemberModel::selectByGroupId($groupId)->all();
        
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
            'member_ids' => 'nullable|array'
        ]);
        $groupId = $request->post('group_id');
        $memberIds = $request->post('member_ids', []);
        
        // 保存数据
        GroupMemberModel::saveByGroupId($groupId, $memberIds);
        // 获取数据
        $data = GroupMemberModel::selectByGroupId($groupId)->all();
        
        return $this->response->setResponseData($data)->getResponse();
    }
}