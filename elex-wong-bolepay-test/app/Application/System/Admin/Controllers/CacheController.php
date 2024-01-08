<?php
namespace App\Application\System\Admin\Controllers;

use SystemCache, File;

class CacheController  extends AuthController {

    public function index() {
        return $this->display();
    }

    public function clear() {

        $this->createLog();
        SystemCache::flush();
        //File::deleteDirectory(storage_path('framework/cache'), true);
		File::deleteDirectory(storage_path('framework/views'), true);
        SystemCache::resetAllAgentCache();
        return $this->successData();
    }
}