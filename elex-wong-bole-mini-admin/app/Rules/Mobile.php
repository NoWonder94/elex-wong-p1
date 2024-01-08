<?php
namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Helper\Checker;

class Mobile implements Rule
{

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
        return Checker::isMobile($value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return ':attribute 格式不正确。';
    }
}
