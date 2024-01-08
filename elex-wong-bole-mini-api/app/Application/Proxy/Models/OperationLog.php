<?php 
namespace App\Application\Proxy\Models;

class OperationLog extends Base {
    public function setRequestAttribute($value) {
		$this->attributes['request'] = var_export($value, true);
    }
}