<?php 
namespace App\Application\Site\Api\Models;

use App\Models\Site\GameStatistic;

class Game extends \App\Models\Site\Game {
	protected $visible = ['id', 'name', 'game_platform_code', 'image', 'is_demo', 'bets'];

	protected $appends = ['bets'];

	public function statistic() {
		return $this->hasOne(GameStatistic::class, 'game_id', 'id');
    }

	public function getBetsAttribute() {
		if (!isset($this->statistic) || !$this->statistic) {
			return 0;
		}
    	return $this->statistic->bets;
    }
}