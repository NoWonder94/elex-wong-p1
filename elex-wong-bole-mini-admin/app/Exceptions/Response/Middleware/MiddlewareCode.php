<?php
namespace App\Exceptions\Response\Middleware;

use App\Exceptions\Response\CodeInterface;

/**
 * 中间件异常 Code
 */
class MiddlewareCode implements CodeInterface
{

    /**
     * （中间件错误） 默认错误
     */
    const MIDDLEWARE_CODE = 41000;

    /* 其他错误 */
    /**
     * （参数错误）其他错误
     */
    const MIDDLEWARE_PARAM_INVALID = 41001;

    /* 不存在错误 */
    /**
     * （数据不存在）不存在错误
     */
    const MIDDLEWARE_DATA_NOT_EXIST = 41100;

    private static $MESSAGE_TEXT = [
        /* 默认错误 */
        self::MIDDLEWARE_CODE => '中间件错误',

        /* 其他错误 */
        self::MIDDLEWARE_PARAM_INVALID => '参数错误',

        /* 不存在错误 */
        self::MIDDLEWARE_DATA_NOT_EXIST => '数据不存在'
    
    ];

    public static function getMessage($code)
    {
        return isset(self::$MESSAGE_TEXT[$code]) ? self::$MESSAGE_TEXT[$code] : self::$MESSAGE_TEXT[self::MIDDLEWARE_CODE];
    }

    public static function has($code)
    {
        return isset(self::$MESSAGE_TEXT[$code]) ? true : false;
    }
}