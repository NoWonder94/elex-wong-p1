<?php 
namespace App\Application\System\Admin\Models;

class AdminNav extends Base {
	public function nodes(){
		$relation = $this->hasMany(AdminNode::class, 'nav_id');
		return $relation;
    }

    public function childs(){
    	$relation = $this->hasMany(AdminNav::class, 'pid');
		return $relation;
    }

    public function setNameAttribute($value) {
		$this->attributes['name'] = json_encode($value);
    }

    public function getNameAttribute($value) {
    	if (empty($this->attributes['name'])) {
    		return [];
    	}
		return json_decode($this->attributes['name'], true);
    }
}