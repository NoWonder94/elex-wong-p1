<?php 
namespace App\Application\System\Admin\Models;

use App\Models\System\ElasticSearch;
use Helper;

class OperationLog extends ElasticSearch {

	public function setRequestAttribute($value) {
		$this->attributes['request'] = var_export($value, true);
    }

    public function setOlddataAttribute($value) {
		$this->attributes['olddata'] = var_export($value, true);
    }

    private function isEncrypt() {
	    return !APP_CURRENT_ADMIN_IS_SUPER &&
            in_array(strtolower($this->attributes['controller_action']), [
                'index/dopwd',
                'admin/create',
                'admin/update',
                'bank/create',
                'bank/update',
                'business/create',
                'business/update',
                'proxy/create',
                'proxy/update'
            ]);
    }

    public function getRequestAttribute() {
	    $value = $this->attributes['request'];
        if ($this->isEncrypt()) {
            $value = Helper::encryptData($value);
        }
        return $value;
    }

    public function getOlddataAttribute($value) {
        $value = $this->attributes['olddata'];
        if ($this->isEncrypt()) {
            $value = Helper::encryptData($value);
        }
        return $value;
    }
}