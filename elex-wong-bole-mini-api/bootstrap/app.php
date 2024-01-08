<?php
require_once __DIR__.'/../vendor/autoload.php';

try {
    (new Dotenv\Dotenv(__DIR__.'/../'))->load();
} catch (Dotenv\Exception\InvalidPathException $e) {
    
}

// error_reporting(E_ALL);
// ini_set('display_errors', 'On');

$configs    = include __DIR__.'/../config/app.php';
$http_host  = strtolower($_SERVER['HTTP_HOST']);
$hosts      = explode('.', $http_host);

define('APP_DEFAULT_NAMESPACE', ucfirst($configs['web_default_namespace']));

$namespace = strtolower(array_shift($hosts));
$namespace = array_search($namespace, $configs['web_namespaces']);
if (!$namespace) {
    exit;
    //$namespace = APP_DEFAULT_NAMESPACE;
}
define('APP_CURRENT_NAMESPACE', ucfirst($namespace));

$app = new App\Application(
    realpath(__DIR__.'/../')
);
//站点根目录路径
define('APP_SITE_PATH', str_replace('\\', '/', base_path()).'/');
define('APP_APPLICATION_PATH', APP_SITE_PATH . 'app/Application/');
define('APP_NAMESPACE_PATH', APP_APPLICATION_PATH . APP_CURRENT_NAMESPACE);

//$app->configure('define');
$app->configure('app');

$app->withFacades();
$app->withEloquent();

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);

$app->register(App\Providers\ValidationServiceProvider::class);
$app->register(App\Providers\EventServiceProvider::class);
$app->register(App\Providers\CacheServiceProvider::class);
//$app->register(App\Database\AthenaServiceProvider::class);


if (!in_array($namespace, $configs['web_nosession_namespaces'])) {
    $app->middleware([
        Illuminate\Cookie\Middleware\EncryptCookies::class,
        Illuminate\Session\Middleware\StartSession::class,
        Illuminate\View\Middleware\ShareErrorsFromSession::class
    ]);
}

spl_autoload_register(function($class) {
    $names  = explode('\\', $class);
    $name   = array_shift($names);
    if ($name != 'App') {
        return;
    }

    $name = array_shift($names);
    if ($name != 'Application') {
        return;
    }

    $filename   = APP_APPLICATION_PATH . implode('/', $names) . '.php';
    if (is_file($filename)) {
        include_once $filename;
        return;
    }
});

unset($configs);

$namespace_path = 'App\Application\\' . APP_CURRENT_NAMESPACE . '\\Controllers';
$app->group(['namespace' => $namespace_path], function ($app) {
    require __DIR__.'/../routes/web.php';
});

return $app;
