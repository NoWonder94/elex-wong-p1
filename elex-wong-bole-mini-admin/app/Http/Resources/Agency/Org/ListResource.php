<?php
namespace App\Http\Resources\Agency\Org;

use App\Http\Resources\ResourceCollection;

class ListResource extends ResourceCollection
{

    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request            
     * @return array
     */
    public function toArray($request)
    {
        return $this->makeOrgTree($this->collection->all());
    }

    /**
     * 制作树结构（处理前必须已经按照 $parent 排序）
     *
     * @param array $data            
     * @param string $primary            
     * @param string $parent            
     * @param string $children            
     * @return array
     */
    public function makeOrgTree(array $data, $primary = 'id', $parent = 'parent_id', $children = 'children')
    {
        $root = $data[0]['id'];
        $tree = array();
        foreach ($data as $key => $value) {
            if ($value[$primary] == $root) {
                $tree[] = &$data[$key];
            }
            foreach ($data as $k => $v) {
                if ($v[$parent] == $value[$primary]) {
                    $data[$key][$children][] = &$data[$k];
                }
            }
        }
        return $tree;
    }

    /**
     * 制作树结构（处理前必须已经按照 $parent 排序）（其他算法）
     *
     * @param array $data            
     * @param string $primary            
     * @param string $parent            
     * @param string $children            
     * @return array
     */
    function makeOrgTreeOther(array $data, $primary = 'id', $parent = 'parent_id', $children = 'children')
    {
        $root = $data[0]['id'];
        $tree = [];
        $index = [];
        foreach ($data as $key => $value) {
            if ($value[$primary] == $root) {
                $tree[$value[$primary]] = $value;
                $index[$value[$primary]] = &$tree[$value[$primary]];
            } else {
                $index[$value[$parent]][$children][] = $value;
                $index[$value[$primary]] = &$index[$value[$parent]][$children][count($index[$value[$parent]][$children]) - 1];
            }
        }
        return $tree;
    }
}
