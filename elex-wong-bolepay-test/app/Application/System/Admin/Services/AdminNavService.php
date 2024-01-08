<?php 
namespace App\Application\System\Admin\Services;

use App\Application\System\Admin\Models\AdminNav;
use App\Application\System\Admin\Models\AdminRole;
use SystemCache, Lang;

class AdminNavService extends \App\Services\BaseEloquentCacheService {

    protected function updateExtendHandler() {
        AdminRole::where('id', '>', 0)->update(['update_time' => UTC_TIME]);
    }

    public function lists($data = []) {
        return $this->getSystemCacheByCode('system_admin_nav_all_trees');
    }

    public function getNavs() {
        return $this->getSystemCacheByCode('system_admin_navs');
    }

    public function getNodeNavs() {
        return $this->getSystemCacheByCode('system_admin_node_navs');
    }

    public function setCache() {
        //如果已经重置缓存则跳过
        if (self::checkCacheStatus($this)) {
            return false;
        }

        //缓存后台显示的树形菜单，不排除已经禁用的
        $list = AdminNav::with(['childs' => function($query) {
                        $query->orderBy('sort', 'asc')
                              ->orderBy('id', 'asc');
                    }])
                    ->where('pid', 0)
                    ->orderBy('sort', 'asc')
                    ->orderBy('id', 'asc')
                    ->get();

        $nav_all_trees = [];
        foreach ($list as $item) {
            $childs = $item->childs;
            unset($item->childs);

            $item->show_name = $item->name;
            $item->path_name = $item->name;
            $nav_all_trees[$item->id] = $item->toArray();

            foreach ($childs as $child) {
                $child = $child->toArray();
                foreach ($child['name'] as $locale_key => $locale_name) {
                    $child['show_name'][$locale_key] = '　├── ' . $locale_name;
                    $child['path_name'][$locale_key] = $item['name'][$locale_key] . ' → ' . $locale_name;
                }
                $nav_all_trees[$child['id']] = $child;
            }
        }
        SystemCache::forever('system_admin_nav_all_trees', $nav_all_trees);

        $admin_nodes = Lang::get('system_admin_nodes');
        $admin_node_expand = [
            'edit' => ['update', 'toggle'],
            'add'  => ['create']
        ];

        //缓存后台菜单及相关的子菜单和节点
        $list = AdminNav::selectRaw('id, pid, name, icon, sort, IF(pid = 0, 0, 1) AS is_parent')
                    ->with(['nodes' => function($query) {
                        $query->where('status', 1)
                            ->orderBy('is_show', 'desc')
                            ->orderBy('sort', 'asc')
                            ->orderBy('id', 'asc');
                    }])
                    ->orderBy('is_parent', 'asc')
                    ->orderBy('sort', 'asc')
                    ->orderBy('id', 'asc')
                    ->where('status', 1)
                    ->get();

        $navs = [];
        $node_navs = [];
        foreach ($list as $item) {
            $id  = $item->id;
            $pid = $item->pid;

            $nodes = [];
            $controllers = [];
            $show_count  = 0;
            foreach ($item->nodes as $node) {
                if (!isset($admin_nodes[$node->controller]['nodes'][$node->action])) {
                    continue;
                }
                $admin_action     = $admin_nodes[$node->controller]['nodes'][$node->action];
                $node_data = ['id' => $node->id, 'nav_id' => $id, 'pnav_id' => $pid];
                $node_navs[$node->controller . '/' . $node->action] = $node_data;
                if ($node->is_show == 1) {
                    $show_count++;
                }

                if (isset($admin_node_expand[$node->action])) {
                    if (isset($admin_action['expand'])) {
                        $admin_action['expand'] = array_merge($admin_action['expand'], $admin_node_expand[$node->action]);
                    } else {
                        $admin_action['expand'] = $admin_node_expand[$node->action];
                    }
                }

                if (isset($admin_action['expand'])) {
                    foreach ($admin_action['expand'] as $controller => $actions) {
                        if (is_array($actions)) {
                            foreach ($actions as $action) {
                                if (!isset($node_navs[$controller . '/' . $action])) {
                                    $node_navs[$controller . '/' . $action] = $node_data;
                                }
                            }
                        } else {
                            if (!isset($node_navs[$node->controller . '/' . $actions])) {
                                $node_navs[$node->controller . '/' . $actions] = $node_data;
                            }
                        }
                    }
                }
                $node->url = $node->controller . '/' . $node->action;
                $controllers[$node->controller][] = $nodes['node_' . $node->id] = $node->toArray();
            }
            unset($item->nodes);

            if ($pid > 0) {
                $child = $item->toArray();
                $child['nodes'] = $nodes;
                $child['show_count']  = $show_count;
                $current_node = current($nodes);
                $child['url'] = $current_node['controller'] . '/' . $current_node['action'];
                $navs[$pid]['is_child_nav'] = true;
                $navs[$pid]['nodes']['nav_' . $child['id']] = $child;
                $navs[$pid]['show_count'] += $show_count;

                unset($child['nodes']);
                $child['controllers'] = $controllers;
                $navs[$pid]['controllers']['nav_' . $child['id']] = $child;

            } else {
                $navs[$id] = $item->toArray();
                $navs[$id]['nodes'] = $nodes;
                $navs[$id]['controllers'] = $controllers;
                $navs[$id]['show_count']  = $show_count;
            }
        }

        //权限节点排序
        foreach ($navs as $key => $item) {
            if (isset($item['is_child_nav'])) {
                uasort($navs[$key]['nodes'], function($a, $b) {
                    if ($a['sort'] == $b['sort']) {
                        //如果A，B都是菜单节点，或者两个都不是菜单节点，依ID顺序排列
                        if ((isset($a['pid']) && isset($b['pid'])) || 
                            !isset($a['pid']) && !isset($b['pid'])) {
                            return ($a['id'] < $b['id']) ? -1 : 1;
                        } else {//如果其中一个是菜单节点，菜单节点优先
                            return isset($a['pid']) ? -1 : 1;
                        }
                    }
                    return ($a['sort'] < $b['sort']) ? -1 : 1;
                });
            }

            $current_node = current($navs[$key]['nodes']);
            if (isset($current_node['pid'])) {
                $navs[$key]['url'] =  $current_node['url'];
            } else {
                $navs[$key]['url'] = $current_node['controller'] . '/' . $current_node['action'];
            }
        }
        SystemCache::forever('system_admin_node_navs', $node_navs);
        SystemCache::forever('system_admin_navs', $navs);

        SystemCache::forever('system_admin_auth_update_time', UTC_TIME);

        //设为已经重置缓存
        self::setCacheStatus($this);

        return false;
    }
}