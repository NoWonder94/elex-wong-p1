<?php
namespace App\Core\Entity\Message;

/**
 * Response 失败实体对象
 */
class ResponseError implements ResponseInterface
{

    private $resp_msg = array(
        'code' => 400,
        'message' => '操作失败',
        'errors' => array()
    );

    public function __construct($code = 400, $message = '', array $errors = [])
    {
        $this->resp_msg['code'] = $code;
        $this->resp_msg['message'] = $message;
        $this->resp_msg['errors'] = $errors;
    }

    public function setResponseCode($code)
    {
        $this->resp_msg['code'] = $code;
        
        return $this;
    }

    public function getResponseCode()
    {
        return $this->resp_msg['code'];
    }

    public function setResponseMessage($message)
    {
        $this->resp_msg['message'] = $message;
        
        return $this;
    }

    public function getResponseMessage()
    {
        return $this->resp_msg['message'];
    }

    public function setResponseErrors($errors)
    {
        $this->resp_msg['errors'] = $errors;
        
        return $this;
    }

    public function getResponseErrors()
    {
        return $this->resp_msg['errors'];
    }

    /**
     * 获取 Response 数组对象
     *
     * @return { resp_msg : { code : 400, message : 'error', errors : [] } }
     */
    public function getResponse()
    {
        return array(
            'resp_msg' => $this->resp_msg
        );
    }
}