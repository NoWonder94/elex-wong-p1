<?php
namespace App\Http\Resources\App\Player\BetDay;

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
            $dataList[$key]['game_name'] = isset($this->gameList[$item['game_id']]) ? $this->gameList[$item['game_id']] : $item['game_id'];
        }
        return $dataList;
    }
}
