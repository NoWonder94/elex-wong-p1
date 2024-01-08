<?php
namespace Helper;

/**
 * 工具类 Check 验证
 */
class Checker
{

    /**
     * 是否 ie6~ie9 访问
     *
     * @return bool
     */
    public static function isIeOld()
    {
        if (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE 9.0')) {
            return true;
        } elseif (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE 8.0')) {
            return true;
        } elseif (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE 7.0')) {
            return true;
        } elseif (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE 6.0')) {
            return true;
        }
        return false;
    }

    /**
     * 是否为手机号
     *
     * @return bool
     */
    public static function isMobile($mobile)
    {
        $mobile = trim($mobile);
        $top = array(
            '121',
            '130', '131', '132', '133', '134', '135', '136', '137', '138', '139',
            '145', '147',
            '150', '151', '152', '153', '154', '155', '156', '157', '158', '159',
            '170', '171', '173', '175', '176', '177', '178',
            '180', '181', '182', '183', '184', '185', '186', '187', '188', '189'
        );
        if (! $mobile) {
            return false;
        } elseif (! preg_match('/^[0-9]{11}$/', $mobile)) {
            return false;
        } elseif (! in_array(substr($mobile, 0, 3), $top)) {
            return false;
        }
        return true;
    }
}