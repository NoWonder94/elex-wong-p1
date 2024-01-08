<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'admin'], function () use ($router) {
    $router->post('App/getToken',  ['uses' => 'AppController@getToken']);
    $router->post('Admin/login',  ['uses' => 'AdminController@login']);
    $router->post('Admin/getDetail',  ['uses' => 'AdminController@getDetail']);
    $router->post('Admin/update',  ['uses' => 'AdminController@update']);
    $router->post('Admin/logout',  ['uses' => 'AdminController@logout']);
    $router->post('Resource/upload',  ['uses' => 'ResourceController@upload']);

    //Home
    $router->post('Home/getList',  ['uses' => 'HomeController@getList']);
    $router->post('Home/getDetail',  ['uses' => 'HomeController@getDetail']);
    $router->post('Home/create',  ['uses' => 'HomeController@create']);
    $router->post('Home/update',  ['uses' => 'HomeController@update']);
    $router->post('Home/delete',  ['uses' => 'HomeController@delete']);

    //News
    $router->post('News/getList',  ['uses' => 'NewsController@getList']);
    $router->post('News/getDetail', ['uses' => 'NewsController@getDetail']);
    $router->post('News/create',  ['uses' => 'NewsController@create']);
    $router->post('News/update',  ['uses' => 'NewsController@update']);
    $router->post('News/delete',  ['uses' => 'NewsController@delete']);

    //Event
    $router->post('Event/getList',  ['uses' => 'EventController@getList']);
    $router->post('Event/getDetail', ['uses' => 'EventController@getDetail']);
    $router->post('Event/create',  ['uses' => 'EventController@create']);
    $router->post('Event/update',  ['uses' => 'EventController@update']);
    $router->post('Event/delete',  ['uses' => 'EventController@delete']);

    //User
    $router->post('User/getList',  ['uses' => 'UserController@getList']);
    $router->post('User/getDetail',  ['uses' => 'UserController@getDetail']);
    $router->post('User/create',  ['uses' => 'UserController@create']);
    $router->post('User/update',  ['uses' => 'UserController@update']);
    $router->post('User/delete',  ['uses' => 'UserController@delete']);

    //Admin
    $router->post('Admin/getList',  ['uses' => 'AdminController@getList']);
    $router->post('Admin/getDetail',  ['uses' => 'AdminController@getDetail']);
    $router->post('Admin/create',  ['uses' => 'AdminController@create']);
    $router->post('Admin/update',  ['uses' => 'AdminController@update']);
    $router->post('Admin/delete',  ['uses' => 'AdminController@delete']);

    //System
    $router->post('System/notifyAll', ['uses' => 'SystemController@notifyAll']);

    $router->post('Test/test',  ['uses' => 'TestController@test']);

    //Crypto
    $router->group([
        'namespace' => 'Crypto',
        'prefix'    => 'Crypto',
    ], function() use ($router) {
        //Home
        $router->post('Home/getList',  ['uses' => 'HomeController@getList']);
        $router->post('Home/getDetail',  ['uses' => 'HomeController@getDetail']);
        $router->post('Home/create',  ['uses' => 'HomeController@create']);
        $router->post('Home/update',  ['uses' => 'HomeController@update']);
        $router->post('Home/delete',  ['uses' => 'HomeController@delete']);

        //News
        $router->post('News/getList',  ['uses' => 'NewsController@getList']);
        $router->post('News/getDetail', ['uses' => 'NewsController@getDetail']);
        $router->post('News/create',  ['uses' => 'NewsController@create']);
        $router->post('News/update',  ['uses' => 'NewsController@update']);
        $router->post('News/delete',  ['uses' => 'NewsController@delete']);

        //Exclusives
        $router->post('Exclusives/getList',  ['uses' => 'ExclusivesController@getList']);
        $router->post('Exclusives/getDetail', ['uses' => 'ExclusivesController@getDetail']);
        $router->post('Exclusives/create',  ['uses' => 'ExclusivesController@create']);
        $router->post('Exclusives/update',  ['uses' => 'ExclusivesController@update']);
        $router->post('Exclusives/delete',  ['uses' => 'ExclusivesController@delete']);

        //Videos
        $router->post('Videos/getList',  ['uses' => 'VideosController@getList']);
        $router->post('Videos/getDetail', ['uses' => 'VideosController@getDetail']);
        $router->post('Videos/create',  ['uses' => 'VideosController@create']);
        $router->post('Videos/update',  ['uses' => 'VideosController@update']);
        $router->post('Videos/delete',  ['uses' => 'VideosController@delete']);

        //Guides
        $router->post('Guides/getList',  ['uses' => 'GuidesController@getList']);
        $router->post('Guides/getDetail', ['uses' => 'GuidesController@getDetail']);
        $router->post('Guides/create',  ['uses' => 'GuidesController@create']);
        $router->post('Guides/update',  ['uses' => 'GuidesController@update']);
        $router->post('Guides/delete',  ['uses' => 'GuidesController@delete']);

        //Exchanges
        $router->post('Exchanges/getList',  ['uses' => 'ExchangesController@getList']);
        $router->post('Exchanges/getDetail', ['uses' => 'ExchangesController@getDetail']);
        $router->post('Exchanges/create',  ['uses' => 'ExchangesController@create']);
        $router->post('Exchanges/update',  ['uses' => 'ExchangesController@update']);
        $router->post('Exchanges/delete',  ['uses' => 'ExchangesController@delete']);

        //MarketCap
        $router->post('MarketCap/getList',  ['uses' => 'MarketCapController@getList']);
        $router->post('MarketCap/getDetail', ['uses' => 'MarketCapController@getDetail']);
        $router->post('MarketCap/create',  ['uses' => 'MarketCapController@create']);
        $router->post('MarketCap/update',  ['uses' => 'MarketCapController@update']);
        $router->post('MarketCap/delete',  ['uses' => 'MarketCapController@delete']);

        //PriceTracker
        $router->post('PriceTracker/getList',  ['uses' => 'PriceTrackerController@getList']);
        $router->post('PriceTracker/getDetail', ['uses' => 'PriceTrackerController@getDetail']);
        $router->post('PriceTracker/create',  ['uses' => 'PriceTrackerController@create']);
        $router->post('PriceTracker/update',  ['uses' => 'PriceTrackerController@update']);
        $router->post('PriceTracker/delete',  ['uses' => 'PriceTrackerController@delete']);

        //Podcast
        $router->post('Podcast/getList',  ['uses' => 'PodcastController@getList']);
        $router->post('Podcast/getDetail', ['uses' => 'PodcastController@getDetail']);
        $router->post('Podcast/create',  ['uses' => 'PodcastController@create']);
        $router->post('Podcast/update',  ['uses' => 'PodcastController@update']);
        $router->post('Podcast/delete',  ['uses' => 'PodcastController@delete']);
    });
});

