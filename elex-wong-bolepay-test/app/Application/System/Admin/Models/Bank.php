<?php 
namespace App\Application\System\Admin\Models;

use App\Services\System\ServerService;

class Bank extends \App\Models\System\Bank {
	protected $appends = ['server'];

    public function getServerAttribute() {
    	$server_id = (int)$this->attributes['server_id'];
    	if ($server_id > 0) {
    		return ServerService::instance()->getById($server_id);
    	}
    	return null;
    }
}