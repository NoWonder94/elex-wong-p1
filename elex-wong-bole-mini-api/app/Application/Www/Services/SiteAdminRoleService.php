<?php 
namespace App\Application\Www\Services;

use App\Services\CacheService;
use App\Models\SiteAdminNode;
use App\Application\Www\Models\SiteAdminRole;
use App\Application\Www\Models\SiteAdminRoleAccess;
use SiteCache, DB;

class SiteAdminRoleService extends EloquentService {
    use CacheService;

    public function lists($data = []) {
        $list = SiteCache::get('admin_role_all');
        if (!$list) {
            $this->setCache();
            return SiteCache::get('admin_role_all');
        }
        return $list;
    }

    public function get($key, $data = []) {
        $roles = $this->lists();
        return $roles[$key];
    }

    public function getAdminRoles() {
        $admin_roles = SiteCache::get('admin_roles');
        if (!$admin_roles) {
            $this->setCache();
            return SiteCache::get('admin_roles');
        }
        return $admin_roles;
    }


    public function setCache() {
        //如果已经重置缓存则跳过
        if (self::checkCacheStatus($this)) {
            return false;
        }

        $tablePrefix = DB::getTablePrefix();

        $super_role = SiteAdminNode::selectRaw('GROUP_CONCAT(DISTINCT '.$tablePrefix.'site_admin_node.id) AS node_ids')
                                ->selectRaw('GROUP_CONCAT(DISTINCT '.$tablePrefix.'site_admin_nav.id) AS nav_ids')
                                ->selectRaw('GROUP_CONCAT(DISTINCT '.$tablePrefix.'site_admin_nav.pid) AS nav_pids')
                                ->leftJoin('site_admin_nav', function($join) {
                                    $join->on('site_admin_nav.id', '=', 'site_admin_node.nav_id')
                                        ->where('site_admin_nav.status', '=', 1);
                                })
                                ->first();


        $admin_role_all = [];
        $lists = SiteAdminRole::select('site_admin_role.*')
                            ->selectRaw('GROUP_CONCAT(DISTINCT '.$tablePrefix.'site_admin_role_access.node_id) AS access')
                            ->leftJoin('site_admin_role_access', 'site_admin_role_access.role_id', '=', 'site_admin_role.id')
                            ->groupBy('site_admin_role.id')
                            ->get();

        foreach ($lists as $role) {
            $access = $role->access;
            unset($role->access);
            $admin_role_all[$role->id] = $role->toArray();
            $admin_role_all[$role->id]['access'] = explode(',', $access);
        }
        SiteCache::forever('admin_role_all', $admin_role_all);

        $admin_roles = [];
        $lists = SiteAdminRole::select('site_admin_role.*')
                        ->selectRaw('GROUP_CONCAT(DISTINCT '.$tablePrefix.'site_admin_nav.id) AS nav_ids')
                        ->selectRaw('GROUP_CONCAT(DISTINCT '.$tablePrefix.'site_admin_nav.pid) AS nav_pids')
                        ->selectRaw('GROUP_CONCAT(DISTINCT '.$tablePrefix.'site_admin_node.id) AS node_ids')
                        ->leftJoin('site_admin_role_access', 'site_admin_role_access.role_id', '=', 'site_admin_role.id')
                        ->leftJoin('site_admin_node', function($join) {
                            $join->on('site_admin_node.id', '=', 'site_admin_role_access.node_id')
                                ->where('site_admin_node.status', '=', 1);
                        })
                        ->leftJoin('site_admin_nav', function($join) {
                            $join->on('site_admin_nav.id', '=', 'site_admin_node.nav_id')
                                ->where('site_admin_nav.status', '=', 1);
                        })
                        ->where('site_admin_role.status', 1)
                        ->groupBy('site_admin_role.id')
                        ->get();

        foreach ($lists as $role) {
            $data = $role->toArray();
            unset($data['nav_ids'], $data['nav_pids'], $data['node_ids']);
            $admin_roles[$role->id] = $data;
            if ($role->is_super == 1) {
                $nav_ids = explode(',', $super_role->nav_ids);
                $nav_pids = explode(',', $super_role->nav_pids);
                $node_ids = explode(',', $super_role->node_ids);
            } else {
                $nav_ids = explode(',', $role->nav_ids);
                $nav_pids = explode(',', $role->nav_pids);
                $node_ids = explode(',', $role->node_ids);
            }
            $admin_roles[$role->id]['nodes'] = $node_ids;
            $admin_roles[$role->id]['navs'] = array_unique(array_merge($nav_ids, $nav_pids));
        }
        SiteCache::forever('admin_roles', $admin_roles);

        //设为已经重置缓存
        self::setCacheStatus($this);

        return false;
    }

    public function save($data, $type) { 
        $data['update_time'] = UTC_TIME;
        $access = $data['access'];
        unset($data['access'], $data['is_super']);
        $this->saveExtend = function($key, &$data, &$attributes) use ($access) {
            SiteAdminRoleAccess::where('role_id', $key)->delete();
            foreach ($access as $node_id) {
                $adminRoleAccess = new SiteAdminRoleAccess;
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
                $builder->where('id', $key)->where('is_super', 0);
            };

        $result =  parent::delete($key, $data);
        if ($result) {
            SiteAdminRoleAccess::where('role_id', $data['id'])->delete();
            $this->resetCache();
        }
        return $result;
    }

    public function toggle($data) {
        $this->toggleFormatBuilder = function(&$builder, &$attributes, $primary_key) {
                $builder->where('id', $attributes['id'])->where('is_super', 0);
            };

        $result =  parent::toggle($data);
        if ($result) {
            $this->resetCache();
        }
        return $result;
    }
}
