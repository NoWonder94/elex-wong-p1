<?php
namespace App\Services\App\Game\Mohjong;

use App\Exceptions\Response\Service\ServiceException;
use App\Exceptions\Response\Service\ServiceCode;
use App\Models\App\ConfigOperatorModel;
use App\Models\Base\GameModel;
use App\Mappers\App\Game\Mohjong\ConfigMapper;
use App\Models\Agency\OrgModel;

class ConfigService
{

    /**
     * 获取游戏ID
     *
     * @return int
     */
    private function getGameId()
    {
        return GameModel::GAME_ID_MOHJONG;
    }

    /**
     * 获取游戏配置【场景】
     *
     * @param int $orgId            
     * @param int $sceneId            
     * @return array
     */
    public function getItemByScene($orgId, $sceneId)
    {
        // 获取配置
        $data = ConfigOperatorModel::findByOperatorGame($orgId, $this->getGameId())->shift();
        
        if (! $data) {
            // 初始化配置
            $this->init($orgId);
            // 获取配置
            $data = ConfigOperatorModel::findByOperatorGame($orgId, $this->getGameId())->shift();
        }
        // json 字符串转数组
        $data['config'] = json_decode($data['config'], true);
        
        return $data['config'][$sceneId];
    }

    /**
     * 初始化配置
     *
     * @param int $orgId            
     * @throws ServiceException
     * @return id
     */
    public function init($orgId)
    {
        // 获取初始化配置
        $initData = ConfigOperatorModel::findByOperatorGame(OrgModel::ROOT_NODE_ID, $this->getGameId())->shift();
        
        $data['config'] = $initData['config'];
        // 其他数据
        $data['operator_id'] = $orgId;
        $data['game_id'] = $this->getGameId();
        
        // 创建配置数据
        if (! ($id = ConfigOperatorModel::create($data))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
        return $id;
    }

    /**
     * 更新数据
     *
     * @param int $orgId            
     * @param int $sceneId            
     * @param \Illuminate\Http\Request $request            
     * @throws ServiceException
     * @return id
     */
    public function update($orgId, $sceneId, $request)
    {
        // 获取配置
        $data = ConfigOperatorModel::findByOperatorGame($orgId, $this->getGameId())->shift();
        // json 字符串转数组
        $data['config'] = json_decode($data['config'], true);
        
        // 数据映射
        $dataMapper = new ConfigMapper($request->all());
        $data['config'][$sceneId] = $dataMapper->make()->toArray();
        // 数组转 json 字符串
        $data['config'] = json_encode($data['config']);
        
        // 更新配置数据
        if (! ($number = ConfigOperatorModel::updateByOperatorGame($orgId, $this->getGameId(), $data))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
        
        // 抛出更新游戏配置事件
        \App\Events\App\Game\Mohjong\ConfigUpdateEvent::dispatch($data['operator_id'], $data['game_id']);
        
        return $number;
    }
}