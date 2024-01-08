<?php 
namespace App\Services\System;

use App\Models\System\Server;
use SystemCache;

class ServerService extends \App\Services\BaseEloquentCacheService {
    public function getById($id) {
        $list = $this->getSystemCacheByCode('servers');
        if (isset($list[$id])) {
            return $list[$id];
        }
        return null;
    }

    public function setCache() {
        $servers = [];
        $list = Server::get();
        foreach ($list as $item) {
            $servers[$item->id] = $item;
        }
        SystemCache::forever('servers', $servers);
        return false;
    }
}