<?php
namespace App\Events\Agency\Org;

use Illuminate\Foundation\Events\Dispatchable;

/**
 * 事件【组织】【删除】
 */
class DestroyEvent
{
    use Dispatchable;

    /**
     * 组织 ID
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
