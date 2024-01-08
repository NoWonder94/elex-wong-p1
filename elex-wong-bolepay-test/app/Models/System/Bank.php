<?php 
namespace App\Models\System;

use App\Services\System\ServerService;
use Config, Lang;

class Bank extends Base {
    public $isUpdateTime = true;
    public $isSetAdmin = true;
    protected $appends = ['full_name', 'short_name', 'server'];

	public function setPwdAttribute($value) {
		$this->attributes['pwd'] = openssl_encrypt($value, 'AES-256-CBC', Config::get('app.encrypter_key'), 0, Config::get('app.encrypter_iv'));
    }
	
	public function getShortNameAttribute() {
	    $name = $this->attributes['name'];

	    if (mb_strlen($name, 'UTF-8') > 3) {
            $name = mb_substr($name, 0, 3, 'UTF-8') . '...';
        }

	    $card = $this->attributes['card'];
        if (strlen($card) > 8) {
            $card = substr($card, -8, 8);
        }
        return Lang::get('common.bank_types.' . $this->attributes['type']) . " {$name} ({$card})";
    }

    public function getFullNameAttribute() {
        $name = $this->attributes['name'];
        $card = $this->attributes['card'];
        return Lang::get('common.bank_types.' . $this->attributes['type']) . " {$name} ({$card})";
    }

    public function getServerAttribute() {
        $server_id = (int)$this->attributes['server_id'];
        if ($server_id > 0) {
            return ServerService::instance()->getById($server_id);
        }
        return null;
    }
}