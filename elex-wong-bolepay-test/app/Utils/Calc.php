<?php 
namespace App\Utils;

/**
 * 高精度计算
 * Class Calc
 * @package App\Utils
 */
class Calc {
    /**
     * A加B
     * @param $a
     * @param $b
     * @param int $scale
     * @return string
     */
    public static function add($a, $b, $scale = 18){
		return bcadd(self::toString($a), self::toString($b), $scale);
	}

    /**
     * A减B
     * @param $a
     * @param $b
     * @param int $scale
     * @return string
     */
    public static function sub($a, $b, $scale = 18){
	    return bcsub(self::toString($a),self::toString($b),$scale);
    }

    /**
     * A乘以B
     * @param $a
     * @param $b
     * @param int $scale
     * @return string
     */
    public static function mul($a, $b, $scale = 18){
        return bcmul(self::toString($a),self::toString($b),$scale);
    }

    /**
     * A除以B
     * @param $a
     * @param $b
     * @param int $scale
     * @return string
     */
    public static function div($a, $b, $scale = 18){
        return bcdiv(self::toString($a),self::toString($b),$scale);
    }

    /**
     * 比较
     * @param $a
     * @param $b
     * @param int $scale
     * @return int
     */
    public static function comp($a, $b, $scale = 18){
        return bccomp(self::toString($a),self::toString($b),$scale);
    }

    /**
     * 是否相等
     * @param $a
     * @param $b
     * @param int $scale
     * @return bool
     */
    public static function equals($a, $b, $scale = 18){
        return bccomp(self::toString($a),self::toString($b),$scale)==0?true:false;
    }

    /**
     * A大于B
     * @param $a
     * @param $b
     * @param int $scale
     * @return bool
     */
    public static function more($a, $b, $scale = 18){
        return bccomp(self::toString($a),self::toString($b),$scale)==1?true:false;
    }

    /**
     * A小于B
     * @param $a
     * @param $b
     * @param int $scale
     * @return bool
     */
    public static function less($a, $b, $scale = 18){
        return bccomp(self::toString($a),self::toString($b),$scale)==-1?true:false;
    }

    /**
     * 转换为字符串
     * @param $num
     * @return string
     */
    public static function toString($num){
        return strval($num);
    }
}
