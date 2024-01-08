<?php
namespace App\Cache;

use Illuminate\Support\Facades\Facade;

class SiteCache extends Facade {
    
    protected static function getFacadeAccessor() {
        return 'sitecache';
    }
}