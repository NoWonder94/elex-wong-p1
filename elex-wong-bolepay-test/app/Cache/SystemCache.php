<?php
namespace App\Cache;

use Cache;

class SystemCache extends Cache {

    public static function resetAllAgentCache() {
        self::forever('catch_version', UTC_TIME);
    }
}