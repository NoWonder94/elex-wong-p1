<?php
namespace App\Providers;

use App\Utils\SessionManager;

class SessionServiceProvider extends \Illuminate\Session\SessionServiceProvider {
    
    protected function registerSessionManager() {
        $this->app->singleton('session', function ($app) {
            return new SessionManager($app);
        });
    }
}
