<?php
namespace App\Listeners\App\Game\Mahjong;

use App\Events\App\Game\Mahjong\ConfigUpdateEvent;
use App\Services\Postman\GameService as PostmanGameService;
use Illuminate\Support\Facades\Log;

/**
 * 监听器【游戏配置】【更新】
 */
class ConfigUpdateListener
{

    /**
     * 创建事件监听器
     *
     * @return void
     */
    public function __construct()
    {}

    /**
     * 处理事件
     *
     * @param ConfigUpdateEvent $event            
     * @return void
     */
    public function handle(ConfigUpdateEvent $event)
    {
        try {
            // 制作数据
            $data['operator_id'] = $event->operatorId;
            $data['game_id'] = $event->gameId;
            // 游戏配置更新通知
            $gameService = new PostmanGameService();
            $gameService->configUpdate($data);
        } catch (\Throwable $e) {
            // 记录错误信息
            // Log::error($e->getMessage());
        }
    }
}
