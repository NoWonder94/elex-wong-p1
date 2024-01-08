<?php
namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Zttp\Zttp;

class ReCaptcha implements Rule
{

    const VERIFY_URL = 'https://www.recaptcha.net/recaptcha/api/siteverify';
    
    const SITE_KEY = '6LfkdIkUAAAAABiAX5Irb-ehd8nFJZ9rJO3EXdut';
    
    const SECRET_KEY = '6LfkdIkUAAAAABMs6Bmw0oKQBk0cFdhHrQnQo20H';
    
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {}

    /**
     * Determine if the validation rule passes.
     *
     * @param string $attribute            
     * @param mixed $value            
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return $this->verify($value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return '安全验证失败，请刷新页面重试。';
    }

    /**
     * 验证谷歌验证码
     *
     * @param string $token            
     * @return boolean
     */
    private function verify($token)
    {
        $response = Zttp::asFormParams()->post(self::VERIFY_URL, [
            'secret' => self::SECRET_KEY,
            'response' => $token
        ]);
        return $response->isOk() && ($response->json())['success'];
    }
}
