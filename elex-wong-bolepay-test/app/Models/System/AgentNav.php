<?php
namespace App\Models\System;

class AgentNav extends Base {
	public function nodes(){
		$relation = $this->hasMany(AgentNode::class, 'nav_id');
		return $relation;
    }

    public function childs(){
    	$relation = $this->hasMany(AgentNav::class, 'pid');
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