<?php
	namespace App\Models\BoleMini;
	use Illuminate\Support\Facades\DB;

	abstract class Model {
		//返回 "指定数据库"
		public static function dbConnection() {
			return DB::connection('BOLE_MINI_MYSQL');
		}

		//返回 "表另名"
		public static function dbTable($alias = NULL) {
			return empty($alias) ? self::dbConnection()->table(static::TABLENAME) : self::dbConnection()->table(static::TABLENAME.' AS '.$alias);
		}
	}
?>