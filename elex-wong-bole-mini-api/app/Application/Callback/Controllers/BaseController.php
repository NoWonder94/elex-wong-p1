<?php
namespace App\Application\Callback\Controllers;

use App\Application\SiteController;

abstract class BaseController extends \App\Application\BaseController {
    use SiteController;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        parent::__construct();
        $this->setSite();
    }
}
