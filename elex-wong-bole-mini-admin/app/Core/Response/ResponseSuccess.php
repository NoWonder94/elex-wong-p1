<?php
namespace App\Core\Response;

use App\Core\Entity\Message\ResponseSuccess as MessageResponseSuccess;

/**
 * 定义成功 Response 结构的唯一入口
 */
class ResponseSuccess extends Factory
{

    public function __construct(array $data = [])
    {
        $this->response = new MessageResponseSuccess($data);
    }

    public function setResponseData($data)
    {
        $this->response->setResponseData($data);
        
        return $this;
    }
}