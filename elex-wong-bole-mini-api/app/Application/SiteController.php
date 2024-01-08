<?php
namespace App\Application;

use App\Services\SiteService;
use SiteCache;

trait SiteController {
    protected $site;

    public function setSite() {
        $this->site = SiteService::instance()->getByDomain(APP_SITE_DOMAIN);
        if (!$this->site) {
            die('site non existent');
        }

        if ($this->site->status != 1) {
            die('site use disable');
        }

        SiteCache::store()->setDirectory('sites/site' . $this->site->id);
        define('APP_CURRENT_SITE_ID', $this->site->id);
    }
}
