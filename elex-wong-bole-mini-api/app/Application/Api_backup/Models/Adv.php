<?php 
namespace App\Application\Site\Api\Models;

class Adv extends \App\Models\Site\Adv {
	protected $visible = ['name', 'image', 'bg_color', 'url'];

	protected $appends = ['url'];

    public function getUrlAttribute() {
    	return $this->attributes['arg'];
    }
}