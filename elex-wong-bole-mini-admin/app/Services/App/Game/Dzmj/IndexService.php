<?php
namespace App\Services\App\Game\Dzmj;

use App\Models\Base\GameModel;
use App\Services\Postman\GameService as PostmanGameService;

class IndexService
{

    /**
     * 获取游戏实时数据
     *
     * @param int $orgId            
     * @return array
     */
    public function countGameStatus($orgId)
    {
        $param['operator_id'][] = $orgId;
        $param['game_id'] = GameModel::GAME_ID_DZMJ;
        
        $postmanGameService = new PostmanGameService();
        // 游戏人数
        $data['amount_playing'] = $postmanGameService->gamePlayerCount($param)[$orgId];
        // 机器人数量
        $data['amount_robot'] = $postmanGameService->gameRobotCount($param)[$orgId];
        
        return $data;
    }
}