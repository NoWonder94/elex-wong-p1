<?php
namespace App\Application\Www\Controllers;

use SiteCache;

class CacheController  extends AuthController {

    public function index() {
        return $this->display();
    }

    public function clear() {
        SiteCache::flush();
        $this->createLog();
        return $this->successData();
    }
}