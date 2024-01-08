<?php

require_once __DIR__.'/../vendor/autoload.php';

(new Laravel\Lumen\Bootstrap\LoadEnvironmentVariables(
    dirname(__DIR__)
))->bootstrap();

date_default_timezone_set(env('APP_TIMEZONE', 'UTC'));

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

$app = new Laravel\Lumen\Application(
    dirname(__DIR__)
);
$app->withFacades(true, [
    'Illuminate\Database\Eloquent\Model'    => 'Model',
    'Illuminate\Support\Facades\Hash'       => 'Hash',
    'Illuminate\Support\Facades\Request'    => 'Request',
    'Illuminate\Support\Facades\Validator'  => 'Validator',
    'Illuminate\Support\Facades\App'        => 'App',
    'Illuminate\Support\Facades\File'       => 'File',
    'Illuminate\Support\Facades\DB'         => 'DB',
    'App\Utils\Helper'                      => 'Helper',
    'App\Utils\Time'                        => 'Time',
    'App\Utils\Lang'                        => 'Lang',
]);

$app->withEloquent();

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

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);

/*
|--------------------------------------------------------------------------
| Register Config Files
|--------------------------------------------------------------------------
|
| Now we will register the "app" configuration file. If the file exists in
| your configuration directory it will be loaded; otherwise, we'll load
| the default version. You may register other files below as needed.
|
*/

$app->configure('site');
$app->configure('app');
$app->configure('resource');
$app->configure('lang');
$app->configure('services');
$app->configure('mail');


$app->alias('mailer', Illuminate\Mail\Mailer::class);
$app->alias('mailer', Illuminate\Contracts\Mail\Mailer::class);
$app->alias('mailer', Illuminate\Contracts\Mail\MailQueue::class);
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
$app->register(Illuminate\Mail\MailServiceProvider::class);
// $app->register(App\Providers\AppServiceProvider::class);
// $app->register(App\Providers\AuthServiceProvider::class);
// $app->register(App\Providers\EventServiceProvider::class);

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

$uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
if (!$uri) {
    exit;
}

$uriArray = explode('/', $uri);
if (count($uriArray) < 4) {
    exit;
}

$urlType = $uriArray[1];
if (!in_array($urlType, ['admin', 'api'])) {
    exit;
}
define('CONTROLLER_NAME', $uriArray[count($uriArray) - 2]);
define('ACTION_NAME', $uriArray[count($uriArray) - 1]);
$urlType = ucfirst($urlType);

$app->router->group([
    'namespace' => 'App\Application\\' . $urlType .'\\Controllers',
], function ($router) {
    require __DIR__.'/../routes/web.php';
});

return $app;
