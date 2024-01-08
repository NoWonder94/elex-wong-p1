<?php
namespace Helper;

/**
 * 工具类 timed 时间处理
 */
class Timed
{

    /**
     * 获取今天0点时间戳
     *
     * @return number
     */
    public static function getTodayTimed()
    {
        return strtotime(date('Y-m-d'));
    }

    /**
     * 获取昨天0点时间戳
     *
     * @return number
     */
    public static function getYesterdayTimed()
    {
        return strtotime(date('Y-m-d')) - 86400;
    }

    /**
     * 获取上1天0点时间戳
     *
     * @param int $timed            
     * @return number
     */
    public static function getDayPreTimed($timed = null)
    {
        if ($timed) {
            return strtotime('-1 day', strtotime(date('Y-m-d', $timed)));
        } else {
            return strtotime('-1 day', strtotime(date('Y-m-d')));
        }
    }

    /**
     * 获取当天0点时间戳
     *
     * @return number
     */
    public static function getDayCurrentTimed($timed = null)
    {
        if ($timed) {
            return strtotime(date('Y-m-d', $timed));
        } else {
            return strtotime(date('Y-m-d'));
        }
    }

    /**
     * 获取下1天0点时间戳
     *
     * @param int $timed            
     * @return number
     */
    public static function getDayNextTimed($timed = null)
    {
        if ($timed) {
            return strtotime('+1 day', strtotime(date('Y-m-d', $timed)));
        } else {
            return strtotime('+1 day', strtotime(date('Y-m-d')));
        }
    }

    /**
     * 获取上月1日0点时间戳
     *
     * @param int $timed            
     * @return number
     */
    public static function getMonthPreTimed($timed = null)
    {
        if ($timed) {
            return strtotime('-1 month', strtotime(date('Y-m-01', $timed)));
        } else {
            return strtotime('-1 month', strtotime(date('Y-m-01')));
        }
    }

    /**
     * 获取当月1日0点时间戳
     *
     * @param int $timed            
     * @return number
     */
    public static function getMonthCurrentTimed($timed = null)
    {
        if ($timed) {
            return strtotime(date('Y-m-01', $timed));
        } else {
            return strtotime(date('Y-m-01'));
        }
    }

    /**
     * 获取下月1日0点时间戳
     *
     * @param int $timed            
     * @return number
     */
    public static function getMonthNextTimed($timed = null)
    {
        if ($timed) {
            return strtotime('+1 month', strtotime(date('Y-m-01', $timed)));
        } else {
            return strtotime('+1 month', strtotime(date('Y-m-01')));
        }
    }

    /**
     * 获取月天数
     *
     * @param int $timed            
     * @return number
     */
    public static function getMonthDays($timed)
    {
        return date('t', $timed);
    }
}