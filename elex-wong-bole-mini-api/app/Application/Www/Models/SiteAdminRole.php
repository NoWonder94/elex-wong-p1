<?php 
namespace App\Application\Www\Models;

use App\Models\SiteAdminNode;

class SiteAdminRole extends Base {
	
    public function nodes(){
    	$relation = $this->belongsToMany(SiteAdminNode::class, 'admin_role_access', 'role_id', 'node_id');
		return $relation;
    }
}