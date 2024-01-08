<?php 
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Builders\SafeBuilder;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use DB, SystemCache, Exception, Lang;

class Base extends Model {
    protected $relattrs = [];
	protected $guarded = [];
    protected $toggles = [];
	public $timestamps = false;

	public function __construct(array $attributes = []) {
        parent::__construct($attributes);
        //$this->guarded[] = 'id';
        $this->toggles[] = 'status';
    }
	
	public function getTable(){
		if ($this && $this instanceof Base) {
			if (!$this->table) {
				$this->table = strtolower(snake_case(class_basename($this)));
			}
            return $this->table;
        } else {
        	throw new Exception(Lang::get('common.db_not_table_name'));
        }
	}

    public function newEloquentBuilder($query) {
        return new SafeBuilder($query);
    }

    public function newCollection(array $models = []) {
        return new Collection($models);
    }

    public function setRelAttribute($key, &$value) {
        $this->relattrs[] = $key;
        $this->attributes[$key] = &$value;
        return $this;
    }

    public function attributesToArray() {
        $attributes = parent::attributesToArray();
        foreach ($this->relattrs as $key) {
            if (!isset($attributes[$key])) {
                continue;
            }

            if ($attributes[$key] instanceof Arrayable) {
                $attributes[$key] = $attributes[$key]->toArray();
            }
        }
        return $attributes;
    }

    public function removeVisible($attributes = null) {
        $attributes = is_array($attributes) ? $attributes : func_get_args();
        $this->visible = array_diff($this->visible, $attributes);
        return $this;
    }

    public function belongsToByModel($model, $foreignKey = null, $otherKey = null, $relation = null) {
        if (is_null($relation)) {
            list($current, $caller) = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 2);
            $relation = $caller['function'];
        }
        if (is_null($foreignKey)) {
            $foreignKey = Str::snake($relation).'_id';
        }
        $query = $model->newQuery();
        $otherKey = $otherKey ?: $model->getKeyName();
        return new BelongsTo($query, $this, $foreignKey, $otherKey, $relation);
    }

	public static function safeCreate(array $attributes = []) {
		$model = new static();
		$attributes = $model->filterAttributes($attributes);
        if (count($attributes) == 0) {
            return false;
        }
		$model->fill($attributes);
        $model->save();
        return $model;
    }

    public function safeUpdate(array $attributes = [], array $options = []) {
        $attributes = $this->filterAttributes($attributes);
        if (count($attributes) == 0) {
            return false;
        }
        return $this->update($attributes, $options);
    }

    public function safeToggle($filed, $val) {
        if (!$this->checkToggleAttributes($filed)) {
            return false;
        }
        return $this->update([$filed => $val]);
    }

    public function checkToggleAttributes($filed) {
        $fields = $this->getFields();
        if (!isset($fields[$filed])) {
            return false;
        }

        if (in_array($filed, $this->guarded)) {
            return false;
        }

        if (!in_array($filed, $this->toggles)) {
            return false;
        }
        return true;
    }

    public function filterAttributes($attributes) {
    	if (count($attributes) > 0) {
			$fields = $this->getFields();
			$attributes = array_intersect_key($attributes, $fields);
			foreach ($this->guarded as $guard) {
				unset($attributes[$guard]);
			}
		}
		return $attributes;
    }

    protected function getFieldsByTable($table) {
		$tableName = $this->getConnection()->getTablePrefix() . $table;
        $fields = SystemCache::get('fields_' . $tableName);
        if (!$fields) {
            $fields = [];
            $result = $this->getConnection()->select('SHOW COLUMNS FROM ' . $tableName);
            if($result) {
                foreach ($result as $item) {
                	if ($item->Key == 'PRI') {
                		$fields['key'] = $table . '.' . $item->Field;
                	}
                    $fields['list'][$item->Field] = $table . '.' . $item->Field;
                    $fields['str'][] = $tableName . '.' . $item->Field;
                }
                $fields['str'] = implode(',', $fields['str']);
            }
            SystemCache::forever('fields_' . $tableName, $fields);
        }
        return $fields;
	}

	public function __call($method, $parameters) {
		if ($method == 'getFields') {
        	$fields = $this->getFieldsByTable($this->getTable());
        	return $fields['list'];
        } elseif ($method == 'getFieldStrs') {
        	$fields = $this->getFieldsByTable($this->getTable());
        	return $fields['str'];
        }
        return parent::__call($method, $parameters);
    }
}
