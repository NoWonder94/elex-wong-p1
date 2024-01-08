<?php 
namespace App\Utils;

class Validator extends \Illuminate\Validation\Validator {
	
	/**
	 * 大于
	 */
	public function validateGt($attribute, $value, $parameters) {
        return $value > $parameters[0];
    }

    /**
	 * 大于等于
	 */
	public function validateEgt($attribute, $value, $parameters) {
        return $value >= $parameters[0];
    }

    /**
	 * 小于
	 */
	public function validateLt($attribute, $value, $parameters) {
        return $value < $parameters[0];
    }

    /**
	 * 验证字符串长度
	 */
	public function validateLength($attribute, $value, $parameters) {
        return strlen($value) == $parameters[0];
    }

    public function validateLengthBetween($attribute, $value, $parameters) {
        $len = strlen($value);
        return $len >= $parameters[0] && $len <= $parameters[1];
    }

    /**
	 * 验证数组数量大于指定值
	 */
	public function validateNumGt($attribute, $value, $parameters) {
        return count($value) > $parameters[0];
    }

    /**
	 * 验证是否为指定值
	 */
	public function validateEq($attribute, $value, $parameters) {
        return $value == $parameters[0];
    }
	
	/**
	 * 验证手机号码
	 */
	public function validateMobile($attribute, $value, $parameters) {
        $pattern = '/^1\d{10}$/';
		return preg_match($pattern,$value);
    }
}