<?php 
namespace App\Providers;

use Illuminate\Cache\CacheServiceProvider as ServiceProvider;
use Illuminate\Cache\CacheManager;
use App\Cache\FileCache;
use Illuminate\Cache\Repository;
use Config, SystemCache, SiteCache;

class CacheServiceProvider extends ServiceProvider {

    public function register() {
        $this->app->singleton('sitecache', function ($app) {
            return new CacheManager($app);
        });

        $this->app->singleton('sitecache.store', function ($app) {
            return $app['sitecache']->driver();
        });
    }

    public function boot() {
        $closure = function($app) {
            $path = Config::get('cache.stores.file.path');
            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            }
            $store = new FileCache($this->app['files'], $path);
            $repository = new Repository($store);
            if ($app->bound('Illuminate\Contracts\Events\Dispatcher')) {
                $repository->setEventDispatcher(
                    $app['Illuminate\Contracts\Events\Dispatcher']
                );
            }
            return $repository;
        };

        SystemCache::extend('file', $closure);
        SiteCache::extend('file', $closure);
    }
}