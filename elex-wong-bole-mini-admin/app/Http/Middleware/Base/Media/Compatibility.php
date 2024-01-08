<?php
namespace App\Http\Middleware\Base\Media;

use Closure;
use TwHelper\Checker;

/**
 * IE浏览器兼容检查，并强制跳转到浏览器升级提示页面
 */
class Compatibility
{

    /**
     * 前置 | 后置
     *
     * @param \Illuminate\Http\Request $request            
     * @param \Closure $next            
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        return Checker::isIeOld() ? view('errors.browser') : $next($request);
    }
}