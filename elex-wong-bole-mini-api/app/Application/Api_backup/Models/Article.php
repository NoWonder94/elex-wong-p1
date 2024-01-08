<?php 
namespace App\Application\Site\Api\Models;

use Time;

class Article extends \App\Models\Site\Article {
	protected $visible = ['id', 'rewrite', 'title', 'image', 'brief', 'content', 'activity_time', 'create_time'];

	public function getCreateTimeAttribute() {
		return Time::toDate($this->attributes['create_time']);
	}

}