<?php
namespace App\Exceptions\Response\Request;

use App\Exceptions\Response\CodeInterface;

/**
 * 表单验证异常 Code
 */
class RequestCode implements CodeInterface
{

    /**
     * （表单验证错误）默认错误
     */
    const REQUEST_CODE = 42000;

    /* 其他错误 */
    /**
     * （参数错误）其他错误
     */
    const REQUEST_PARAM_INVALID = 42001;

    private static $MESSAGE_TEXT = [
        /* 默认错误 */
        self::REQUEST_CODE => '表单验证错误',

        /* 其他错误 */
        self::REQUEST_PARAM_INVALID => '参数错误'
    ];

    public static function getMessage($code)
    {
        return isset(self::$MESSAGE_TEXT[$code]) ? self::$MESSAGE_TEXT[$code] : self::$MESSAGE_TEXT[self::REQUEST_CODE];
    }

    public static function has($code)
    {
        return isset(self::$MESSAGE_TEXT[$code]) ? true : false;
    }
}