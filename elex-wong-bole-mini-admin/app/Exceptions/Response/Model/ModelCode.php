<?php
namespace App\Exceptions\Response\Model;

use App\Exceptions\Response\CodeInterface;

/**
 * 模型异常 Code
 */
class ModelCode implements CodeInterface
{

    /**
     * （模型错误）默认错误
     */
    const MODEL_CODE = 44000;

    /* 其他错误 */
    /**
     * （参数错误）其他错误
     */
    const MODEL_PARAM_INVALID = 44001;

    private static $MESSAGE_TEXT = [
        /* 默认错误 */
        self::MODEL_CODE => '模型错误',
        
        /* 其他错误 */
        self::MODEL_PARAM_INVALID => '参数错误'
    ];

    public static function getMessage($code)
    {
        return isset(self::$MESSAGE_TEXT[$code]) ? self::$MESSAGE_TEXT[$code] : self::$MESSAGE_TEXT[self::MODEL_CODE];
    }

    public static function has($code)
    {
        return isset(self::$MESSAGE_TEXT[$code]) ? true : false;
    }
}