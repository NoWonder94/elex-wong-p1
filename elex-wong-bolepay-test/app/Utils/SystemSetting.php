<?php
namespace App\Utils;

use App\Services\System\SettingService;

class SystemSetting {
    public static function all() {
        return SettingService::instance()->lists();
    }

    public static function get($code) {
        return SettingService::instance()->get($code);
    }

    public static function update($code, $val) {
        SettingService::instance()->save([$code => $val]);
    }

    public static function reset() {
        SystemConfigService::instance()->setCache();
    }

    public static function checkAdminIp($ip) {
        if (IS_DEV_MODE) {
            return true;
        }

        $ips = trim(self::get('admin_ips'));
        $ips = empty($ips) ? [] : explode(',', $ips);
        if (count($ips) > 0 && !in_array($ip, $ips)) {
            return false;
        }
        return true;
    }

    public static function checkApiIp($ip) {
        if (IS_DEV_MODE) {
            return true;
        }

        $ips = trim(self::get('api_ips'));
        $ips = empty($ips) ? [] : explode(',', $ips);
        if (count($ips) > 0 && !in_array($ip, $ips)) {
            return false;
        }
        return true;
    }

    public static function checkClientIp($ip) {
        if (IS_DEV_MODE) {
            return true;
        }

        $ips = trim(self::get('bad_client_ips'));
        $ips = empty($ips) ? [] : explode(',', $ips);
        if (count($ips) > 0 && in_array($ip, $ips)) {
            return false;
        }
        return true;
    }
}