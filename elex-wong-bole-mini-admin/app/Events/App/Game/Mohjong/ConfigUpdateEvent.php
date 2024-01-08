<?php
namespace App\Events\App\Game\Mohjong;

use Illuminate\Foundation\Events\Dispatchable;

/**
 * 事件【游戏配置】【更新】
 */
class ConfigUpdateEvent
{
    use Dispatchable;

    /**
     * 代理 ID
     *
     * @var int
     */
    public $operatorId;

    /**
     * 游戏 ID
     *
     * @var int
     */
    public $gameId;

    /**
     * 创建一个事件实例
     *
     * @param int $operatorId            
     * @param int $gameId            
     * @return void
     */
    public function __construct($operatorId, $gameId)
    {
        $this->operatorId = $operatorId;
        $this->gameId = $gameId;
    }
}
