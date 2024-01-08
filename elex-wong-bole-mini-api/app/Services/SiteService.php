<?php 
namespace App\Services;

use App\Models\Site;

class SiteService extends BaseService {
    public function getByDomain($domain) {
        return Site::where('domain', $domain)->first();
    }

    public function getByAppId($appId) {
    	return Site::where('app_id', $appId)->first();
    }
}
