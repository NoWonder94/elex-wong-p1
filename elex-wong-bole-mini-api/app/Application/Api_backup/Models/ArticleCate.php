<?php 
namespace App\Application\Site\Api\Models;

class ArticleCate extends \App\Models\Site\ArticleCate {
	protected $visible = ['id', 'name', 'lists'];

	public function lists() {
		$relation = $this->hasMany(Article::class, 'cate_id', 'id');
    	$relation->where('status', 1)->orderBy('sort', 'asc');
		return $relation;
	}
}