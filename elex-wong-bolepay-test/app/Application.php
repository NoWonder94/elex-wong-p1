<?php 
namespace App;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Facade;
use Illuminate\Filesystem\Filesystem;
use App\Providers\ViewServiceProvider;
use Illuminate\Contracts\Validation\ValidatesWhenResolved;
use App\Utils\Time;
use ReflectionParameter;

class Application extends \Laravel\Lumen\Application{
    public function __construct($basePath = null) {
        $this->registerAvailableBindings();
        parent::__construct($basePath);

        //当前UTC时间(秒)
        define('UTC_TIME', Time::getTime());
    }

    public function any($uri, $action) {
        $this->router->addRoute('ANY', $uri, $action);
        return $this;
    }

    protected function parseIncomingRequest($request) {
        if (! $request) {
            $request = Request::capture();
        }
        $this->instance(Request::class, $this->prepareRequest($request));
        return ['ANY', '/'.trim($request->getPathInfo(), '/')];
    }

    protected function registerSessionBindings() {
        $this->singleton('session', function () {
            return $this->loadComponent('session', 'App\Providers\SessionServiceProvider');
        });

        $this->singleton('session.store', function () {
            return $this->loadComponent('session', 'App\Providers\SessionServiceProvider', 'session.store');
        });
    }

    protected function registerCookieBindings() {
        $this->singleton('cookie', function () {
            return $this->loadComponent('session', 'Illuminate\Cookie\CookieServiceProvider', 'cookie');
        });
    }

    protected function registerRedirectGeneratorBindings() {
        $this->singleton('redirect', function () {
            return new \Laravel\Lumen\Http\Redirector($this);
        });
    }

    protected function registerViewBindings() {
        $this->singleton('view', function () {
            return $this->loadComponent('view', 'App\Providers\ViewServiceProvider');
        });
    }

    protected function registerTranslationBindings() {
        $this->singleton('translator', function () {
            $this->configure('app');
            $this->instance('path.lang', APP_NAMESPACE_PATH . '/Lang');
            $this->register('App\Providers\TranslationServiceProvider');
            return $this->make('translator');
        });
    }

    public function withAliases($userAliases = []) {
        parent::withAliases([
                'Illuminate\Support\Facades\Request' => 'Request',
                'Illuminate\Support\Facades\Config' => 'Config',
                'Illuminate\Support\Facades\Blade' => 'Blade',
                'Illuminate\Support\Facades\View' => 'View',
                'Illuminate\Support\Facades\Session' => 'Session',
                'Illuminate\Support\Facades\Cookie' => 'Cookie',
                'Illuminate\Support\Facades\Storage' => 'Storage',
                'Illuminate\Support\Facades\File' => 'File',
                'Illuminate\Support\Facades\Redirect' => 'Redirect',
                'Illuminate\Support\Facades\Validator' => 'Validator',
                'Illuminate\Validation\Rule' => 'Rule',

                'App\Utils\Response' => 'Response',
                'App\Utils\Lang' => 'Lang',
                'App\Utils\Strings' => 'Strings',
                'App\Utils\Time' => 'Time',
                'App\Utils\Tpl' => 'Tpl',
                'App\Utils\Http' => 'Http',
                'App\Utils\Helper' => 'Helper',
                'App\Utils\SystemSetting' => 'SystemSetting',
                'App\Cache\SystemCache' => 'SystemCache',
                'App\Cache\AgentCache' => 'AgentCache',
                'App\Exceptions\AppException' => 'AppException',
            ]);
    }

    protected function registerContainerAliases() {
        parent::registerContainerAliases();
        $this->aliases['Illuminate\Contracts\Cookie\Factory'] = 'cookie';
        $this->aliases['Illuminate\Contracts\Cookie\QueueingFactory'] = 'cookie';
        $this->aliases['Illuminate\Session\SessionManager'] = 'session';
    }

    protected function registerAvailableBindings() {
        $this->availableBindings['cookie'] = 'registerCookieBindings';
        $this->availableBindings['Illuminate\Contracts\Cookie\Factory'] = 'registerCookieBindings';
        $this->availableBindings['Illuminate\Contracts\Cookie\QueueingFactory'] = 'registerCookieBindings';
        $this->availableBindings['session'] = 'registerSessionBindings';
        $this->availableBindings['session.store'] = 'registerSessionBindings';
        $this->availableBindings['Illuminate\Session\SessionManager'] = 'registerSessionBindings';
        $this->availableBindings['redirect'] = 'registerRedirectGeneratorBindings';
    }
}