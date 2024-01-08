<?php
namespace App\Events\User\Auth;

use Illuminate\Foundation\Events\Dispatchable;

/**
 * 事件【用户数据】【更新】
 */
class UpdateEvent
{
    use Dispatchable;

    /**
     * 用户 ID
     *
     * @var int
     */
    public $id;

    /**
     * 创建一个事件实例
     *
     * @param int $id            
     * @return void
     */
    public function __construct($id)
    {
        $this->id = $id;
    }
}
