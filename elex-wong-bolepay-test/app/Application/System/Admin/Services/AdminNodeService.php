<?php 
namespace App\Application\System\Admin\Services;

use App\Application\System\Admin\Models\AdminRole;

class AdminNodeService extends EloquentService {
	protected function updateExtendHandler() {
        AdminRole::where('id', '>', 0)->update(['update_time' => UTC_TIME]);

        (new AdminNavService)->setCache();
        (new AdminRoleService)->setCache();
    }
}