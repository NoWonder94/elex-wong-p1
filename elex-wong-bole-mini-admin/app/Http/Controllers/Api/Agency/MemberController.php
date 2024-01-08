<?php
namespace App\Http\Controllers\Api\Agency;

use App\Http\Controllers\Api\Controller;
use App\Models\Agency\MemberModel;
use App\Services\Agency\MemberService;
use App\Http\Requests\Agency\Member\ListRequest;
use App\Http\Requests\Agency\Member\ItemRequest;
use App\Http\Requests\Agency\Member\ItemStatusRequest;

class MemberController extends Controller
{

    /**
     * 代理人列表
     *
     * @param int $orgId
     * @param int $page
     * @param int $page_size            
     * @param int $status            
     * @param string $keyword            
     * @param int $order            
     */
    public function getList(ListRequest $request)
    {
        $orgId = $request->query('org_id');
        $page = intval($request->query('page', 1));
        $pageSize = intval($request->query('page_size', 50));
        $order = $request->query('order', MemberModel::ORDER_UPDATED_DESC);
        $param = $request->all();
        
        $memberService = new MemberService();
        list ($collection, $count) = $memberService->selectList($orgId, $page, $pageSize, $param, $order);
        
        $data['count'] = [
            'total' => $count,
            'page' => $page,
            'page_size' => $pageSize
        ];
        $data['data'] = $collection->all();
        
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
        
        // 保存数据
        $memberService = new MemberService();
        $number = $memberService->saveItem($request, $id);
        
        $data['id'] = $id ? $id : $number;
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 修改状态（一条）
     *
     * @param int $id            
     * @param int $status            
     */
    public function saveItemStatus(ItemStatusRequest $request)
    {
        $data['id'] = $id = $request->post('id');
        $data['status'] = $status = $request->post('status');
        
        $memberService = new MemberService();
        $memberService->saveItemStatus($id, $status);
        
        return $this->response->setResponseData($data)->getResponse();
    }
}