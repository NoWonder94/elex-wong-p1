<?php
namespace App\Core\Entity;

use ArrayObject;
use JsonSerializable;

/**
 * 类BaseEntity 描述一个基础的实体对象
 * 可以通过方法get{属性名}和set{属性名}的方式对实体进行访问
 */
class BaseEntity extends ArrayObject implements JsonSerializable
{

    public function __construct(array $data = [])
    {
        parent::__construct($data, ArrayObject::ARRAY_AS_PROPS);
    }

    /**
     * 初始化对象数据（初始化或清空）
     *
     * @param array $data            
     * @return $this
     */
    public function initData(array $data = [])
    {
        foreach ($this->getArrayCopy() as $key => $value) {
            $this->offsetUnset($key);
        }
        foreach ($data as $key => $value) {
            $this->offsetSet($key, $value);
        }
        return $this;
    }

    public function __toString()
    {
        return json_encode($this->getArrayCopy());
    }

    public function jsonSerialize()
    {
        return $this->getArrayCopy();
    }

    public function toArray()
    {
        return $this->getArrayCopy();
    }

    public function __call($method, $params)
    {
        list ($isOk, $isSet, $data) = $this->getOrSetData($method, $params);
        if (! $isOk) {
            throw new \Error(sprintf('Call to undefined method %s:%s()', static::class, $method));
        } elseif ($isSet) {
            return $this;
        } else {
            return $data;
        }
    }

    /**
     * 判断一个未知方法是否是对数据的获取get或者设置set操作，是的话就进行相应处理
     */
    protected function getOrSetData($method, $params)
    {
        $isOk = false;
        $isSet = false;
        $data = null;
        
        if (preg_match('/^(get|set)([a-zA-z0-9]+)$/', $method, $methodInfo)) {
            $isOk = true;
            $key = lcfirst($methodInfo[2]);
            if ($methodInfo[1] == 'get') {
                $data = $this->offsetExists($key) ? $this->offsetGet($key) : null;
            } else {
                $data = $this->offsetSet($key, $params[0] ?? null);
                $isSet = true;
            }
        }
        return [
            $isOk,
            $isSet,
            $data
        ];
    }
}
