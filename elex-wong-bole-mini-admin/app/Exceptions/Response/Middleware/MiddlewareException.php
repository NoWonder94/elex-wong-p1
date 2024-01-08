<?php
namespace App\Exceptions\Response\Middleware;

use Exception;
use App\Core\Response\ResponseError;

/**
 * 中间件异常
 */
class MiddlewareException extends Exception
{

    private $response;

    public function __construct($code = MiddlewareCode::MIDDLEWARE_CODE, $message = '', array $errors = [])
    {
        $code = $code ? $code : MiddlewareCode::MIDDLEWARE_CODE;
        $message = $message ? $message : MiddlewareCode::getMessage($code);
        
        $this->response = new ResponseError($code, $message, $errors);
        
        parent::__construct($message, $code);
    }

    /**
     * 报告异常
     *
     * @return void
     */
    public function report()
    {
        //
    }

    /**
     * 将异常渲染到 HTTP 响应中
     *
     * @param \Illuminate\Http\Request $request            
     * @return array
     */
    public function render($request)
    {
        return $this->response->getResponse();
    }
}