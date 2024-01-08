<?php 
namespace App\Models;

use Illuminate\Contracts\Support\Arrayable;
class Collection extends \Illuminate\Database\Eloquent\Collection {
    protected $hidden = [];

    public function setHidden($keys) {
        $this->hidden = $keys;
        return $this;
    }

    public function toArray() {
        $hidden = $this->hidden;
        return array_map(function ($value) use($hidden) {
            if (count($hidden) > 0) {
                $value->addHidden($hidden);
            }
            return $value instanceof Arrayable ? $value->toArray() : $value;
        }, $this->items);
    }

	public function getDictionaryArray($items = null) {
        $items = is_null($items) ? $this->items : $items;

        $dictionary = [];

        foreach ($items as $value) {
            $dictionary[$value->getKey()] = $value->toArray();
        }

        return $dictionary;
    }

    public function getKeyList($key) {
        $dictionary = [];
        foreach ($this->items as $value) {
            $dictionary[$value->$key] = $value;
        }
        return $dictionary;
    }

    public function formatByBelongs($model, $keys, \Closure $formatData = null, \Closure $formatBuilder = null) {
    	$related_keys = [];
    	$related_vals = [];
    	foreach ($this->items as $index => $item) {
            $val = [];
            foreach ($keys as $foreign => $other) {
            	if (is_numeric($foreign)) {
            		$foreign = $other;
            	}
            	$val[] = $item->getAttribute($foreign);
            	$related_keys[$other][] = $item->getAttribute($foreign);
            }
            $val = implode('_', $val);
            $related_vals[$val][] = &$this->items[$index];
        }

        $model = new $model;
        $builder = $model->newQuery();

        foreach ($related_keys as $field => $vals) {
        	$builder->whereIn($model->getTable() . '.' . $field, array_unique($vals));
        }

        if ($formatBuilder) {
        	call_user_func_array($formatBuilder, [&$builder]);
        }

        $list = $builder->get();

        foreach ($list as $item) {
        	$val = [];
            foreach ($keys as $other) {
            	$val[] = $item->getAttribute($other);
            }
            $val = implode('_', $val);

            call_user_func_array($formatData, [&$related_vals[$val], $item]);

            unset($related_vals[$val]);
        }

        foreach($related_vals as $key => $val) {
            call_user_func_array($formatData, [&$related_vals[$key], null]);
        }
        return $this;
    }

    public function morphBelongs($model, $name, $keys, \Closure $formatBuilder = null) {
        $related_keys = [];
        $related_vals = [];
        foreach ($this->items as $index => $item) {
            $val = [];
            foreach ($keys as $foreign => $other) {
                if (is_numeric($foreign)) {
                    $foreign = $other;
                }
                $val[] = $item->getAttribute($foreign);
                $related_keys[$other][] = $item->getAttribute($foreign);
            }
            $val = implode('_', $val);
            $related_vals[$val] = null;
            $this->items[$index]->setRelAttribute($name, $related_vals[$val]);
        }

        $model = new $model;
        $builder = $model->newQuery();

        foreach ($related_keys as $field => $vals) {
            $builder->whereIn($field, array_unique($vals));
        }

        if ($formatBuilder) {
            call_user_func_array($formatBuilder, [&$builder]);
        }

        $list = $builder->get();

        foreach ($list as $item) {
            $val = [];
            foreach ($keys as $other) {
                $val[] = $item->getAttribute($other);
            }
            $val = implode('_', $val);
            $related_vals[$val] = $item;
        }
        return $this;
    }
}
