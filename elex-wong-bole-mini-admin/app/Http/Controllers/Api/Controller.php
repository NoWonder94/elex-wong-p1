<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller as BaseController;
use App\Core\Response\ResponseSuccess;

class Controller extends BaseController
{
    public $response;

    public function __construct()
    {
        $this->response = new ResponseSuccess();
    }
}
