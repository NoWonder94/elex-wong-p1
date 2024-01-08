<?php
namespace App\Exceptions\Response\Service;

use App\Exceptions\Response\CodeInterface;

/**
 * 业务逻辑异常 Code
 */
class ServiceCode implements CodeInterface
{

    /**
     * （业务逻辑错误）默认错误
     */
    const SERVICE_CODE = 43000;

    /* 其他错误 */
    /**
     * （参数错误）其他错误
     */
    const SERVICE_PARAM_INVALID = 43001;

    /**
     * （密码错误）其他错误
     */
    const SERVICE_PARAM_INVALID_PASSWORD = 43002;
    
    /**
     * （时间范围错误）其他错误
     */
    const SERVICE_DATE_RANGE_ERROR = 43004;
    
    /* 不存在错误 */
    /**
     * （数据不存在）不存在错误
     */
    const SERVICE_NOT_EXIST_DATA = 43100;

    /**
     * （用户不存在）不存在错误
     */
    const SERVICE_NOT_EXIST_USER = 43101;

    /**
     * （邮箱不存在）不存在错误
     */
    const SERVICE_NOT_EXIST_EMAIL = 43102;

    /**
     * （代理人不存在）不存在错误
     */
    const SERVICE_NOT_EXIST_MEMBER = 43111;

    /* 存在错误 */
    /**
     * （数据已存在）存在错误
     */
    const SERVICE_EXISTED_DATA = 43200;

    /**
     * （用户已存在）存在错误
     */
    const SERVICE_EXISTED_USER = 43201;

    /**
     * （邮箱已存在）存在错误
     */
    const SERVICE_EXISTED_EMAIL = 43202;

    /**
     * （代理人已存在）存在错误
     */
    const SERVICE_EXISTED_MEMBER = 43211;

    /**
     * （账号已被代理人关联）存在错误
     */
    const SERVICE_EXISTED_MEMBER_RELATION_USER = 43212;

    /**
     * （组织存在子节点）存在错误
     */
    const SERVICE_EXISTED_ORG_CHILDREN = 43221;

    /* 操作错误 */
    /**
     * （保存失败）操作错误
     */
    const SERVICE_ACTION_SAVE_ERROR = 43300;

    /**
     * （禁止操作）操作错误
     */
    const SERVICE_ACTION_DISABLE = 43301;

    /* 禁用错误 */
    /**
     * （数据被禁用）禁用错误
     */
    const SERVICE_DISABLE_DATA = 43400;

    /**
     * （用户被禁用）禁用错误
     */
    const SERVICE_DISABLE_USER = 43401;

    /**
     * （代理人被禁用）禁用错误
     */
    const SERVICE_DISABLE_MEMBER = 43411;

    /* 权限错误 */
    /**
     * （数据未授权）权限错误
     */
    const SERVICE_NOT_AUTH_DATA = 43500;

    /**
     * （用户未授权）权限错误
     */
    const SERVICE_NOT_AUTH_USER = 43501;

    /* 超级管理员 */
    /**
     * （超级管理员）超级管理员
     */
    const SERVICE_SUPER_ADMIN = 43700;

    /**
     * （没有权限管理该账号）超级管理员
     */
    const SERVICE_SUPER_ADMIN_AUTH = 43701;

    /* 金币 */
    /**
     * （金币）金币
     */
    const SERVICE_COIN = 43800;

    /**
     * （金币数量为空）金币
     */
    const SERVICE_COIN_EMPTY = 43801;

    /**
     * （金币数量不足）金币
     */
    const SERVICE_COIN_LACK = 43802;

    /* 游戏服务错误 */
    /**
     * 游戏服务错误
     */
    const SERVICE_GAME_SERVICE = 43900;

    /**
     * 游戏服务token不存在
     */
    const SERVICE_GAME_SERVICE_NOT_EXIST_TOKEN = 43901;

    /**
     * 游戏服务内部错误
     */
    const SERVICE_GAME_SERVICE_SYSTEM_ERROR = 43902;

    /**
     * 游戏服务请求超时
     */
    const SERVICE_GAME_SERVICE_REQUEST_TIMEOUT = 43903;

