<?php
use Illuminate\Support\Facades\Route;

/*
 * |--------------------------------------------------------------------------
 * | Web Routes
 * |--------------------------------------------------------------------------
 * |
 * | Here is where you can register web routes for your application. These
 * | routes are loaded by the RouteServiceProvider within a group which
 * | contains the "web" middleware group. Now create something great!
 * |
 */

// 项目入口
Route::get('/', 'IndexController@index')->name('index')->middleware('auth.user');

// 用户相关
Route::group([
    'prefix' => 'user/auth',
    'namespace' => 'User\Auth'
], function () {
    Route::get('login', 'IndexController@signIn')->name('user.login')->middleware('auth.user.redirect');
    Route::get('logout', 'IndexController@signOut')->name('user.logout');
});
