<?php
namespace App\Core\Entity\Session;

class Cq9Entity extends Factory
{

    /**
     * CQ9 token 解析返回参数 key
     */
    const KEY_PARAM = 'param';

    public function __construct(array $data = [])
    {
        if (! count($data) && session()->has(self::SESSION_KEY_CQ9)) {
            $data = session()->get(self::SESSION_KEY_CQ9);
        }
        parent::__construct($data);
    }

    /**
     * 获取参数数据
     *
     * @return array
     */
    public function getParam()
    {
        return $this->offsetExists(self::KEY_PARAM) ? $this->offsetGet(self::KEY_PARAM) : [];
    }

    /**
     * 设置参数数据
     *
     * @param array $param            
     * @return $this
     */
    public function setParam($param)
    {
        $this->offsetSet(self::KEY_PARAM, $param);
        return $this;
    }

    /**
     * 验证参数是否存在
     *
     * @return boolean
     */
    public function hasParam()
    {
        return $this->offsetExists(self::KEY_PARAM);
    }

    public function save()
    {
        if ($this->count()) {
            // 保存数据到 session
            session()->put(self::SESSION_KEY_CQ9, $this->getArrayCopy());
        } else {
            // 删除数据到 session
            session()->forget(self::SESSION_KEY_CQ9);
        }
    }

    /**
     * 析构函数，同步数据到 session
     */
    public function __destruct()
    {
        $this->save();
    }
}