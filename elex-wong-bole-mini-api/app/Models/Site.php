<?php 
namespace App\Models;

use Helper;

class Site extends Base {
	public function getConfigAttribute() {
		if (empty($this->attributes['config'])) {
			return [];
		}
		return Helper::jsonDecode($this->attributes['config']);
    }

    public function setConfigAttribute($value) {
		$this->attributes['config'] = Helper::jsonEncode($value);
    }
}