$router->group(['prefix' => 'api'], function () use ($router) {
    $router->post('App/getToken',  ['uses' => 'AppController@getToken']);
    // User
    $router->post('User/reg', ['uses' => 'SystemController@reg']);
    $router->post('User/login', ['uses' => 'SystemController@login']);
    $router->post('User/getDetail', ['uses' => 'UserController@getDetail']);
    $router->post('User/update',  ['uses' => 'UserController@update']);
    $router->post('User/logout', ['uses' => 'UserController@logout']);

    // Home
    $router->post('Home/getList', ['uses' => 'HomeController@getList']);
    $router->post('Home/getDetail', ['uses' => 'HomeController@getDetail']);
    // News
    $router->post('News/getList',  ['uses' => 'NewsController@getList']);
    $router->post('News/getDetail',  ['uses' => 'NewsController@getDetail']);
    // Event
    $router->post('Event/getList',  ['uses' => 'EventController@getList']);
    $router->post('Event/getDetail',  ['uses' => 'EventController@getDetail']);

    $router->post('Test/test',  ['uses' => 'TestController@test']);
    $router->post('Test/mail',  ['uses' => 'TestController@mail']);

    //Crypto
    $router->post('Crypto/App/getToken',  ['uses' => 'AppController@getToken']);
    $router->group([
        'namespace' => 'Crypto',
        'prefix'    => 'Crypto',
    ], function() use ($router) {
        //Home
        $router->post('Home/getList',  ['uses' => 'HomeController@getList']);
        $router->post('Home/getDetail',  ['uses' => 'HomeController@getDetail']);

        //News
        $router->post('News/getList',  ['uses' => 'NewsController@getList']);
        $router->post('News/getDetail', ['uses' => 'NewsController@getDetail']);

        //Exclusives
        $router->post('Exclusives/getList',  ['uses' => 'ExclusivesController@getList']);
        $router->post('Exclusives/getDetail', ['uses' => 'ExclusivesController@getDetail']);

        //Videos
        $router->post('Videos/getList',  ['uses' => 'VideosController@getList']);
        $router->post('Videos/getDetail', ['uses' => 'VideosController@getDetail']);

        //Guides
        $router->post('Guides/getList',  ['uses' => 'GuidesController@getList']);
        $router->post('Guides/getDetail', ['uses' => 'GuidesController@getDetail']);

        //Exchanges
        $router->post('Exchanges/getList',  ['uses' => 'ExchangesController@getList']);
        $router->post('Exchanges/getDetail', ['uses' => 'ExchangesController@getDetail']);

        //MarketCap
        $router->post('MarketCap/getList',  ['uses' => 'MarketCapController@getList']);
        $router->post('MarketCap/getDetail', ['uses' => 'MarketCapController@getDetail']);

        //PriceTracker
        $router->post('PriceTracker/getList',  ['uses' => 'PriceTrackerController@getList']);
        $router->post('PriceTracker/getDetail', ['uses' => 'PriceTrackerController@getDetail']);

        //Podcast
        $router->post('Podcast/getList',  ['uses' => 'PodcastController@getList']);
        $router->post('Podcast/getDetail', ['uses' => 'PodcastController@getDetail']);
    });
});
