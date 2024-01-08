<?php 
namespace App\Providers;

use Illuminate\Cache\CacheServiceProvider as ServiceProvider;
use Illuminate\Cache\FileStore;
use App\Cache\AgentCacheManager;
use Config, SystemCache, AgentCache;

class CacheServiceProvider extends ServiceProvider {

    public function register() {

        $this->app->singleton('agentcache', function ($app) {
            return new AgentCacheManager($app);
        });

        $this->app->singleton('agentcache.store', function ($app) {
            return $app['agentcache']->driver();
        });

        SystemCache::extend('systemfile', function ($app) {
            $path = $app->config['cache.stores.file.path'] . '/system';
            return SystemCache::repository(new FileStore($app['files'], $path));
        });
        
        AgentCache::extend('agentfile', function ($app) {
            return AgentCache::assign(APP_CURRENT_AGENT_ID);
        });
    }
}