<?php 
namespace App\Application\System\Admin\Services;

use App\Application\System\Admin\Models\AdminNav;
use App\Application\System\Admin\Models\AdminNode;
use App\Application\System\Admin\Models\AdminRole;
use App\Application\System\Admin\Models\AdminRoleAccess;
use SystemCache, DB;

class AdminRoleService extends \App\Services\BaseEloquentCacheService {

    public function lists($data = []) {
        return $this->getSystemCacheByCode('admin_role_all');
    }

    public function get($key, $data = []) {
        $roles = $this->lists();
        return $roles[$key];
    }

    public function getAdminRoles() {
        return $this->getSystemCacheByCode('admin_roles');
    }


    public function setCache() {

        //如果已经重置缓存则跳过
        if (self::checkCacheStatus($this)) {
            return false;
        }

        $super_role = AdminNode::selectRaw('GROUP_CONCAT(DISTINCT system_admin_node.id) AS node_ids')
            ->selectRaw('GROUP_CONCAT(DISTINCT system_admin_nav.id) AS nav_ids')
            ->selectRaw('GROUP_CONCAT(DISTINCT system_admin_nav.pid) AS nav_pids')
            ->leftJoin('system_admin_nav', function($join) {
                $join->on('system_admin_nav.id', '=', 'system_admin_node.nav_id')
                    ->where('system_admin_nav.status', '=', 1);
            })
            ->first();

        $admin_role_all = [];
        $lists = AdminRole::select('system_admin_role.*')
            ->selectRaw('GROUP_CONCAT(DISTINCT system_admin_role_access.node_id) AS access')
            ->leftJoin('system_admin_role_access', 'system_admin_role_access.role_id', '=', 'system_admin_role.id')
            ->groupBy('system_admin_role.id')
            ->get();

        $adminNav = AdminNav::get()->getKeyListArray('id');
        $adminNode = AdminNode::get()->getKeyListArray('id');
        foreach ($lists as $key => $role) {
            $access = $role->access;
            unset($role->access);
            $admin_role_all[$role->id] = $role->toArray();
            $lists[$key]->node_ids = $access;
            $admin_role_all[$role->id]['access'] = !empty($access) ? explode(',', $access) : [];
            $navIds = [];
            $navPids = [];
            foreach($admin_role_all[$role->id]['access'] as  $v) {
                $navIds[] = $navId = $adminNode[$v]['nav_id'];
                $navPids[] = $adminNav[$navId]['pid'];
            }
            $lists[$key]->nav_ids = implode(',', $navIds);
            $lists[$key]->nav_pids = implode(',', $navPids);
        }
        SystemCache::forever('admin_role_all', $admin_role_all);

        $admin_roles = [];
        foreach ($lists as $role) {
            $data = $role->toArray();
            unset($data['nav_ids'], $data['nav_pids'], $data['node_ids']);
            $admin_roles[$role->id] = $data;
            $first_action = '';
            if ($role->is_super == 1) {
                $nav_ids = explode(',', $super_role->nav_ids);
                $nav_pids = explode(',', $super_role->nav_pids);
                $node_ids = explode(',', $super_role->node_ids);
                $first_action = 'Index/index';
            } else {
                $nav_ids = explode(',', $role->nav_ids);
                $nav_pids = explode(',', $role->nav_pids);
                $node_ids = explode(',', $role->node_ids);
                //查询不是super管理员的首个可显示页面
                $first_node = AdminNode::whereIn('id', $node_ids)->where('is_show', 1)->where('status', 1)->orderBy('sort', 'ASC')->first();
                if ($first_node) {
                    $first_action = $first_node->controller.'/'.$first_node->action;
                }
            }
            $admin_roles[$role->id]['nodes'] = $node_ids;
            $admin_roles[$role->id]['navs'] = array_unique(array_merge($nav_ids, $nav_pids));
            $admin_roles[$role->id]['first_action'] = $first_action;
        }
        SystemCache::forever('admin_roles', $admin_roles); 
        //设为已经重置缓存
        self::setCacheStatus($this);

        return false;
    }

    public function save($data, $type) {
        $data['update_time'] = UTC_TIME;
        $access = $data['access'];
        unset($data['access'], $data['is_super']);
        $this->saveExtend = function($key, &$data, &$attributes) use ($access) {
            AdminRoleAccess::where('role_id', $key)->delete();
            foreach ($access as $node_id) {
                $adminRoleAccess = new AdminRoleAccess;
                $adminRoleAccess->role_id = $key;
                $adminRoleAccess->node_id = $node_id;
                $adminRoleAccess->save();
            }
        };
        $result =  parent::save($data, $type);
        if ($result) {
            $this->resetCache();
        }
        return $result;
    }

    public function delete($key, $data = []) {
        $this->deleteFormatBuilder = function(&$builder, &$key, &$data) {
            $builder->where('is_super', 0);
        };

        $result =  parent::delete($key, $data);
        if ($result) {
            AdminRoleAccess::where('role_id', $data['id'])->delete();
            $this->resetCache();
        }
        return $result;
    }

    public function toggle($data) {
        $this->toggleFormatBuilder = function(&$builder, &$attributes, $primary_key) {
            $builder->where('is_super', 0);
        };

        $result =  parent::toggle($data);
        if ($result) {
            $this->resetCache();
        }
        return $result;
    }
}
