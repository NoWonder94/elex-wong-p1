<?php
namespace App\Models\AppLog;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

abstract class Model
{

    /**
     * 游戏数据库--日志库
     */
    public static function dbConnection()
    {
        return DB::connection('mysql_game_log');
    }

    /**
     * 游戏数据库--日志库
     */
    public static function schemaConnection()
    {
        return Schema::connection('mysql_game_log');
    }

    /**
     * 初始化并返回数据库请求构建器
     *
     * @param string $alias            
     * @return \Illuminate\Support\Facades\DB::table(TABLENAME)
     */
    public static function dbTable($alias = null)
    {
        return empty($alias) ? self::dbConnection()->table(static::TABLENAME) : self::dbConnection()->table(static::TABLENAME . ' as ' . $alias);
    }
}