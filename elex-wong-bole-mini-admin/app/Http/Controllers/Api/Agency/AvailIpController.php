<?php
namespace App\Http\Controllers\Api\Agency;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\Controller;
use App\Models\Agency\AvailIpModel;

class AvailIpController extends Controller
{

    /**
     * 获取列表（代理）
     *
     * @param int $org_id            
     * @param \Illuminate\Http\Request $request            
     */
    public function getListByOrg(Request $request)
    {
        $this->validate($request, [
            'org_id' => 'required|integer|min:1'
        ]);
        $orgId = $request->query('org_id');
        
        $data = AvailIpModel::selectByOrgId($orgId)->all();
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 保存数据（代理）
     *
     * @param int $org_id            
     * @param array $ips            
     * @param \Illuminate\Http\Request $request            
     */
    public function saveListByOrg(Request $request)
    {
        $this->validate($request, [
            'org_id' => 'required|integer|min:1',
            'ips.*' => 'nullable|ip'
        ], [], [
            'ips.*' => 'IP'
        ]);
        $orgId = $request->post('org_id');
        $ips = $request->post('ips', []);
        
        // 保存数据
        AvailIpModel::saveByOrgId($orgId, $ips);
        // 获取数据
        $data = AvailIpModel::selectByOrgId($orgId)->all();
        
        return $this->response->setResponseData($data)->getResponse();
    }
}