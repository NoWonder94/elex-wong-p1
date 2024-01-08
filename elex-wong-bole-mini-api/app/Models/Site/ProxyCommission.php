<?php 
namespace App\Models\Site;
 
class ProxyCommission extends Base { 
 
	public function proxy() { 
    	$relation = $this->hasOne(Proxy::class, 'id', 'proxy_id');
		return $relation;
	}

}