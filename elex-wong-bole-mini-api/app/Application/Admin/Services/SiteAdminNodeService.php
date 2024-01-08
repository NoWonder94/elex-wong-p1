<?php 
namespace App\Application\Admin\Services;

use App\Models\SiteAdminRole;

class SiteAdminNodeService extends EloquentService {
	protected function updateExtendHandler() {
        SiteAdminRole::where('id', '>', 0)->update(['update_time' => UTC_TIME]);
    }
}