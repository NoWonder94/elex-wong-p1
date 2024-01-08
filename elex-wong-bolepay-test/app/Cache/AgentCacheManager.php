<?php
namespace App\Cache;

class AgentCacheManager extends \Illuminate\Cache\CacheManager {
	
    public function store($name = null) {
        $name = $name ?: 'agentfile';
        return $this->stores[$name] = $this->get($name);
    }
}