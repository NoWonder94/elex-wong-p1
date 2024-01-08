<?php
namespace App\Http\Controllers\Api\Log\Member;

use App\Http\Controllers\Api\Controller;
use App\Http\Requests\Log\Member\Signin\ListRequest;
use App\Models\Log\Member\SigninModel;

class SigninController extends Controller
{

    /**
     * 数据列表
     *
     * @param int $page            
     * @param int $page_size            
     * @param array $datetime            
     * @param string $keyword            
     * @param int $order            
     */
    public function getList(ListRequest $request)
    {
        $orgId = $this->agent()->getOrgId();
        
        $page = intval($request->query('page', 1));
        $pageSize = intval($request->query('page_size', 50));
        $order = $request->query('order', SigninModel::ORDER_ID_DESC);
        $param = $request->all();
        
        list ($collection, $count) = SigninModel::selectList($orgId, $page, $pageSize, $param, $order);
        
        $data['count'] = [
            'total' => $count,
            'page' => $page,
            'page_size' => $pageSize
        ];
        $data['data'] = $collection->all();
        
        return $this->response->setResponseData($data)->getResponse();
    }
}