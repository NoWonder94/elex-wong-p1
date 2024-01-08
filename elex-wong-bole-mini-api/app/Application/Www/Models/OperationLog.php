<?php 
namespace App\Application\Www\Models;

class OperationLog extends Base {
    public function setRequestAttribute($value) {
		$this->attributes['request'] = var_export($value, true);
    }
	
	public function setOlddataAttribute($value) {
		$this->attributes['olddata'] = var_export($value, true);
    }
}