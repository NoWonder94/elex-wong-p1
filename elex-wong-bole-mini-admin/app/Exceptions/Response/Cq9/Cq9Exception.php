<?php
namespace App\Exceptions\Response\Cq9;

use Exception;
use App\Core\Response\ResponseError;

/**
 * 系统异常
 */
class Cq9Exception extends Exception
{

    private $response;

    public function __construct($code = Cq9Code::SYSTEM_CODE, $message = '', array $errors = [])
    {
        $code = $code ? $code : Cq9Code::SYSTEM_CODE;
        $message = $message ? $message : Cq9Code::getMessage($code);
        
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
        if ($request->route()->getActionMethod() == 'index') {
            return response()->view('errors.cq9', [
                'exception' => $this
            ]);
        }
        return $this->response->getResponse();
    }
}