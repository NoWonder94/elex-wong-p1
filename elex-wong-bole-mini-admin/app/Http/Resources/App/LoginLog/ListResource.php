<?php
namespace App\Http\Resources\App\LoginLog;

use App\Http\Resources\ResourceCollection;

class ListResource extends ResourceCollection
{

    private $gameList = [];

    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request            
     * @return array
     */
    public function toArray($request)
    {
        return $this->makeDecodeDataList($this->collection->all());
    }

    /**
     * 设置游戏数据
     *
     * @param array $gameList            
     * @return $this
     */
    public function setGameList($gameList)
    {
        $this->gameList = array_column($gameList, 'name', 'id');
        
        return $this;
    }

    /**
     * 制作数据名称
     *
     * @param array $dataList            
     * @return array
     */
    public function makeDecodeDataList(array $dataList)
    {
        foreach ($dataList as $key => $item) {
            // 游戏名称
            if (isset($this->gameList[$item['game_id']])) {
                $dataList[$key]['game_name'] = $item['game_id'] > 0 ? $this->gameList[$item['game_id']] : '游戏大厅';
            } else {
                $dataList[$key]['game_name'] = $item['game_id'];
            }
        }
        return $dataList;
    }
}
