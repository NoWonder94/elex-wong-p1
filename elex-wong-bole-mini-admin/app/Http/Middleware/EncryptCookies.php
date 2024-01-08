<?php
namespace App\Http\Middleware;

use Illuminate\Cookie\Middleware\EncryptCookies as Middleware;

class EncryptCookies extends Middleware
{

    /**
     * The names of the cookies that should not be encrypted.
     *
     * @var array
     */
    protected $except = [
        \App\Core\Entity\Cookie\Factory::COOKIE_KEY_USER,
        \App\Core\Entity\Cookie\Factory::COOKIE_KEY_POLICY,
        'lang'
    ];
}
