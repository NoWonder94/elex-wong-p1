<?php 
namespace App\Models\Site;

use Helper;

class ProxyLevelLog extends Base { 
 
	public function proxy() { 
    	$relation = $this->hasOne(Proxy::class, 'id', 'proxy_id');
		return $relation;
	}
 
	public function level() { 
    	$relation = $this->hasOne(ProxyLevel::class, 'id', 'level_id');
		return $relation;
	}
 
	public function beforeLevel() { 
    	$relation = $this->hasOne(ProxyLevel::class, 'id', 'before_level_id');
		return $relation;
	}

}