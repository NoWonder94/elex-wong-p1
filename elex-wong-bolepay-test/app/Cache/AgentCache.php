<?php
namespace App\Cache;

use Illuminate\Support\Facades\Facade;
use Config;

class AgentCache extends Facade {
    
    protected static function getFacadeAccessor() {
        return 'agentcache';
    }

    public static function assign($agentId) {
        static $repositorys = [];

        if (!isset($repositorys[$agentId])) {
            $path = Config::get('cache.stores.file.path') . '/agent/' . $agentId;
            $repositorys[$agentId] = self::repository(new AgentFileStore(app('files'), $path));
        }
        return $repositorys[$agentId];
    }
}