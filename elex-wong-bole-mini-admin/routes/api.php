<?php
use Illuminate\Support\Facades\Route;

/*
 * |--------------------------------------------------------------------------
 * | API Routes
 * |--------------------------------------------------------------------------
 * |
 * | Here is where you can register API routes for your application. These
 * | routes are loaded by the RouteServiceProvider within a group which
 * | is assigned the "api" middleware group. Enjoy building your API!
 * |
 */

// 登录
Route::group([
    'prefix' => 'user/auth',
    'namespace' => 'User\Auth'
], function () {
    Route::post('sign-in', 'IndexController@signIn')->middleware('log.member.signin');
});

Route::group([
    'namespace' => 'System',
    'prefix' => 'system'
], function () {
    Route::group([
        'namespace' => 'Admin',
        'prefix' => 'admin'
    ], function () {
        //路径: '/api/system/admin/signIn'
        //Route::post('signIn', 'IndexController@signIn');
        Route::post('signIn', 'IndexController@signIn');
    });
});

// 公共数据
Route::group([
    'prefix' => 'common',
    'middleware' => 'auth.user'
], function () {
    // 游戏列表
    Route::get('getGameList', 'CommonController@getGameList');
    // 子代列表
    Route::get('getOrgSubList', 'CommonController@getOrgSubList');
    // 代理树
    Route::get('getOrgTree', 'CommonController@getOrgTree');
    // 搜索玩家自动补全
    Route::get('searchPlayer', 'CommonController@searchPlayer');
});

Route::group([
    'middleware' => 'auth.user'
], function () {
    Route::group([
        'namespace' => 'Media',
        'prefix' => 'media'
    ], function () {
        //路径: '/api/media/uploadImg'
        Route::post('uploadImg', 'IndexController@uploadImg');
    });

    Route::group([
        'namespace' => 'Member',
        'prefix' => 'member'
    ], function () {
        //路径: '/api/member/getList'
        Route::get('getList', 'IndexController@getList');
        //路径: '/api/member/createData'
        Route::post('createData', 'IndexController@createData');
        //路径: '/api/member/updateData'
        Route::post('updateData', 'IndexController@updateData');
        //路径: '/api/member/deleteData'
        Route::post('deleteData', 'IndexController@deleteData');
    });

    Route::group([
        'namespace' => 'Currency',
        'prefix' => 'currency'
    ], function () {
        //路径: '/api/currency/getList'
        Route::get('getList', 'IndexController@getList');
    });

    Route::group([
        'namespace' => 'Game',
        'prefix' => 'game'
    ], function () {
        //路径: '/api/game/getList'
        Route::get('getList', 'IndexController@getList');
        //路径: '/api/game/getDetail'
        Route::post('getDetail', 'IndexController@getDetail');
        //路径: '/api/game/createData'
        Route::post('createData', 'IndexController@createData');
        //路径: '/api/game/updateData'
        Route::post('updateData', 'IndexController@updateData');
        //路径: '/api/game/deleteData'
        Route::post('deleteData', 'IndexController@deleteData');
    });

    Route::group([
        'namespace' => 'Info',
        'prefix' => 'info'
    ], function () {
        //路径: '/api/info/getList'
        Route::get('getList', 'IndexController@getList');
        //路径: '/api/resource/directory/getDetail'
        Route::post('getDetail', 'IndexController@getDetail');
        //路径: '/api/info/createData'
        Route::post('createData', 'IndexController@createData');
        //路径: '/api/info/updateData'
        Route::post('updateData', 'IndexController@updateData');
        //路径: '/api/info/deleteData'
        Route::post('deleteData', 'IndexController@deleteData');
    });

    Route::group([
        'namespace' => 'Resource',
        'prefix' => 'resource'
    ], function () {
        Route::group([
            'namespace' => 'Directory',
            'prefix' => 'directory'
        ], function () {
            //路径: '/api/resource/directory/getList'
            Route::get('getList', 'IndexController@getList');
            //路径: '/api/resource/directory/createData'
            Route::post('createData', 'IndexController@createData');
            //路径: '/api/resource/directory/updateData'
            Route::post('updateData', 'IndexController@updateData');
            //路径: '/api/resource/directory/deleteData'
            Route::post('deleteData', 'IndexController@deleteData');
        });

        Route::group([
            'namespace' => 'File',
            'prefix' => 'file'
        ], function () {
            //路径: '/api/resource/file/getList'
            Route::get('getList', 'IndexController@getList');
            //路径: '/api/resource/file/createData'
            Route::post('createData', 'IndexController@createData');
            //路径: '/api/resource/file/updateData'
            Route::post('updateData', 'IndexController@updateData');
            //路径: '/api/resource/file/deleteData'
            Route::post('deleteData', 'IndexController@deleteData');
        });
    });

    Route::group([
        'namespace' => 'System',
        'prefix' => 'system'
    ], function () {
        Route::group([
            'namespace' => 'AdminGroup',
            'prefix' => 'adminGroup'
        ], function () {
            //路径: '/api/system/adminGroup/getList'
            Route::get('getList', 'IndexController@getList');
            //路径: '/api/system/adminGroup/createData'
            Route::post('createData', 'IndexController@createData');
            //路径: '/api/system/adminGroup/updateData'
            Route::post('updateData', 'IndexController@updateData');
            //路径: '/api/system/adminGroup/deleteData'
            Route::post('deleteData', 'IndexController@deleteData');
            //路径: '/api/system/adminGroup/getGroupMenuList'
            Route::post('getGroupMenuList', 'IndexController@getGroupMenuList');
        });

        Route::group([
            'namespace' => 'Admin',
            'prefix' => 'admin'
        ], function () {
            //路径: '/api/system/admin/getMenuAuthority'
            Route::get('initAuthority', 'IndexController@initAuthority');
            //路径: '/api/system/admin/updatePersonalData'
            Route::post('updatePersonalData', 'IndexController@updatePersonalData');
            //路径: '/api/system/admin/getList'
            Route::get('getList', 'IndexController@getList');
            //路径: '/api/system/admin/createData'
            Route::post('createData', 'IndexController@createData');
            //路径: '/api/system/admin/updateData'
            Route::post('updateData', 'IndexController@updateData');
            //路径: '/api/system/admin/deleteData'
            Route::post('deleteData', 'IndexController@deleteData');
        });
    });
});