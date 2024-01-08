<?php
namespace Helper;

/**
 * 工具类 filter 过滤器
 */
class Filter
{

    /**
     * 时间戳转显示时间
     *
     * @param timestamp $time            
     * @return string
     */
    public static function makeDate($time)
    {
        return date('Y-m-d H:i:s', $time);
    }
}