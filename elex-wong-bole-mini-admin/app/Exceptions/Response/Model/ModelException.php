<?php
namespace App\Exceptions\Response\Model;

use Exception;
use App\Core\Response\ResponseError;

/**
 * 模型异常
 */
class ModelException extends Exception
{

    private $response;

    public function __construct($code = ModelCode::MODEL_CODE, $message = '', array $errors = [])
    {
        $code = $code ? $code : ModelCode::MODEL_CODE;
        $message = $message ? $message : ModelCode::getMessage($code);
        
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