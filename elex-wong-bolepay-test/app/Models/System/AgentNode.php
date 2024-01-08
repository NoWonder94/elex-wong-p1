<?php
namespace App\Models\System;

class AgentNode extends Base {
	protected $toggles = ['is_show', 'is_log'];

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