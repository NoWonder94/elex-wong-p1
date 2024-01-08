<?php 
namespace App\Services;

use Illuminate\Database\Eloquent\Model;

trait TreeService {
    private $temps = [];

    protected function toTree($source) {
        $data = [
            'all'  => [],
            'list' => [],
            'tree' => []
        ]; 
        $source = $source->toArray();

        $this->_getChilds($source, $data, $data['tree']);  
        return $data;
    }

    private function _getChilds(&$source, &$data, &$tree, $pid = 0, $level = 1) {
        while (count($source) > 0) {
            $item = array_shift($source);
            if ($item['pid'] == $pid) {
                $id = $item['id']; 
                $item['level']    = $level;
                $item['show_name'] = $level == 1 ? $item['name'] : str_repeat('　', ($level - 1) * 1) . '├─' . $item['name'];
                $item['path_name'] = ($pid == 0 ? '' : $data['all'][$pid]['path_name'] . ' → ') . $item['name'];
                $data['all'][$item['id']] = $item;
                $data['all'][$item['id']]['cids'] = [];

                if ($item['status'] == 1 && ($pid == 0 || isset($data['list'][$item['pid']]))) {
                    $data['list'][$item['id']] = $item;
                    $data['list'][$item['id']]['cids'] = [];
                }

                foreach ($item['pids'] as $cpid) {
                    if ($cpid > 0) {
                        $data['all'][$cpid]['cids'][] = $id;
                        if ($item['status'] == 1 && isset($data['list'][$cpid])) {
                            $data['list'][$cpid]['cids'][] = $id;
                        }
                    }
                }

                //填充子级
                if ($item['status'] == 1 && $tree !== null) {
                    $tree[$item['id']] = $item;
                    $tree[$item['id']]['childs'] = [];
                    $this->_getChilds($source, $data, $tree[$item['id']]['childs'], $id, $level + 1);
                } else {
                    $childs = null;
                    $this->_getChilds($source, $data, $childs, $id, $level + 1);
                }
            } else {
                $this->temps[$item['pid']][] = $item;
            }
        }

        while (isset($this->temps[$pid]) && count($this->temps[$pid]) > 0) {
            $item = array_shift($this->temps[$pid]);
            $id = $item['id']; 
            $item['level']    = $level;
            $item['show_name'] = $level == 1 ? $item['name'] : str_repeat('　', ($level - 1) * 1) . '├─' . $item['name'];
            $item['path_name'] = ($pid == 0 ? '' : $data['all'][$pid]['path_name'] . ' → ') . $item['name'];
            $data['all'][$item['id']] = $item;
            $data['all'][$item['id']]['cids'] = [];

            if ($item['status'] == 1 && ($pid == 0 || isset($data['list'][$item['pid']]))) {
                $data['list'][$item['id']] = $item;
                $data['list'][$item['id']]['cids'] = [];
            }

            foreach ($item['pids'] as $cpid) {
                if ($cpid > 0) {
                    $data['all'][$cpid]['cids'][] = $id;
                    if ($item['status'] == 1 && isset($data['list'][$cpid])) {
                        $data['list'][$cpid]['cids'][] = $id;
                    }
                }
            }

            //填充子级
            if ($item['status'] == 1 && $tree !== null) {
                $tree[$item['id']] = $item;
                $tree[$item['id']]['childs'] = [];
                $this->_getChilds($source, $data, $tree[$item['id']]['childs'], $id, $level + 1);
            } else {
                $childs = null;
                $this->_getChilds($source, $data, $childs, $id, $level + 1);
            }
        }
    }
}
