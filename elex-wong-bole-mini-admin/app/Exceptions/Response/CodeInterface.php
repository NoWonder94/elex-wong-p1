<?php
namespace App\Exceptions\Response;

/**
 * ExceptionCode 接口，定义异常错误代码的基本行为
 */
interface CodeInterface
{

    public static function getMessage($code);

    public static function has($code);
}