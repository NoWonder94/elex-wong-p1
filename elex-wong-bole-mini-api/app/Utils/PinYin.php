<?php 

namespace App\Utils;

class PinYin{
	/**  
	 * 数字拼音对照表
	 */
	private static $_numpy = array(
		'0'=>'0',
		'1'=>'1',
		'2'=>'2',
		'3'=>'3',
		'4'=>'4',
		'5'=>'5',
		'6'=>'6',
		'7'=>'7',
		'8'=>'8',
		'9'=>'9'
	);

	private static $_py_list = NULL;

	/**  
	 * 获取字符串拼音
	 * @param string $str 要获取拼音的字符串
	 * @return string
	 */ 
	public static function complie($str) {
        if(self::$_py_list === NULL) {
        	self::$_py_list = include APP_SITE_PATH . 'resources/table/pinyin-utf8.table';
        }

        $ret="";
		for($i=0; $i<mb_strlen($str); $i++) {
			$s = mb_substr($str,$i,1,'UTF-8');
            if(preg_match("/[a-zA-Z]/", $s)) {
                $ret .= strtolower($s);
            } elseif(isset(self::$_numpy[$s])) {
				$ret .= self::$_numpy[$s];
            } elseif(isset(self::$_py_list[$s])) {
                $ret .= self::$_py_list[$s];
            }
		}
		return $ret;
	}
}
?>