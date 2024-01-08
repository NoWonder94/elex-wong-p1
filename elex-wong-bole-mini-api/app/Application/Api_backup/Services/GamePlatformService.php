<?php 
namespace App\Application\Site\Api\Services;

use App\Application\Site\Api\Models\GamePlatform;
use App\Application\Site\Api\Models\GamePlatformAll;
use SiteCache, SystemCache;

class GamePlatformService extends \App\Services\Site\GamePlatformService {
    private static $gamePlatforms = null;

    protected function initialize($data = []) {
        parent::initialize($data);

        if (self::$gamePlatforms !== null) {
            return;
        }

        self::$gamePlatforms = SiteCache::get(CACHE_GAME_PLATFORMS);
		self::$gamePlatforms = null;
        if (!self::$gamePlatforms) {
            self::$gamePlatforms = GamePlatform::with('cates')
                                                ->where('status', 1)
                                                ->where('show_status', 1)
                                                ->orderBy('sort', 'asc')
                                                ->get()
                                                ->getKeyList('code');
            SiteCache::forever(CACHE_GAME_PLATFORMS, self::$gamePlatforms);
        }

        $system_game_platforms  = SystemCache::get(CACHE_SYSTEM_GAME_PLATFORMS);
        if (empty($system_game_platforms)) {
            $system_game_platforms = GamePlatform::get()->getKeyList('code');
        }
        foreach (self::$gamePlatforms as $code => $game_platform) {
            if (isset($system_game_platforms[$code])) {  
                if ($game_platform->update_time < $system_game_platforms[$code]->update_time && $system_game_platforms[$code]->status == 0) { 
                    unset(self::$gamePlatforms[$code]);
                } 
            } else {
                unset(self::$gamePlatforms[$code]);
            }
        } 
    }
    
    public function all() {
        return GamePlatformAll::where('show_status', 1)->orderBy('sort', 'asc')->get();
    }

    public function lists() {
        return self::$gamePlatforms;
    }

    public function get(string $code) {
        if (!isset(self::$gamePlatforms[$code])) {
            return null;
        }
        return self::$gamePlatforms[$code];
    }
}