<?php
namespace App\Utils;

use Illuminate\Support\Facades\Facade;

class Response extends Facade{
    protected static function getFacadeAccessor() {
        return 'Laravel\Lumen\Http\ResponseFactory';
    }
}
