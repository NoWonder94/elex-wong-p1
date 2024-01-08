<?php
namespace App\Core\Entity\Message;

/**
 * Response 成功实体对象
 */
class ResponseSuccess implements ResponseInterface
{
    private $resp_msg = array(
        'code' => 200,
        'message' => '操作成功'
    );

    private $resp_data = array();

    public function __construct(array $data = [])
    {
        $this->resp_data = $data;
    }

    public function setResponseData($data)
    {
        $this->resp_data = $data;
        
        return $this;
    }

    public function getResponseData()
    {
        return $this->resp_data;
    }

    /**
     * 获取 Response 数组对象
     *
     * @return { resp_msg : { code : 200, message : 'success' }, resp_data : {} }
     */
    public function getResponse()
    {
        return array(
            'resp_msg' => $this->resp_msg,
            'resp_data' => $this->resp_data
        );
    }
}