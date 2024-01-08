<?php
namespace App\Exceptions\Response\Cq9;

use App\Exceptions\Response\CodeInterface;

/**
 * 系统异常 Code
 */
class Cq9Code implements CodeInterface
{

    /* 默认错误 */
    const SYSTEM_CODE = 40000;

    /* HTTP status codes */
    /**
     * （未授权） 请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应。
     */
    const HTTP_UNAUTHORIZED = 401;

    /**
     * （禁止） 服务器拒绝请求。
     */
    const HTTP_FORBIDDEN = 403;

    /**
     * （未找到） 服务器找不到请求的网页。
     */
    const HTTP_NOT_FOUND = 404;

    /**
     * （服务不可用） 服务器目前无法使用（由于超载或停机维护）。 通常，这只是暂时状态。
     */
    const HTTP_SERVICE_UNAVAILABLE = 503;

    private static $MESSAGE_TEXT = [
        /* 默认错误 */
        self::SYSTEM_CODE => '系统错误',
        
        /* HTTP status codes */
        self::HTTP_UNAUTHORIZED => '未授权',
        self::HTTP_FORBIDDEN => '禁止',
        self::HTTP_NOT_FOUND => '未找到',
        self::HTTP_SERVICE_UNAVAILABLE => '服务不可用'
    ];

    public static function getMessage($code)
    {
        return isset(self::$MESSAGE_TEXT[$code]) ? self::$MESSAGE_TEXT[$code] : self::$MESSAGE_TEXT[self::SYSTEM_CODE];
    }

    public static function has($code)
    {
        return isset(self::$MESSAGE_TEXT[$code]) ? true : false;
    }
}