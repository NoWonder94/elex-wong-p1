<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Schema;
use App\Core\Entity\Session\UserEntity;
use App\Core\Entity\Session\MemberEntity;
use App\Core\Entity\Session\PolicyEntity;

class AppServiceProvider extends ServiceProvider
{

    /**
     * 延时加载提供器
     *
     * @var bool
     */
    protected $defer = true;

    /**
     * 启动应用服务
     *
     * @return void
     */
    public function boot()
    {
        // 国际化语言切换
        App::setLocale(Cookie::get('lang', 'zh-CN'));
        
        // 数据库迁移字段默认字符串长度
        Schema::defaultStringLength(128);
    }

    /**
     * 注册服务提供器
     *
     * @return void
     */
    public function register()
    {
        // 单例 | 用户实体
        $this->app->singleton(UserEntity::class);
        // 单例 | 代理人实体
        $this->app->singleton(MemberEntity::class);
        // 单例 | 策略实体
        $this->app->singleton(PolicyEntity::class);
    }

    /**
     * 获取提供器提供的服务
     *
     * @return array
     */
    public function provides()
    {
        return [
            UserEntity::class,
            MemberEntity::class,
            PolicyEntity::class
        ];
    }
}
