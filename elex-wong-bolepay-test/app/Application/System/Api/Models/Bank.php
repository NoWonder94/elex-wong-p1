<?php 
namespace App\Application\System\Api\Models;

use Lang;

class Bank extends \App\Models\System\Bank {
	protected $visible = ['id', 'mode', 'type', 'card', 'account', 'pwd', 'name', 'show_name', 'data'];
    protected $appends = ['show_name'];

    public function setPwdAttribute($value) {
        $this->attributes['pwd'] = $value;
    }

    public function getDataAttribute() {
        if (is_array($this->attributes['data'])) {
            return $this->attributes['data'];
        }

        $data = trim($this->attributes['data']);
        if (empty($data)) {
            return null;
        }

        return @json_decode($data, true);
    }

    public function getShowNameAttribute() {
        $name = $this->attributes['name'];
        $card = $this->attributes['card'];
        return Lang::get('common.bank_types.' . $this->attributes['type']) . " {$name} ({$card})";
    }
}