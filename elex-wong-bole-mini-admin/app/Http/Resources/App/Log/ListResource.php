<?php
namespace App\Http\Resources\App\Log;

use App\Http\Resources\ResourceCollection;

class ListResource extends ResourceCollection
{

    private $orgList = [];

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
     * 设置代理数据
     *
     * @param array $orgList            
     * @return $this
     */
    public function setOrgList($orgList)
    {
        $this->orgList = array_column($orgList, 'name', 'id');
        
        return $this;
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
            // 代理名称
            $dataList[$key]['org_name'] = $this->orgList[$item['operator_id']];
            // 游戏名称
            $dataList[$key]['game_name'] = isset($this->gameList[$item['game_id']]) ? $this->gameList[$item['game_id']] : $item['game_id'];
            // 扩展信息
            $dataList[$key]['ext'] = empty($item['ext']) ? [] : json_decode($item['ext'], true);
            // 游戏详情
            $dataList[$key]['details'] = empty($item['details']) ? [] : json_decode($item['details'], true);
        }
        return $dataList;
    }
}
