<?php 
namespace App\Providers;

use App\Utils\FileViewFinder;
use Illuminate\View\Engines\CompilerEngine;
use Illuminate\View\Compilers\BladeCompiler;
use Illuminate\View\ViewServiceProvider as BaseViewServiceProvider;
use Lang;

class ViewServiceProvider extends BaseViewServiceProvider {
	public function registerViewFinder() {
        $this->app->bind('view.finder', function ($app) {
            $paths = [APP_NAMESPACE_PATH . '/Views'];
            return new FileViewFinder($app['files'], $paths);
        });
    }

    public function registerBladeEngine($resolver) {
        $app = $this->app;

        $app->singleton('blade.compiler', function ($app) {
            $cache = $app['config']['view.compiled'];
            return new BladeCompiler($app['files'], $cache);
        });

        $app->singleton('blade.compiler', function ($app) {
            $cache = $app['config']['view.compiled'] . '/' . strtolower(APP_HOST_TYPE) . '/' . strtolower(APP_CURRENT_NAMESPACE) . '/' . Lang::getLocale();
            if (!file_exists($cache)) {
                mkdir($cache, 0777, true);
            }
            return new BladeCompiler($app['files'], $cache);
        });

        $resolver->register('blade', function () use ($app) {
            return new CompilerEngine($app['blade.compiler']);
        });
    }
}