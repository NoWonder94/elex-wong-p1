<?php 
namespace App\Application\Site\Api\Models;

class AdvPosition extends \App\Models\Site\AdvPosition {
	protected $visible = ['code', 'name', 'width', 'height', 'style', 'advs'];

	public function advs(){
    	$relation = $this->hasMany(Adv::class, 'position_id');
    	$relation->where('status', STATUS_ENABLED)->orderBy('sort', 'asc');
		return $relation;
    }
}