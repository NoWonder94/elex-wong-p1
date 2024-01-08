<?php 
namespace App\Models;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Query\Expression;
use Illuminate\Support\Str;
use App\Traits\ThrowException;
use DB, Exception, Lang, Config, SystemCache;

trait Base {
    use ThrowException;

    protected $relattrs = [];
    protected $toggles = [];
    protected $defaultValues = [];
    protected $tablePrefix  = '';
    protected $allowSaveFields  = [];
    protected $isQueryDisableExtend = false;

    public function getPrefix() {
        return isset($this->prefix) ? $this->prefix : '';
    }  

	public function __construct(array $attributes = []) {
        $attributes = array_merge($this->defaultValues, $attributes);
        
        parent::__construct($attributes);
        $this->toggles[] = 'status';
    }

    public function newCollection(array $models = []) {
        return new Collection($models);
    }

    public function getIsQueryDisableExtend() {
        return $this->isQueryDisableExtend;
    }

    public function disableQueryExtend() {
        $this->isQueryDisableExtend = true;
        return $this;
    }

    public function enableQueryExtend() {
        $this->isQueryDisableExtend = false;
        return $this;
    }

    public function setRelAttribute($key, &$value) {
        $this->relattrs[] = $key;
        $this->attributes[$key] = &$value;
        return $this;
    }

    public function getAttributes() {
        return $this->attributes;
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

    protected function aesEncrypt($val, $key = '') {
        if ($val instanceof Expression) {
            return $val;
        }
        
        if ($key) {
            $aes_key = substr(DB_AES_KEY, 0, strlen(DB_AES_KEY) - strlen($key)) . $key;
        } else { 
            $aes_key = DB_AES_KEY;
        }
        return new Expression("TO_BASE64(AES_ENCRYPT('{$val}', '" . $aes_key . "', '" . DB_AES_IV . "'))");
    }
    
    protected function aesDecrypt($val, $key = '') {
        if ($key) {
            $aes_key = substr(DB_AES_KEY, 0, strlen(DB_AES_KEY) - strlen($key)) . $key;
        } else {
            $aes_key = DB_AES_KEY;
        } 
        $val = openssl_decrypt(base64_decode($val), 'AES-256-CBC', $aes_key, OPENSSL_RAW_DATA, DB_AES_IV);
        if ($val === false) {
            throw new Exception('Could not decrypt the db data.');
        }
        return $val;
    }

    protected function getFieldsByTable($table) {
        $tableName = $table;
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
        }
        return parent::__call($method, $parameters);
    }
}
