<?php 
namespace App\Services\System;

use SystemCache;

class BankService extends \App\Services\BaseEloquentCacheService {
	public function save($data, $type) {
        $this->saveFormatData = function(&$model, &$data, &$attributes) use ($type) {
        	if(empty($data['pwd'])) {
        		unset($data['pwd']);
        	}
        };
        return parent::save($data, $type);
    }

    public function setCache() {
        SystemCache::forget('banks');
        return false;
    }
}