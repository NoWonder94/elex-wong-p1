<?php 
namespace App\Application\Site\Api\Services;

use App\Application\Site\Api\Models\AdvPosition;
use SiteCache;

class AdvService extends BaseService {
    private static $advPositions = null;

    protected function initialize($data = []) {
        parent::initialize($data);

        if (self::$advPositions === null) {
            self::$advPositions = SiteCache::get(CACHE_ADV_POSITIONS);
            self::$advPositions = null;
            if (!self::$advPositions) {
                self::$advPositions = [];
                $list = AdvPosition::with('advs')->get();
                foreach ($list as $item) {
                    if (isset($item->advs) && $item->advs) {
                        foreach ($item->advs as $adv) {
                            if (!isset(self::$advPositions[$adv->site_id][$item->code])) {
                                self::$advPositions[$adv->site_id][$item->code] = $item->toArray();
                                self::$advPositions[$adv->site_id][$item->code]['advs'] = [];
                            }
                            self::$advPositions[$adv->site_id][$item->code]['advs'][] = $adv->toArray();
                        }
                    }
                }
                SiteCache::forever(CACHE_ADV_POSITIONS, self::$advPositions);
            }
        }
    }

    public function lists() {
        if (!isset(self::$advPositions[APP_CURRENT_SITE_ID])) {
            return [];
        }
        return self::$advPositions[APP_CURRENT_SITE_ID];
    }

    public function get(string $code) {
        $list = $this->lists();
        if (!isset($list[$code])) {
            return null;
        }
        return $list[$code];
    }
}