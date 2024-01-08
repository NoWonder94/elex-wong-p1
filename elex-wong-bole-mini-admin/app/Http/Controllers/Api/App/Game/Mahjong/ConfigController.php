<?php
namespace App\Http\Controllers\Api\App\Game\Mahjong;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\Controller;
use App\Http\Requests\App\Game\Mahjong\Config\ItemRequest;
use App\Services\App\Game\Mahjong\ConfigService;
use App\Models\App\ConfigOperatorModel;
use Illuminate\Validation\Rule;

class ConfigController extends Controller
{

    /**
     * 获取游戏配置【代理】
     *
     * @param ConfigRequest $request            
     */
    public function getItem(Request $request)
    {
        $this->validate($request, [
            'scene_id' => [
                'required',
                Rule::in(ConfigOperatorModel::getSceneIdList())
            ]
        ]);
        
        $orgId = $this->agent()->getOrgId();
        $data['scene_id'] = $sceneId = $request->post('scene_id');
        
        $configService = new ConfigService();
        $data = $configService->getItemByScene($orgId, $sceneId);
        
        return $this->response->setResponseData($data)->getResponse();
    }

    /**
     * 更新游戏配置【代理】
     *
     * @param ConfigRequest $request            
     */
    public function update(ItemRequest $request)
    {
        $orgId = $this->agent()->getOrgId();
        $data['scene_id'] = $sceneId = $request->post('scene_id');
        
        $configService = new ConfigService();
        $configService->update($orgId, $sceneId, $request);
        
        return $this->response->setResponseData($data)->getResponse();
    }
}