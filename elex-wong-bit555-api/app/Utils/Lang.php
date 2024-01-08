<?php
	namespace App\Utils;
	use App, Config;
	
	class Lang {
		public static function get($string, $lang = DEFAULT_LANGUAGE) {
			self::initializeLanguage($lang);

			return self::getLanguageString($string);
		}

		private static function initializeLanguage($lang) {
			$langLocation = Config('lang.folder_location');
			if (!$langLocation) {
				return self::getLanguageString('lang.91001');
			}

			$langList = scandir($langLocation);
			if (empty($langList) || !is_array($langList)) {
				return self::getLanguageString('lang.91001');
			}

			/*
			array_shift($langList);
			array_shift($langList);

			if (!in_array($lang, $langList)) {
        		return self::getLanguageString('error.91002');
    		}
			*/

			App::setLocale($lang);
		}

		private static function getLanguageString($string) {
			return __($string);
		}
	}
?>