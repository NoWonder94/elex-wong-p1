<?php 
namespace App\Models;

class SiteAdminNav extends Base {
	public function nodes(){
		$relation = $this->hasMany(SiteAdminNode::class, 'nav_id');
		return $relation;
    }

    public function childs(){
    	$relation = $this->hasMany(SiteAdminNav::class, 'pid');
		return $relation;
    }
}