<?php namespace TuJiao\Services;

use Illuminate\Database\Eloquent\Model;

trait TreeService {
    protected function toTree($source) {
        $tree = [];
        while (count($source) > 0) {
            //获取第一条数据，并弹出
            $item = array_shift($source);
            $this->_formatItem($item, $source, $tree);
        }
        return $tree;
    }

    private function _formatItem($item, &$source, &$tree) {
        if ($item instanceof Model) {
            $item = $item->toArray();
        }
        $id  = $item['id'];
        $pid = $item['pid'];
        $item['pids'] = [];
        $item['cids'] = [];

        if ($pid > 0) {
            $parent_id = $pid;
            do {
                if (!isset($tree['data'][$parent_id])) {
                    $parent = $this->_searchItem($parent_id, $source);
                    if (!$parent) {
                       break; 
                    }
                    $parent
                }

                $tree['data'][$parent_id]['cids'][] = $id;
                $parent_id = $tree['data'][$parent_id]['pid'];

            } while($parent_id > 0);
        } else {
            $item['level']      = 1;
            $item['show_str']   = $item['name'];
        }

        //填充数据到树
        $tree['data'][$id]  = $item;
    }

    private function _searchItem($id, &$source) {
        foreach ($source as $key => $value) {
            if ($value instanceof Model && $value->id == $id) {
                unset($source[$key]);
                return $value;
            } elseif($value['id'] == $id) {
                unset($source[$key]);
                return $value;
            }
        }
        return false;
    }

    private function _getChilds(&$source, &$tree, $pid = 0, $level = 1) {
        reset($source);
        $is_next    = true;
        $old_key    = 0;
        while ($is_next && count($source) > 0){
            $key  = key($source);
            if ($old_key > $key) {
                $is_next = next($source);
                return;
            }

            $old_key = $key;
            echo $key.',';
            
            $item = current($source);
            if ($item['pid'] == $pid) {
                unset($source[$key]);
                if ($item instanceof Model) {
                    $item = $item->toArray();
                }
                
                $id = $item['id'];
                $item['pids'] = [];
                $item['cids'] = [];

                if ($pid > 0) {
                    $item['pids']   = $tree['data'][$pid]['pids'];
                    $item['pids'][] = $pid;
                    $parent_id      = $pid;
                    while ($parent_id > 0) {
                        $tree['data'][$parent_id]['cids'][] = $id;
                        $parent_id = $tree['data'][$parent_id]['pid'];
                    }
                }

                $item['level']      = $level;
                $item['show_str']   = $level == 1 ? $item['name'] : str_repeat('&nbsp;', ($level - 1) * 4) . '├─&nbsp;' . $item['name'];

                //填充数据到树
                $tree['data'][$id]  = $item;

                //填充子级
                $this->_getChilds($source, $tree, $id, $level + 1);
                echo "\n";
                reset($source);
            }
            $is_next = next($source);
        }
    }
}
