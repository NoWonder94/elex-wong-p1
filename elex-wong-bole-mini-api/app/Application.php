<?php 
namespace App;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Facade;
use Illuminate\Filesystem\Filesystem;
use App\Providers\ViewServiceProvider;
use Illuminate\Contracts\Validation\ValidatesWhenResolved;
use ReflectionParameter;

class Application extends \Laravel\Lumen\Application {
    public function __construct($basePath = null) {
        $this->registerAvailableBindings();
        parent::__construct($basePath);
    }

    public function any($uri, $action) {
        $this->addRoute('ANY', $uri, $action);
        return $this;
    }

    protected function parseIncomingRequest($request) {
        if (! $request) {
            $request = Request::capture();
        }
        $this->instance(Request::class, $this->prepareRequest($request));
        return ['ANY', $request->getPathInfo()];
    }

    protected function callActionOnArrayBasedRoute($routeInfo) {
        $this->make('events')->fire('router.matched', [$routeInfo, Request::capture()]);
        return parent::callActionOnArrayBasedRoute($routeInfo);
    }

    protected function registerUrlGeneratorBindings() {
        $this->singleton('url', function () {
            return new \App\Utils\Url($this);
        });
    }

    protected function registerSessionBindings() {
        $this->singleton('session', function () {
            return $this->loadComponent('session', 'App\Providers\SessionServiceProvider');
        });
    }

    protected function registerCookieBindings() {
        $this->singleton('cookie', function () {
            return $this->loadComponent('session', 'Illuminate\Cookie\CookieServiceProvider', 'cookie');
        });
    }

    protected function registerFilesBindings() {
        $this->singleton('files', function () {
            return new Filesystem;
        });

        $this->singleton('filesystem', function () {
            return $this->loadComponent('filesystems', 'Illuminate\Filesystem\FilesystemServiceProvider', 'filesystem');
        });
    }

    protected function registerRedirectGeneratorBindings() {
        $this->singleton('redirect', function () {
            return new \Laravel\Lumen\Http\Redirector($this);
        });
    }

    protected function registerViewBindings() {
        $this->singleton('view', function () {
            return $this->loadComponent('view', ViewServiceProvider::class);
        });
    }

    protected function registerTranslationBindings() {
        $this->singleton('translator', function () {
            $this->configure('app');
            $this->instance('path.lang', APP_APPLICATION_PATH . APP_CURRENT_NAMESPACE . '/Lang');
            $this->register('App\Providers\TranslationServiceProvider');
            return $this->make('translator');
        });
    }

    protected function callControllerCallable(callable $callable, array $parameters = []) {
        $controller = $callable[0];
        if ($controller instanceof ViewController) {
            //检测页面缓存
            if ($controller->getIsCachePage()) {
                $content = $controller->getPageCacheContent();
                if ($content !== false) {
                    return $this->prepareResponse($content);
                }
            }
        }

        //验证请求
        $method = '_validatorRequest';
        if (method_exists($controller, $method)) {
            $controller->$method($callable[1]);
        }

        return parent::callControllerCallable($callable, $parameters);
    }

    protected function addDependencyForCallParameter(ReflectionParameter $parameter, array &$parameters, &$dependencies) {
        if (array_key_exists($parameter->name, $parameters)) {
            $dependencie = $parameters[$parameter->name];
            unset($parameters[$parameter->name]);
        } elseif ($parameter->getClass()) {
            $dependencie = $this->make($parameter->getClass()->name);
        } elseif ($parameter->isDefaultValueAvailable()) {
            $dependencie = $parameter->getDefaultValue();
        }
        if ($dependencie instanceof ValidatesWhenResolved) {
            $dependencie->validate();
        }
        $dependencies[] = $dependencie;
    }

    public function withAliases($userAliases = []) {
        parent::withAliases([
                'Illuminate\Support\Facades\Request' => 'Request',
                //'Illuminate\Support\Facades\Lang' => 'Lang',
                'Illuminate\Support\Facades\Config' => 'Config',
                'Illuminate\Support\Facades\Blade' => 'Blade',
                'Illuminate\Support\Facades\View' => 'View',
                'Illuminate\Support\Facades\Session' => 'Session',
                'Illuminate\Support\Facades\Cookie' => 'Cookie',
                'Illuminate\Support\Facades\Storage' => 'Storage',
                'Illuminate\Support\Facades\File' => 'File',
                'Illuminate\Support\Facades\Redirect' => 'Redirect',
                // 'Illuminate\Support\Facades\Redis' => 'Redis',
                'Illuminate\Support\Facades\File' => 'File',

                'App\Utils\Strings' => 'Strings',
                'App\Utils\Time' => 'Time',
                'App\Utils\Format' => 'Format',
                'App\Utils\Tpl' => 'Tpl',
                'App\Utils\Http' => 'Http',
                'App\Utils\Helper' => 'Helper',
                'App\Utils\Response' => 'Response',
                'App\Cache\SystemCache' => 'SystemCache',
                'App\Cache\SiteCache' => 'SiteCache',
                'App\Exceptions\AppException' => 'AppException',

                //'Illuminate\Http\Request' => 'Request',
                'App\Utils\Lang' => 'Lang',
                'App\Utils\Encrypter' => 'Encrypter',
            ]);
    }

    protected function registerContainerAliases() {
        parent::registerContainerAliases();
        $this->aliases['Illuminate\Contracts\Cookie\Factory'] = 'cookie';
        $this->aliases['Illuminate\Session\SessionManager'] = 'session';
        $this->aliases['Illuminate\Contracts\Filesystem\Factory'] = 'filesystem';
    }

    protected function registerAvailableBindings() {
        $this->availableBindings['session'] = 'registerSessionBindings';
        $this->availableBindings['session.store'] = 'registerSessionBindings';
        $this->availableBindings['Illuminate\Session\SessionManager'] = 'registerSessionBindings';

        $this->availableBindings['cookie'] = 'registerCookieBindings';
        $this->availableBindings['Illuminate\Contracts\Cookie\Factory'] = 'registerCookieBindings';
        $this->availableBindings['Illuminate\Contracts\Cookie\QueueingFactory'] = 'registerCookieBindings';

        $this->availableBindings['filesystem'] = 'registerFilesBindings';
        $this->availableBindings['Illuminate\Contracts\Filesystem\Factory'] = 'registerFilesBindings';

        $this->availableBindings['redirect'] = 'registerRedirectGeneratorBindings';
    }
}