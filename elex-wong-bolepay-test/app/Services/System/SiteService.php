<?php 
namespace App\Services\System;

use App\Models\System\Site;
use SystemCache, Strings;

class SiteService extends \App\Services\BaseEloquentCacheService {

	public function create($data) {
		$data['create_time'] = UTC_TIME;
        $data['update_time'] = UTC_TIME;
		$data['app_id'] = md5(Strings::randString(22) . UTC_TIME);
        $data['app_secret'] = md5(Strings::randString(22) . UTC_TIME);
		
		return parent::create($data);
    }

    public function update($data) {

        $data['update_time'] = UTC_TIME;

    	if (isset($data['reset_app_id']) && $data['reset_app_id'] == 1) {
			$data['app_id'] = md5(Strings::randString(22) . UTC_TIME);
		}

		if (isset($data['reset_app_secret']) && $data['reset_app_secret'] == 1) {
			$data['app_secret'] = md5(Strings::randString(22) . UTC_TIME);
		}

		unset($data['reset_app_id'], $data['reset_app_secret']);
        return parent::update($data);
    }

    public function getById($id) {
        $list = $this->getSystemCacheByCode('sites');
        if (isset($list['lists'][$id])) {
            return $list['lists'][$id];
        }
        return null;
    }

    public function getByAppId($appId) {
        $list = $this->getSystemCacheByCode('sites');
        if (isset($list['app_ids'][$appId])) {
            return $list['app_ids'][$appId];
        }
        return null;
    }

    public function formatRequestArgs($site, $data) {
        $data['app_id'] = $site->app_id;
        $data['sign']   = $this->getSign($site, $data);
        return $data;
    }

    public function getSign($site, $data, $isEncode = false) {
        ksort($data);
        reset($data);
		
        $sign = '';
        foreach ($data as $key => $val) {
			$sign .= $key . '=' . strtolower(urlencode($val)) . '&';
        }
        $sign .= 'app_secret=' . $site->app_secret;
        return md5($sign);
    }

    public function setCache() {
        $sites = [];
        $list = Site::get();
        foreach ($list as $item) {
            $sites['codes'][$item->code] = ['id' => $item->id];
            $sites['lists'][$item->id] = $item;
            $sites['app_ids'][$item->app_id] = $item;
        }
        SystemCache::forever('sites', $sites);
        return false;
    }
}