<?php
namespace App\Utils;

use Request, Lang;

class Tpl {

    public static function checkAdminNods($controller, $action) {
        $type = strtolower(APP_HOST_TYPE);
        $admin_nodes = Lang::get($type . '_admin_nodes');
        if (!isset($admin_nodes[$controller]['nodes'][$action])) {
            return false;
        } else {
            return true;
        }
    }

    public static function output($val, $isFormat = true) {
        $val = trim($val);
        if (preg_match('/@\s*(.+?)\s*\(.*?@\s*end\1/', $val)) {
            return $val;
        }

        if (preg_match('/\{.*\}/', $val)) {
            return $val;
        }
        
        if (strpos($val, '%') === 0) {
            return Lang::get(substr($val, 1));
        }

        if (strpos($val, '$.') === 0) {
            return $val;
        }

        if (strpos($val, '$') === 0) {
            if ($isFormat) {
                return '{{ '.$val.' }}';
            } else {
                return '{!! '.$val.' !!}';
            }
        }
        return $val;
    }

    public static function variable($val) {
        if (strpos($val, '$') === 0) {
            return $val;
        }

        return '"'.$val.'"';
    }

    public static function time($val, $code = '', $data = [], $attrs = []) {
        return Time::toDate($val);
    }

    public static function date($val, $code = '', $data = [], $attrs = []) {
        return Time::toDate($val, 'Y-m-d');
    }

    public static function money($val) {
        return number_format($val, 2, '.', '');
    }

    public static function image($val, $code = '', $data = [], $attrs = []) {
        $href = $val;
        $src  = $val;
        if (isset($attrs['iscut']) && $attrs['iscut'] == 1) {
            $src  = $val.'@60w_60h_1e_1c_1o.jpg';
        }
        return "<a href='{$href}' target='_blank'><img src='{$src}' style='max-width:60px; max-height:60px;' /></a>";
    }
    
    public static function status($val, $code, $data = [], $attrs = []){
        if (isset($attrs['readonly']) && $data[$attrs['readonly']] == 1) {
            return '';
        }

        $status = (int)$val;
        switch($status){
            case '0':
                return '<span title="' . Lang::get('admin.click_toggle') . '" class="badge badge-dark table-toggle table-toggle0" val="1" field="'.$code.'">' . Lang::get('admin.status_txts.0') . '</span>';
                break;
            case '1':
                return '<span title="' . Lang::get('admin.click_toggle') . '" class="badge badge-success table-toggle table-toggle1" val="0" field="'.$code.'">' . Lang::get('admin.status_txts.1') . '</span>';
                break;
            default:
                return '';
            break;
        }
    }

    public static function statusShow($val, $code, $data = [], $attrs = []){
        $status = (int)$val;
        switch($status){
            case '0':
                return '<span class="badge badge-dark" val="1" field="'.$code.'">' . Lang::get('admin.status_txts.0') . '</span>';
                break;
            case '1':
                return '<span class="badge badge-success" val="0" field="'.$code.'">' . Lang::get('admin.status_txts.1') . '</span>';
                break;
            default:
                return '';
            break;
        }
    }

    public static function toggle($val, $code, $data = [], $attrs = []){
        if (isset($attrs['readonly']) && $data[$attrs['readonly']] == 1) {
            return '';
        }

        $val = (int)$val;
        switch($val){
            case '0':
                return '<span title="' . Lang::get('admin.click_toggle') . '" class="badge badge-dark table-toggle table-toggle0" val="1" field="'.$code.'">' . Lang::get('admin.status_txts.0') . '</span>';
            break;
            case '1':
                return '<span title="' . Lang::get('admin.click_toggle') . '" class="badge badge-success table-toggle table-toggle1" val="0" field="'.$code.'">' . Lang::get('admin.status_txts.1') . '</span>';
            break;
            default:
                return '';
            break;
        }
    }

    public static function toggleShow($val, $code, $data = [], $attrs = []){
        $val = (int)$val;
        switch($val){
            case '0':
                return '<span class="badge badge-dark" val="1" field="'.$code.'">' . Lang::get('admin.status_txts.0') . '</span>';
                break;
            case '1':
                return '<span class="badge badge-success" val="0" field="'.$code.'">' . Lang::get('admin.status_txts.1') . '</span>';
                break;
            default:
                return '';
            break;
        }
    }

    public static function badge($val, $code, $data = [], $attrs = []){
        if (isset($attrs['badge-show']) && $data[$attrs['badge-show']] < 1) {
            return '';
        }

        $label = Lang::get($attrs['badge-label']);
        if (is_string($label)) {
            $label = explode(',', $label);
        }

        $css_arr = explode(',', $attrs['badge-css']);
        $val_add = isset($attrs['badge-add']) ? (int)$attrs['badge-add'] : 0;
        if ($val_add !== 0) {
            $val += $val_add;
        }

        if (!isset($css_arr[$val]) || !isset($label[$val])) {
            return '';
        }

        return "<span class='badge badge-{$css_arr[$val]}'>{$label[$val]}</span>";
    }
}