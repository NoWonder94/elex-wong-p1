<?php
namespace App\Models;

use Illuminate\Support\Facades\DB;

abstract class Model
{

    /**
     * 初始化并返回数据库请求构建器
     *
     * @param string $alias            
     * @return \Illuminate\Support\Facades\DB::table(TABLENAME)
     */
    public static function dbTable($alias = null)
    {
        return empty($alias) ? DB::table(static::TABLENAME) : DB::table(static::TABLENAME . ' as ' . $alias);
    }
}