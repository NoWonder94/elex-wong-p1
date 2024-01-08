<?php
namespace App\Core\Entity\Session;

class PolicyEntity extends Factory
{

    /**
     * 策略数据内部 key
     */
    const KEY_POLICY = 'policy';

    /**
     * 策略 code 数据内部 key
     */
    const KEY_POLICY_CODE = 'policy_code';

    public function __construct(array $data = [])
    {
        if (count($data)) {
            $data = $this->make($data);
        } elseif (session()->has(self::SESSION_KEY_POLICY)) {
            $data = session()->get(self::SESSION_KEY_POLICY);
        }
        parent::__construct($data);
    }

    public function make($data)
    {
        return [
            self::KEY_POLICY => $data,
            self::KEY_POLICY_CODE => array_column($data, 'code')
        ];
    }

    /**
     * 获取策略
     *
     * @return array
     */
    public function getPolicy()
    {
        return $this->offsetExists(self::KEY_POLICY) ? $this->offsetGet(self::KEY_POLICY) : [];
    }

    /**
     * 设置策略
     *
     * @param array $codes            
     * @return $this
     */
    public function setPolicy($policys)
    {
        $this->offsetSet(self::KEY_POLICY, $policys);
        return $this;
    }

    /**
     * 获取策略 code
     *
     * @return array
     */
    public function getPolicyCode()
    {
        return $this->offsetExists(self::KEY_POLICY_CODE) ? $this->offsetGet(self::KEY_POLICY_CODE) : [];
    }

    /**
     * 设置策略 code
     *
     * @param array $codes            
     * @return $this
     */
    public function setPolicyCode($codes)
    {
        $this->offsetSet(self::KEY_POLICY_CODE, $codes);
        return $this;
    }

    /**
     * 验证策略是否存在
     *
     * @param string $code            
     * @return boolean
     */
    public function hasPolicyCode($code)
    {
        return in_array($code, $this->getPolicyCode());
    }

    public function save()
    {
        if ($this->count()) {
            // 保存数据到 session
            session()->put(self::SESSION_KEY_POLICY, $this->getArrayCopy());
        } else {
            // 删除数据到 session
            session()->forget(self::SESSION_KEY_POLICY);
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