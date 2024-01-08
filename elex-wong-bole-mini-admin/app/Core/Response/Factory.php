<?php
namespace App\Core\Response;

/**
 * Response 抽象类
 */
abstract class Factory
{

    /**
     * message 实体对象
     *
     * @var \App\Core\Entity\Message\ResponseInterface
     */
    protected $response;

    /**
     * 获取 response 数据
     *
     * @return array
     */
    public function getResponse()
    {
        return $this->response->getResponse();
    }

    /**
     * 获取 message 实体对象
     *
     * @return \App\Core\Entity\Message\ResponseInterface
     */
    public function getResponseEntity()
    {
        return $this->response;
    }
}