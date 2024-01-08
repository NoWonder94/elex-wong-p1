<?php
namespace App\Utils;

class Lang extends \Illuminate\Support\Facades\Lang {
    private static $_replaces = [];

    public static function get($key, array $replace = [], $locale = null, $fallback = true) {
        $lang = parent::get($key, $replace, null, true);
        if ($lang === $key) {
            $root_key  = 'root::' . $key;
            $lang      = parent::get($root_key, $replace, null, true);

            if ($lang === $root_key) {
                $lang = $key;
            }
        }

        if (!empty($lang) && count(self::$_replaces) > 0) {
            self::_replace($lang);
        }
        return $lang;
    }

    public static function replaceLang($lang) {
        self::_replace($lang);
        return $lang;
    }

    private static function _replace(&$langs) {
        if (is_array($langs)) {
            foreach ($langs as $key => $lang) {
                self::_replace($langs[$key]);
            }
        } elseif (is_string($langs)) {
            $langs = str_replace(array_keys(self::$_replaces), array_values(self::$_replaces), $langs);
        }
    }

    public static function setReplace($data) {
        if (is_string($data)) {
            $data = explode("\n", $data);
            foreach ($data as $val) {
                $val = trim($val);
                if (empty($val)) {
                    continue;
                }

                $val = explode('=', $val, 2);
                if (count($val) == 2) {
                    $key = trim($val[0]);
                    $val = trim($val[1]);
                    if ($key !== '' && $val !== '') {
                        self::$_replaces[$key] = $val;
                    }
                }
            }
        } elseif (is_array($data)) {
            self::$_replaces = array_merge(self::$_replaces, $data);
        }
    }

    public static function format($name, $data = '') {
        if (empty($name)) {
            return '';
        }

        if (empty($data)) {
            $data = [];
        } elseif (!is_array($data)) {
            $data = [$data];
        }

        $args = [];
        if (is_array($name)) {
            $args[] = self::get(array_shift($name));
            $data   = $name;
        } else {
            $args[] = self::get($name);
            if (!is_array($data)) {
                $data = [$data];
            }
        }

        $args = array_merge($args, $data);
        return call_user_func_array("sprintf", $args);
    }
}