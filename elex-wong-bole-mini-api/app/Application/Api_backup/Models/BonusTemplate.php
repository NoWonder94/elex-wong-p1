<?php 
namespace App\Application\Site\Api\Models;

use Helper;

class BonusTemplate extends \App\Models\Site\BonusTemplate {
	protected $visible = ['id', 'name', 'game_platform_code'];

	public function getRuleAttribute() {
		if (empty($this->attributes['rule'])) {
			return [];
		}
		return Helper::jsonDecode($this->attributes['rule']);
    }
}