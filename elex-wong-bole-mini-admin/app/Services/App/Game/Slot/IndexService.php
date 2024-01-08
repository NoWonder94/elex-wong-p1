<?php
namespace App\Services\App\Game\Slot;

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
        $param['game_id'] = GameModel::GAME_ID_SLOT;
        
        $postmanGameService = new PostmanGameService();
        // 游戏人数
        $data['amount_playing'] = $postmanGameService->gamePlayerCount($param)[$orgId];
        
        return $data;
    }
}