<?php 
namespace App\Services\System;

use App\Models\System\Payment;
use App\Models\System\PaymentPlatform;
use SystemCache;

class PaymentService extends \App\Services\BaseEloquentCacheService {
    protected $catchType = 'system';

    public function get($key, $data = []) {
        $list = $this->getSystemCacheByCode('payments');
        if (isset($list[$key])) {
            return $list[$key];
        }
        return null;
    }

    public function getLibrarieById($id) {
        $list = $this->getSystemCacheByCode('payments');
        if (isset($list[$id])) {
            $librarie = '\App\Libraries\Payment\\' . $list[$id]['code'] . 'Librarie';
            return new $librarie($list[$id]);
        }
        return null;
    }

    public function getIdsByType($type) {
        $types = $this->getSystemCacheByCode('payment_types');
        if (isset($types[$type])) {
            return $types[$type];
        }
        return [];
    }

    public function setCache() {
        $payments = [];
        $channels = [];
        $types = [];
        $list = Payment::orderBy('sort', 'ASC')->get();
        foreach ($list as $item) {
            $types[$item->type][] = $item->id;
            $payments[$item->id] = $item->toArray();
            $channels[$item->channel][$item->id] = $payments[$item->id];
        }
        SystemCache::forever('payments', $payments);
        SystemCache::forever('payment_channels', $channels);
        SystemCache::forever('payment_platforms', PaymentPlatform::select('code','name')->orderBy('sort', 'ASC')->get());
        SystemCache::forever('platform_names', PaymentPlatform::pluck('name', 'code'));
        SystemCache::forever('payment_types', $types);
        return false;
    }
}