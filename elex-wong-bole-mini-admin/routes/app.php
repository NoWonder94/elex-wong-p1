<?php
use Illuminate\Support\Facades\Route;

/*
 * |--------------------------------------------------------------------------
 * | App Routes
 * |--------------------------------------------------------------------------
 * |
 * | 自定义对外页面及接口
 * |
 */

// 公共数据
Route::group([
    'prefix' => 'common'
], function () {
    // 游戏列表
    Route::get('getGameList', 'CommonController@getGameList');
    // 搜索玩家自动补全
    Route::get('searchPlayer', 'CommonController@searchPlayer');
});

// 游戏记录
Route::group([
    'prefix' => 'game/record',
    'namespace' => 'Game'
], function () {
    Route::get('/', 'RecordController@index')->name('game.record');
    Route::get('getList', 'RecordController@getList');
    Route::get('getRecordDetails', 'RecordController@getRecordDetails');
    Route::get('getPlayerRecord', 'RecordController@getPlayerRecord');
    Route::get('getPlayback', 'RecordController@getPlayback');
    // 百人棋牌
    Route::group([
        'prefix' => 'multi'
    ], function () {
        Route::get('getList', 'MultiController@getList');
        Route::get('getRecordDetails', 'MultiController@getRecordDetails');
        Route::get('getPlayerRecord', 'MultiController@getPlayerRecord');
    });
    // 老虎
    Route::group([
        'prefix' => 'slot'
    ], function () {
        Route::get('getList', 'SlotController@getList');
        Route::get('getRecordDetails', 'SlotController@getRecordDetails');
    });
});

// CQ9详情页
Route::group([
    'prefix' => 'cq9/detail',
    'namespace' => 'Cq9'
], function () {
    Route::get('/', 'DetailController@index')->name('cq9.detail');
    Route::get('getInfo', 'DetailController@getInfo');
    Route::get('getPlayerRecord', 'DetailController@getPlayerRecord');
    Route::get('getPlayback', 'DetailController@getPlayback');
});
