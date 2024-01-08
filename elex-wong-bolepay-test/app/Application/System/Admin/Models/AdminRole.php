<?php 
namespace App\Application\System\Admin\Models;

class AdminRole extends Base {
	public function nodes(){
    	$relation = $this->belongsToMany(AdminNode::class, 'admin_role_access', 'role_id', 'node_id');
		return $relation;
    }
}