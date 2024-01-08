<?php
namespace App\Application\System\Callback\Controllers;

class TestController  extends BaseController {

    public function order() {
        \Log::info(http_build_query($_GET));
        \Log::info(http_build_query($_POST));
        echo 'PAY_SUCCESS';
    }
}