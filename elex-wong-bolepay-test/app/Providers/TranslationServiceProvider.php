<?php
namespace App\Providers;

use Illuminate\Translation\TranslationServiceProvider as BaseTranslationServiceProvider;
use Illuminate\Translation\Translator;

class TranslationServiceProvider extends BaseTranslationServiceProvider {

    public function register() {
        $this->registerLoader();
        
        $this->app->singleton('translator', function ($app) {
            $loader = $app['translation.loader'];
            $locale = $app['config']['app.locale'];
            $loader->addNamespace('root', APP_SITE_PATH . 'app/Lang');
            $trans = new Translator($loader, $locale);
            $trans->setFallback($app['config']['app.fallback_locale']);
            return $trans;
        });
    }
}
