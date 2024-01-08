<?php
$http_host  = strtolower($_SERVER['HTTP_HOST']);
define('APP_HTTP_HOST', $http_host);

if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') {
	$_SERVER['REQUEST_SCHEME'] = $_SERVER['HTTP_X_FORWARDED_PROTO'];
	$_SERVER['SERVER_PORT']    = $_SERVER['HTTP_X_FORWARDED_PORT'];
	$_SERVER['HTTPS']          = "on";
}

$request_paths = trim(current(explode('?', $_SERVER['REQUEST_URI'])));
if ($request_paths == '/') {
	die('Illegal request');
}

$request_paths = explode('/', $request_paths);
if (count($request_paths) < 1) {
	die('Illegal request');
}

if (count($request_paths) > 0 && empty($request_paths[0])) {
    array_shift($request_paths);
}

if (count($request_paths) > 0 && empty(end($request_paths))) {
    array_pop($request_paths);
}

if (count($request_paths) < 1) {
    exit;
}

reset($request_paths);

$full_paths = $request_paths;

require_once __DIR__.'/../vendor/autoload.php';

(new Laravel\Lumen\Bootstrap\LoadEnvironmentVariables(
    dirname(__DIR__)
))->bootstrap();

/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| Here we will load the environment and create the application instance
| that serves as the central piece of this framework. We'll use this
| application as an "IoC" container and router for this framework.
|
*/

//error_reporting(E_ALL);
//ini_set('display_errors', 'On');

$app = new App\Application(
    dirname(__DIR__)
);

//站点根目录路径
define('APP_SITE_PATH', str_replace('\\', '/', base_path()) . '/');
define('APP_APPLICATION_PATH', APP_SITE_PATH . 'app/Application/');

$app->configure('app');
$app->configure('filesystems');
$app->withFacades();

$auth_hosts = Config::get('app.hosts');
if (!isset($auth_hosts[$http_host])) {
	die('Illegal request');
}
$host_type = $auth_hosts[$http_host];

$namespace = array_shift($request_paths);

$auth_web  = Config::get('app.web_namespace.' . $host_type);
if (!isset($auth_web['namespaces'][$namespace])) {
    if ($host_type == 'agent') {
        array_unshift($request_paths, $namespace);
        $namespace = 'www';
    } else {
        die('Illegal request');
    }
}

define('APP_HOST_TYPE', ucfirst($host_type));
define('APP_CURRENT_NAMESPACE', ucfirst($namespace));
define('APP_NAMESPACE_PATH', APP_APPLICATION_PATH . APP_HOST_TYPE . '/' . APP_CURRENT_NAMESPACE . '/');

/*
|--------------------------------------------------------------------------
| Register Container Bindings
|--------------------------------------------------------------------------
|
| Now we will register a few bindings in the service container. We will
| register the exception handler and the console kernel. You may add
| your own bindings here if you like or you can make another file.
|
*/

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);

/*
|--------------------------------------------------------------------------
| Register Middleware
|--------------------------------------------------------------------------
|
| Next, we will register the middleware with the application. These can
| be global middleware that run before and after each request into a
| route or middleware that'll be assigned to some specific routes.
|
*/

// $app->middleware([
//     App\Http\Middleware\ExampleMiddleware::class
// ]);

// $app->routeMiddleware([
//     'auth' => App\Http\Middleware\Authenticate::class,
// ]);

/*
|--------------------------------------------------------------------------
| Register Service Providers
|--------------------------------------------------------------------------
|
| Here we will register all of the application's service providers which
| are used to bind services into the container. Service providers are
| totally optional, so you are not required to uncomment this line.
|
*/
$app->register(App\Providers\CacheServiceProvider::class);
$app->register(App\Providers\EventServiceProvider::class);
$app->register(Intervention\Image\ImageServiceProvider::class);
$app->register(App\Database\ElasticSearch\ServiceProvider::class);
$app->register(App\Database\MySqlElasticSearch\ServiceProvider::class);

$app->withEloquent();

if (!in_array($namespace, $auth_web['nosession'])) {
    $app->middleware([
        Illuminate\Cookie\Middleware\EncryptCookies::class,
        Illuminate\Session\Middleware\StartSession::class,
        Illuminate\View\Middleware\ShareErrorsFromSession::class
    ]);
}

/*
|--------------------------------------------------------------------------
| Load The Application Routes
|--------------------------------------------------------------------------
|
| Next we will include the routes file so that they can all be added to
| the application. This will provide all of the URLs the application
| can respond to, as well as the controllers that may handle them.
|
*/

$namespace_path = 'App\Application\\' .  APP_HOST_TYPE . '\\' . APP_CURRENT_NAMESPACE . '\Controllers';
$app->router->group(['namespace' => $namespace_path], function($router) use ($app, $full_paths, $request_paths) {
    require __DIR__."/../routes/web.php";
});

return $app;
