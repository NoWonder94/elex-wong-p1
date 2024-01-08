<?php
namespace App\Services\System;

use App\Models\System\AgentNav;
use App\Models\System\AgentRole;
use SystemCache, Lang;

class AgentNavService extends \App\Services\BaseEloquentCacheService {

    public function lists($data = []) {
        return $this->getSystemCacheByCode('system_agent_nav_all_trees');
    }

    public function getNavs($type) {
        return $this->getSystemCacheByCode('system_agent_navs_' . $type);
    }

    public function getNodeNavs($type) {
        return $this->getSystemCacheByCode('system_agent_node_navs_' . $type);
    }

    public function setCache() {
        //如果已经重置缓存则跳过
        if (self::checkCacheStatus($this)) {
            return false;
        }

        //缓存后台显示的树形菜单，不排除已经禁用的
        $list = AgentNav::with(['childs' => function($query) {
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
        SystemCache::forever('system_agent_nav_all_trees', $nav_all_trees);

        $admin_nodes = Lang::get('agent_admin_nodes');
        $admin_node_expand = [
            'edit' => ['update', 'toggle'],
            'add'  => ['create']
        ];

        //缓存后台菜单及相关的子菜单和节点
        $list = AgentNav::selectRaw('id, pid, name, icon, type, sort, IF(pid = 0, 0, 1) AS is_parent')
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

        $this->setProxyCache($list, $admin_nodes, $admin_node_expand);

        $this->setBusinessCache($list, $admin_nodes, $admin_node_expand);

        SystemCache::forever('system_agent_auth_update_time', UTC_TIME);

        //设为已经重置缓存
        self::setCacheStatus($this);

        return false;
    }

    protected function setProxyCache($list, $adminNodes, $adminNodeExpand) {
        $navs = [];
        $node_navs = [];
        foreach ($list as $item) {
            if ($item->type == 2) {
                continue;
            }

            $id  = $item->id;
            $pid = $item->pid;

            $nodes = [];
            $controllers = [];
            $show_count  = 0;
            foreach ($item->nodes as $node) {
                if (!isset($adminNodes[$node->controller]['nodes'][$node->action])) {
                    continue;
                }

                $admin_controller = $adminNodes[$node->controller];
                if (isset($admin_controller['agent_type']) && $admin_controller['agent_type'] != 1) {
                    continue;
                }

                $admin_action = $admin_controller['nodes'][$node->action];
                if (isset($admin_action['agent_type']) && $admin_action['agent_type'] != 1) {
                    continue;
                }

                $node_data = ['id' => $node->id, 'nav_id' => $id, 'pnav_id' => $pid];
                $node_navs[$node->controller . '/' . $node->action] = $node_data;
                if ($node->is_show == 1) {
                    $show_count++;
                }

                if (isset($adminNodeExpand[$node->action])) {
                    if (isset($admin_action['expand'])) {
                        $admin_action['expand'] = array_merge($admin_action['expand'], $adminNodeExpand[$node->action]);
                    } else {
                        $admin_action['expand'] = $adminNodeExpand[$node->action];
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
        SystemCache::forever('system_agent_node_navs_1', $node_navs);
        SystemCache::forever('system_agent_navs_1', $navs);
    }

    protected function setBusinessCache($list, $adminNodes, $adminNodeExpand) {
        $navs = [];
        $node_navs = [];
        foreach ($list as $item) {
            if ($item->type == 1) {
                continue;
            }

            $id  = $item->id;
            $pid = $item->pid;

            $nodes = [];
            $controllers = [];
            $show_count  = 0;
            foreach ($item->nodes as $node) {
                if (!isset($adminNodes[$node->controller]['nodes'][$node->action])) {
                    continue;
                }

                $admin_controller = $adminNodes[$node->controller];
                if (isset($admin_controller['agent_type']) && $admin_controller['agent_type'] != 2) {
                    continue;
                }

                $admin_action = $admin_controller['nodes'][$node->action];
                if (isset($admin_action['agent_type']) && $admin_action['agent_type'] != 2) {
                    continue;
                }

                $node_data = ['id' => $node->id, 'nav_id' => $id, 'pnav_id' => $pid];
                $node_navs[$node->controller . '/' . $node->action] = $node_data;
                if ($node->is_show == 1) {
                    $show_count++;
                }

                if (isset($adminNodeExpand[$node->action])) {
                    if (isset($admin_action['expand'])) {
                        $admin_action['expand'] = array_merge($admin_action['expand'], $adminNodeExpand[$node->action]);
                    } else {
                        $admin_action['expand'] = $adminNodeExpand[$node->action];
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
        SystemCache::forever('system_agent_node_navs_2', $node_navs);
        SystemCache::forever('system_agent_navs_2', $navs);
    }
}