    const ERROR_ADMIN_NO_EXIST = 50001;
    const ERROR_ADMIN_PASSWORD_INCORRECT = 50002;
    const ERROR_ADMIN_NO_PERMIT = 50003;
    const ERROR_IMG_REQUIRE = 50004;
    const ERROR_IMG_FORMAT = 50005;
    const ERROR_FILE_REQUIRE = 50006;
    const ERROR_FILE_FORMAT = 50007;
    const ERROR_ID_REQUIRE = 50008;

    private static $MESSAGE_TEXT = [
        self::ERROR_ADMIN_NO_EXIST => '用户不存在',
        self::ERROR_ADMIN_PASSWORD_INCORRECT => '密码错误',
        self::ERROR_ADMIN_NO_PERMIT => '用户没权限',
        self::ERROR_IMG_REQUIRE => '图片不能为空',
        self::ERROR_IMG_FORMAT => '图片格式错误',
        self::ERROR_FILE_REQUIRE => '文件不能为空',
        self::ERROR_FILE_FORMAT => '文件格式错误: 请上传PDF或RAR格式',
        self::ERROR_ID_REQUIRE => 'ID不能为空',

        /* 默认错误 */
        self::SERVICE_CODE => '业务逻辑错误',

        /* 其他错误 */
        self::SERVICE_PARAM_INVALID => '参数错误',
        self::SERVICE_PARAM_INVALID_PASSWORD => '密码错误',
        self::SERVICE_DATE_RANGE_ERROR => '时间范围错误',

        /* 不存在错误 */
        self::SERVICE_NOT_EXIST_DATA => '数据不存在',
        self::SERVICE_NOT_EXIST_USER => '用户不存在',
        self::SERVICE_NOT_EXIST_EMAIL => '邮箱不存在',
        self::SERVICE_NOT_EXIST_MEMBER => '代理人不存在',

        /* 存在错误 */
        self::SERVICE_EXISTED_DATA => '数据已存在',
        self::SERVICE_EXISTED_USER => '用户已存在',
        self::SERVICE_EXISTED_EMAIL => '邮箱已存在',
        self::SERVICE_EXISTED_MEMBER => '代理人已存在',
        self::SERVICE_EXISTED_MEMBER_RELATION_USER => '账号已被代理人关联',
        self::SERVICE_EXISTED_ORG_CHILDREN => '组织存在子节点',

        /* 操作错误 */
        self::SERVICE_ACTION_SAVE_ERROR => '保存失败',
        self::SERVICE_ACTION_DISABLE => '禁止操作',
        
        /* 禁用错误 */
        self::SERVICE_DISABLE_DATA => '数据被禁用',
        self::SERVICE_DISABLE_USER => '用户被禁用',
        self::SERVICE_DISABLE_MEMBER => '代理人被禁用',
        
        /* 权限错误 */
        self::SERVICE_NOT_AUTH_DATA => '数据未授权',
        self::SERVICE_NOT_AUTH_USER => '用户未授权',
        
        /* 超级管理员 */
        self::SERVICE_SUPER_ADMIN => '超级管理员',
        self::SERVICE_SUPER_ADMIN_AUTH => '没有权限管理该账号',

        /* 金币 */
        self::SERVICE_COIN => '金币',
        self::SERVICE_COIN_EMPTY => '金币数量为空',
        self::SERVICE_COIN_LACK => '金币数量不足',
        
        /* 游戏服务错误 */
        self::SERVICE_GAME_SERVICE => '游戏服务错误',
        self::SERVICE_GAME_SERVICE_NOT_EXIST_TOKEN => '游戏服务 token 不存在',
        self::SERVICE_GAME_SERVICE_SYSTEM_ERROR => '游戏服务内部错误',
        self::SERVICE_GAME_SERVICE_REQUEST_TIMEOUT => '游戏服务请求超时',
    ];

    public static function getMessage($code)
    {
        return isset(self::$MESSAGE_TEXT[$code]) ? self::$MESSAGE_TEXT[$code] : self::$MESSAGE_TEXT[self::SERVICE_CODE];
    }

    public static function has($code)
    {
        return isset(self::$MESSAGE_TEXT[$code]) ? true : false;
    }
}