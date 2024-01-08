<?php
namespace App\Application\System\Callback\Controllers;

use Request;

class PlivoController  extends BaseController {

    public function message() {
        file_put_contents(storage_path('logs/message.log'), "\n=========\n" . print_r(Request::all(), true), FILE_APPEND);
    }
}