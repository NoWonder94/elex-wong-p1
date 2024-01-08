<?php 
namespace App\Models;

class KeyCollection extends \Illuminate\Database\Eloquent\Collection {
    protected $keyName;

	public function setKeyName($name) {
        $this->keyName = $name;
    }

    public function toArray() {
        $items = is_null($items) ? $this->items : $items;

        $dictionary = [];

        $name = $this->keyName;

        foreach ($items as $value) {
            $dictionary[$value->$name] = $value->toArray();
        }

        return $dictionary;
    }
}
