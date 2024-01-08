<?php
namespace App\Exceptions\Response\Service;

use Exception;
use App\Core\Response\ResponseError;

/**
 * 业务逻辑异常
 */
class ServiceException extends Exception
{

    private $response;

    public function __construct($code = ServiceCode::SERVICE_CODE, $message = '', array $errors = [])
    {
        $code = $code ? $code : ServiceCode::SERVICE_CODE;
        $message = $message ? $message : ServiceCode::getMessage($code);
        
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