<?php
namespace App\Utils;

use App\Application\Services\Resources\BosService;
use Lang, Config;

class Format {
    public static function likeQuote($str){
        return strtr($str, ['_' => '\_', '%' => '\%']);
    }

    public static function image($url, $withd = 0, $height = 0, $isCat = 1){
        if ($withd < 1 && $height < 1) {
            return $url;
        }

        $url .= '@';
        if($withd > 0){
            $url .= $withd.'w_';
        }
        if($height > 0){
            $url .= $height.'h_';
        }
        if($isCat > 0 && $withd > 0 && $height > 0){
            $url .= '1e_1c_';
        }
        return $url.'1o.png';
    }

    public static function jsonStr($str) {
        return str_replace('"', '\\"', $str);
    }

    public static function day($time){
        return Time::toDate($time, 'Y-m-d');
    }

    public static function time($time, $format = 'Y-m-d H:i:s'){
        return Time::toDate($time, $format);
    }

    public static function money($money, $isPrefix = true, $isUnit = false) {
        return ($isPrefix ? Lang::get('common.money_prefix') : '') . number_format($money, 2, '.', '') . ($isUnit ? Lang::get('common.money_unit') : '');
    }
}