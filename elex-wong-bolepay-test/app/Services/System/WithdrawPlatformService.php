<?php
namespace App\Services\System;

use App\Models\System\WithdrawPlatform;
use SystemCache;

class WithdrawPlatformService extends \App\Services\BaseEloquentCacheService {
    protected $catchType = 'system';

    public function get($key, $data = []) {
        $list = $this->getSystemCacheByCode('withdraw_platforms');
        if (isset($list[$key])) {
            return $list[$key];
        }
        return null;
    }

    public function getLibrarieById($id) {
        $list = $this->getSystemCacheByCode('withdraw_platforms');
        if (isset($list[$id])) {
            $librarie = '\App\Libraries\Withdraw\\' . $list[$id]['code'] . 'Librarie';
            return new $librarie($list[$id]);
        }
        return null;
    }



    public function setCache() {
        $payments = [];
        $list = WithdrawPlatform::orderBy('sort', 'ASC')->get();
        foreach ($list as $item) {
            $payments[$item->id] = $item->toArray();
        }
        SystemCache::forever('withdraw_platforms', $payments);
        return false;
    }
}