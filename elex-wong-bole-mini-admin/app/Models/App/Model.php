<?php
namespace App\Models\App;

use Illuminate\Support\Facades\DB;

abstract class Model
{

    /**
     * 游戏数据库
     */
    public static function dbConnection()
    {
        return DB::connection('mysql_game');
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