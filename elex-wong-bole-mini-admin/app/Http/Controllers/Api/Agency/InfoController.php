<?php
namespace App\Http\Controllers\Api\Agency;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\Controller;
use App\Http\Requests\Agency\Info\ItemRateRequest;
use App\Services\Agency\InfoService;

class InfoController extends Controller
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
        
        $infoService = new InfoService();
        $data['rate'] = $infoService->getAgencyRate($orgId);
        $data['coin'] = $infoService->getAgencyCoin($orgId);
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 保存抽佣数据
     *
     * @param int $org_id            
     */
    public function saveItemRate(ItemRateRequest $request)
    {
        $orgId = $request->post('org_id');
        $rateNext = $request->post('rate_next');
        
        $infoService = new InfoService();
        $infoService->saveItemRate($orgId, $rateNext);
        
        $data = $infoService->getAgencyRate($orgId);
        
        return $this->response->setResponseData($data)->getResponse();
    }
}