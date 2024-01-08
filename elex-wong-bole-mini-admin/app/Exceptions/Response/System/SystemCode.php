<?php
namespace App\Exceptions\Response\System;

use App\Exceptions\Response\CodeInterface;

/**
 * 系统异常 Code
 */
class SystemCode implements CodeInterface
{

    /* 默认错误 */
    const SYSTEM_CODE = 40000;

    /* HTTP status codes */
    /**
     * （错误请求） 服务器不理解请求的语法。
     */
    const HTTP_BAD_REQUEST = 400;

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
     * （方法禁用） 禁用请求中指定的方法。
     */
    const HTTP_METHOD_NOT_ALLOWED = 405;

    /**
     * （不接受） 无法使用请求的内容特性响应请求的网页。
     */
    const HTTP_NOT_ACCEPTABLE = 406;

    /**
     * （需要代理授权） 此状态代码与 401（未授权）类似，但指定请求者应当授权使用代理。
     */
    const HTTP_PROXY_AUTHENTICATION_REQUIRED = 407;

    /**
     * （请求超时） 服务器等候请求时发生超时。
     */
    const HTTP_REQUEST_TIMEOUT = 408;

    /**
     * （冲突） 服务器在完成请求时发生冲突。 服务器必须在响应中包含有关冲突的信息。
     */
    const HTTP_CONFLICT = 409;

    /**
     * （已删除） 如果请求的资源已永久删除，服务器就会返回此响应。
     */
    const HTTP_GONE = 410;

    /**
     * （需要有效长度） 服务器不接受不含有效内容长度标头字段的请求。
     */
    const HTTP_LENGTH_REQUIRED = 411;

    /**
     * （未满足前提条件） 服务器未满足请求者在请求中设置的其中一个前提条件。
     */
    const HTTP_PRECONDITION_FAILED = 412;

    /**
     * （请求实体过大） 服务器无法处理请求，因为请求实体过大，超出服务器的处理能力。
     */
    const HTTP_REQUEST_ENTITY_TOO_LARGE = 413;

    /**
     * （请求的 URI 过长） 请求的 URI（通常为网址）过长，服务器无法处理。
     */
    const HTTP_REQUESTURI_TOO_LARGE = 414;

    /**
     * （不支持的媒体类型） 请求的格式不受请求页面的支持。
     */
    const HTTP_UNSUPPORTED_MEDIA_TYPE = 415;

    /**
     * （请求范围不符合要求） 如果页面无法提供请求的范围，则服务器会返回此状态代码。
     */
    const HTTP_REQUESTED_RANGE_NOT_SATISFIABLE = 416;

    /**
     * （未满足期望值） 服务器未满足”期望”请求标头字段的要求。
     */
    const HTTP_EXPECTATION_FAILED = 417;

    /**
     * （要求先决条件）先决条件是客户端发送 HTTP 请求时，如果想要请求能成功必须满足一些预设的条件。
     */
    const HTTP_PRECONDITION_REQUIRED = 428;

    /**
     * （太多请求）当你需要限制客户端请求某个服务数量时，该状态码就很有用，也就是请求速度限制。
     */
    const HTTP_TOO_MANY_REQUESTS = 429;

    /**
     * （请求头字段太大）某些情况下，客户端发送 HTTP 请求头会变得很大，那么服务器可发送 431 Request Header Fields Too Large 来指明该问题。
     */
    const HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE = 431;

    /**
     * （服务器内部错误） 服务器遇到错误，无法完成请求。
     */
    const HTTP_INTERNAL_SERVER_ERROR = 500;

    /**
     * （尚未实施） 服务器不具备完成请求的功能。 例如，服务器无法识别请求方法时可能会返回此代码。
     */
    const HTTP_NOT_IMPLEMENTED = 501;

    /**
     * （错误网关） 服务器作为网关或代理，从上游服务器收到无效响应。
     */
    const HTTP_BAD_GATEWAY = 502;

    /**
     * （服务不可用） 服务器目前无法使用（由于超载或停机维护）。 通常，这只是暂时状态。
     */
    const HTTP_SERVICE_UNAVAILABLE = 503;

    /**
     * （网关超时） 服务器作为网关或代理，但是没有及时从上游服务器收到请求。
     */
    const HTTP_GATEWAY_TIMEOUT = 504;

    /**
     * （HTTP 版本不受支持） 服务器不支持请求中所用的 HTTP 协议版本。
     */
    const HTTP_HTTP_VERSION_NOT_SUPPORTED = 505;

    /**
     * （要求网络认证）
     */
    const HTTP_NETWORK_AUTHENTICATION_REQUIRED = 511;

    private static $MESSAGE_TEXT = [
        /* 默认错误 */
        self::SYSTEM_CODE => '系统错误',
        
        /* HTTP status codes */
        self::HTTP_BAD_REQUEST => '错误请求',
        self::HTTP_UNAUTHORIZED => '未授权',
        self::HTTP_FORBIDDEN => '禁止',
        self::HTTP_NOT_FOUND => '未找到',
        self::HTTP_METHOD_NOT_ALLOWED => '方法禁用',
        self::HTTP_NOT_ACCEPTABLE => '不接受',
        self::HTTP_PROXY_AUTHENTICATION_REQUIRED => '需要代理授权',
        self::HTTP_REQUEST_TIMEOUT => '请求超时',
        self::HTTP_CONFLICT => '冲突',
        self::HTTP_GONE => '已删除',
        self::HTTP_LENGTH_REQUIRED => '需要有效长度',
        self::HTTP_PRECONDITION_FAILED => '未满足前提条件',
        self::HTTP_REQUEST_ENTITY_TOO_LARGE => '请求实体过大',
        self::HTTP_REQUESTURI_TOO_LARGE => '请求的 URI 过长',
        self::HTTP_UNSUPPORTED_MEDIA_TYPE => '不支持的媒体类型',
        self::HTTP_REQUESTED_RANGE_NOT_SATISFIABLE => '请求范围不符合要求',
        self::HTTP_EXPECTATION_FAILED => '未满足期望值',
        self::HTTP_PRECONDITION_REQUIRED => '要求先决条件',
        self::HTTP_TOO_MANY_REQUESTS => '太多请求',
        self::HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE => '请求头字段太大',
        self::HTTP_INTERNAL_SERVER_ERROR => '服务器内部错误',
        self::HTTP_NOT_IMPLEMENTED => '尚未实施',
        self::HTTP_BAD_GATEWAY => '错误网关',
        self::HTTP_SERVICE_UNAVAILABLE => '服务不可用',
        self::HTTP_GATEWAY_TIMEOUT => '网关超时',
        self::HTTP_HTTP_VERSION_NOT_SUPPORTED => 'HTTP 版本不受支持',
        self::HTTP_NETWORK_AUTHENTICATION_REQUIRED => '要求网络认证'
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