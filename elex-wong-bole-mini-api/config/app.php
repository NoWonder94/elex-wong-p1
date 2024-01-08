<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Application Name
    |--------------------------------------------------------------------------
    |
    | This value is the name of your application. This value is used when the
    | framework needs to place the application's name in a notification or
    | any other location as required by the application or its packages.
    */

    'name' => env('APP_NAME', 'Laravel'),

    /*
    |--------------------------------------------------------------------------
    | Application Environment
    |--------------------------------------------------------------------------
    |
    | This value determines the "environment" your application is currently
    | running in. This may determine how you prefer to configure various
    | services your application utilizes. Set this in your ".env" file.
    |
    */

    'env' => env('APP_ENV', 'production'),

    /*
    |--------------------------------------------------------------------------
    | Application Debug Mode
    |--------------------------------------------------------------------------
    |
    | When your application is in debug mode, detailed error messages with
    | stack traces will be shown on every error that occurs within your
    | application. If disabled, a simple generic error page is shown.
    |
    */

    'debug' => env('APP_DEBUG', false),

    /*
    |--------------------------------------------------------------------------
    | Application URL
    |--------------------------------------------------------------------------
    |
    | This URL is used by the console to properly generate URLs when using
    | the Artisan command line tool. You should set this to the root of
    | your application so that it is used when running Artisan tasks.
    |
    */

    'url' => env('APP_URL', 'http://www.service.go6677.com'),

    /*
    |--------------------------------------------------------------------------
    | Application Timezone
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default timezone for your application, which
    | will be used by the PHP date and date-time functions. We have gone
    | ahead and set this to a sensible default for you out of the box.
    |
    */

    'timezone' => env('APP_TIMEZONE', 'UTC'),

    /*
    |--------------------------------------------------------------------------
    | Application Locale Configuration
    |--------------------------------------------------------------------------
    |
    | The application locale determines the default locale that will be used
    | by the translation service provider. You are free to set this value
    | to any of the locales which will be supported by the application.
    |
    */

    'locale' => 'zh-CN',

    /*
    |--------------------------------------------------------------------------
    | Application Fallback Locale
    |--------------------------------------------------------------------------
    |
    | The fallback locale determines the locale to use when the current one
    | is not available. You may change the value to correspond to any of
    | the language folders that are provided through your application.
    |
    */

    'fallback_locale' => 'zh-CN',

    /*
    |--------------------------------------------------------------------------
    | Encryption Key
    |--------------------------------------------------------------------------
    |
    | This key is used by the Illuminate encrypter service and should be set
    | to a random, 32 character string, otherwise these encrypted strings
    | will not be safe. Please do this before deploying an application!
    |
    */

    'key' => env('APP_KEY'),

    'cipher' => 'AES-256-CBC',

    /*
    |--------------------------------------------------------------------------
    | Logging Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure the log settings for your application. Out of
    | the box, Laravel uses the Monolog PHP logging library. This gives
    | you a variety of powerful log handlers / formatters to utilize.
    |
    | Available Settings: "single", "daily", "syslog", "errorlog"
    |
    */

    'log' => env('APP_LOG', 'single'),

    'log_level' => env('APP_LOG_LEVEL', 'debug'),

    'tpl_version' => 'v1.3.0',

    'proxy_site_name' => '代理平台',

    'www_site_name' => '服务管理平台',
	
	'encrypter_key' => 'OwS9gnL21xsRlsdF8c7mBS6bJMLKBNvI',
    'encrypter_iv'  => 'KXpZE8BUYOSsdLA8',
 

    'host' => 'service.go6677.com',
    'web_default_namespace' => 'www',
    'web_namespaces' => [
        'www'       => 'www',
        'admin'     => 'admin',
        'callback'  => 'callback',
        'api'       => 'api',
        'proxy'     => 'proxy'
    ],
    'web_nosession_namespaces' => ['callback', 'api'],

    'server_url' => 'https://admin.bolegaming.com/',
    //'server_url' => 'http://admin.bolemini.com/',
    'file_location' => [
        'game' => [
            'icon' => 'img/bole_mini/upload/game/icon/',
            'img' => 'img/bole_mini/upload/game/img/',
            'file' => 'img/bole_mini/upload/game/file/'
        ],
        'info' => [
            'img_banner' => 'img/bole_mini/upload/info/img_banner/',
            'img' => 'img/bole_mini/upload/info/img/'
        ],
        'directory' => 'img/bole_mini/upload/directory/',
        'file' => 'img/bole_mini/upload/file/',
        'screenshot' => 'img/bole_mini/upload/screenshot/game/'
    ]
];

/*SK72e33050e15f690dbbb1595ac864b32b
rt1xQGBRX8o58KmSkPryWBFupzOudgdb
https://voicetest.yolo168.xyz/voice
https://voicetest.yolo168.xyz/voiceCallback*/