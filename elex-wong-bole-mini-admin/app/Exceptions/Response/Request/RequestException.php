<?php
namespace App\Exceptions\Response\Request;

use Exception;
use App\Core\Response\ResponseError;

/**
 * 表单验证异常
 */
class RequestException extends Exception
{

    private $response;

    public function __construct($code = RequestCode::REQUEST_CODE, $message = '', array $errors = [])
    {
        $code = $code ? $code : RequestCode::REQUEST_CODE;
        $message = $message ? $message : RequestCode::getMessage($code);
        
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