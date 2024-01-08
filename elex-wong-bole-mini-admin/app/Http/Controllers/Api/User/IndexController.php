<?php
namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Api\Controller;
use App\Models\Base\UserModel;
use App\Services\Base\UserService;
use App\Http\Requests\User\ListRequest;
use App\Http\Requests\User\ItemRequest;
use App\Http\Requests\User\ItemStatusRequest;

class IndexController extends Controller
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
        $page = intval($request->query('page', 1));
        $pageSize = intval($request->query('page_size', 50));
        $order = $request->query('order', UserModel::ORDER_UPDATED_DESC);
        $param = $request->all();
        
        $userService = new UserService();
        list ($collection, $count) = $userService->selectList($page, $pageSize, $param, $order);
        
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
        $email = $request->post('email');
        
        // 保存数据
        $userService = new UserService();
        $number = $userService->saveItem($request, $id);
        
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
        
        $userService = new UserService();
        $userService->saveItemStatus($id, $status);
        
        return $this->response->setResponseData($data)->getResponse();
    }
}