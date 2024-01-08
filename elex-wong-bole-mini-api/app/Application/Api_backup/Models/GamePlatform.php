<?php 
namespace App\Application\Site\Api\Models;

class GamePlatform extends \App\Models\Site\GamePlatform {
    protected $visible = ['code', 'name', 'image', 'icon', 'type', 'transfer_status', 'down_url', 'is_mobile', 'pc_cates', 'mobile_cates'];
    protected $appends = ['pc_cates', 'mobile_cates'];

    public function getDataAttribute() {
		if (empty($this->attributes['data'])) {
			return [];
		}
		return json_decode($this->attributes['data'], true);
    }

    public function getPcCatesAttribute() {
    	$cates = [];
		foreach ($this->cates as $cate) {
			if ($cate->is_mobile == 0) {
				$cates[] = $cate;
			}
		}
		return $this->newCollection($cates);
    }

    public function getMobileCatesAttribute() {
		$cates = [];
		foreach ($this->cates as $cate) {
			if ($cate->is_mobile == 1) {
				$cates[] = $cate;
			}
		}
		return $this->newCollection($cates);
    }

    public function cates() {
    	$relation = $this->hasMany(GameCate::class, 'game_platform_code', 'code');
    	$relation->where('status', STATUS_ENABLED)->orderBy('sort', 'asc');
		return $relation;
    }
}