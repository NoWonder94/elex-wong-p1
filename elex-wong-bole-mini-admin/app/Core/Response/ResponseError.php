<?php
namespace App\Core\Response;

use App\Core\Entity\Message\ResponseError as MessageResponseError;

/**
 * 定义异常 Response 结构的唯一入口
 */
class ResponseError extends Factory
{

    public function __construct($code = 40000, $message = '', array $errors = [])
    {
        $this->response = new MessageResponseError($code, $message, $errors);
    }

    public function setResponseCode($code)
    {
        $this->response->setResponseCode($code);
        
        return $this;
    }

    public function setResponseMessage($message)
    {
        $this->response->setResponseMessage($message);
        
        return $this;
    }

    public function setResponseErrors($errors)
    {
        $this->response->setResponseErrors($errors);
        
        return $this;
    }
}