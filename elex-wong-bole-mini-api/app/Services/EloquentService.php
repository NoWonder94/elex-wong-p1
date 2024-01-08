<?php 
namespace App\Services;

use Exception;

trait EloquentService {
    protected static $models = [];
    protected $model;

    protected $listFormatBuilder;
    protected $listFormatPager;
    protected $listFormatOrder;
    protected $listFormatResult;

    protected $getFormatBuilder;
    protected $getFormatResult;

    protected $savePre;
    protected $saveFind;
    protected $saveFormatData;
    protected $saveExtend;
    protected $saveFormatResult;

    protected $deleteFormatBuilder;
    protected $toggleFormatBuilder;

    /**
     * 格式化数据
     * @param  Array $data 数据
     * @return Array       格式化的数据
     */
    protected static function formatData($data) {
        unset($data['__RETURN_URL__']);
        return $data;
    }

    /**
     * 获取模型
     * @return mixed
     */
    protected function getModel() {
        if ($this->model) {
            return new $this->model;
        }
        
        $key = get_class($this);
        if (isset(self::$models[$key])) {
            return new self::$models[$key];
        }

        $paths      = explode('\\', $key);
        $namespace  = $paths[2];
        $model      = substr(array_pop($paths), 0, -7);

        $class_name = 'App\\Application\\'.$namespace.'\\Models\\'.$model;
        if (class_exists($class_name)) {
            self::$models[$key] = new $class_name();
            return self::$models[$key];
        }

        $class_name = 'App\\Models\\'.$model;
        if (class_exists($class_name)) {
            self::$models[$key] = new $class_name();
            return self::$models[$key];
        }
        $this->throwException('root::common.not_model');
    }

    private function callEloquentClosure($closure, $args) {
        return call_user_func_array($closure, $args);
    }

    public function lists($data = []) {
        $model = $this->getModel();
        //$model->getConnection()->enableQueryLog();
        
        $data           = self::formatData($data);
        $attributes     = [
            'page'      => isset($data['page']) ? max((int)$data['page'], 1) : 1,
            'page_size' => isset($data['page_size']) ? (int)$data['page_size'] : 0,
            'order'     => isset($data['order']) ? $data['order'] : $model->getKeyName(),
            'sort'      => !isset($data['sort']) ? 'desc' : 'asc'
        ];
        unset($data['page'], $data['page_size'], $data['order'], $data['sort']);
        
        $builder = $model->newQuery();
        if ($this->listFormatBuilder) {
            $this->callEloquentClosure($this->listFormatBuilder, [&$builder, &$data, &$attributes]);
        }
        
        if ($attributes['page_size'] > 0) {
            if ($this->listFormatPager) {
                $total_count = $this->callEloquentClosure($this->listFormatPager, [&$builder, &$data, &$attributes]);
            } else {
                $total_count = $builder->count();
            }
            $builder->skip(($attributes['page'] - 1) * $attributes['page_size'])->take($attributes['page_size']);
        }

        if ($this->listFormatOrder) {
            $this->callEloquentClosure($this->listFormatOrder, [&$builder, &$data, &$attributes]);
        } elseif(!empty($attributes['order'])) {
            $builder->orderBy($model->getTable() . '.' . $attributes['order'], $attributes['sort']);
        }

        if ($this->listFormatResult) {
            $list = $this->callEloquentClosure($this->listFormatResult, [&$builder, &$data]);
        } else {
            $list = $builder->get()->toArray();
        }

        $this->listFormatBuilder = null;
        $this->listFormatPager   = null;
        $this->listFormatOrder   = null;
        $this->listFormatResult  = null;

        //var_dump($model->getConnection()->getQueryLog());exit;
        if ($attributes['page_size'] > 0) {
            return ['lists' => $list, 'total_count' => $total_count];
        } else {
            return $list;
        }
    }

    /**
     * 根据编号获取对像
     * @param  integer|string $key 键值
     * @return Model
     */
    public function get($key, $data = []) {
        $model = $this->getModel();
        $builder = $model->newQuery();

        //$model->getConnection()->enableQueryLog();

        if ($this->getFormatBuilder) {
            $result = $this->callEloquentClosure($this->getFormatBuilder, [&$builder, &$key, &$data]);
        } else {
            $result = $builder->find($key)->toArray();
        }

        if ($this->getFormatResult) {
            $this->callEloquentClosure($this->getFormatResult, [&$result, &$builder, &$data]);
        } elseif ($result && is_object($result)) {
            $result = $result->toArray();
        }
        
        $this->getFormatBuilder = null;
        $this->getFormatResult  = null;

        //var_dump($model->getConnection()->getQueryLog());exit;
        return $result;
    }

    public function create($data) {
        return $this->save($data, 'create');
    }

    public function update($data) {
        return $this->save($data, 'update');
    }

    /**
     * 保存
     * @param  array   $data 请求数据
     * @return boolean       处理状态
     */
    public function save($data, $type) {
		global $auth_old_data;
		
        $data   = self::formatData($data);
        $model  = $this->getModel();

        //获取主键
        $primary_key = $model->getKeyName();

        //获取主键值
        $primary_val = isset($data[$primary_key]) ? $data[$primary_key] : '';
        unset($data[$primary_key]);

        $attributes = [
            'id'    => $primary_val,
            'type'  => $type
        ];

        //如果为更新操作
        if ($type == 'update') {
            //没有相关编号时
            if (empty($primary_val)) {
                $this->throwException('99996', $primary_key);
            }

            if ($this->saveFind) {
                $model = $this->callEloquentClosure($this->saveFind, [$model, &$data, &$attributes]);
            } else {
                $model = $model->find($primary_val);
            }
            
            if (!$model) {
                $this->throwException('99996', $primary_key);
            }
        }

        //开启事务
        $model->getConnection()->beginTransaction();
        try{
            //$model->getConnection()->enableQueryLog();
            
            if ($this->savePre) {
                $this->callEloquentClosure($this->savePre, [&$model, &$data, &$attributes]);
            }

            if ($this->saveFormatData) {
                $this->callEloquentClosure($this->saveFormatData, [&$model, &$data, &$attributes]);
            }

            //如果为更新操作
            if ($attributes['type'] == 'update') {
				$auth_old_data = $model->toArray();
				
                $result = $model->safeUpdate($data);
            } else {
                $result = $model->safeCreate($data);
                if (empty($attributes['id'])) {
                    $primary_val = $result->$primary_key;
                } else {
                    $primary_val = $attributes['id'];
                }
            }

            if ($this->saveExtend) {
                $this->callEloquentClosure($this->saveExtend, [$primary_val, &$data, &$attributes]);
            }

            $model->getConnection()->commit();

            if ($this->saveFormatResult) {
                $this->callEloquentClosure($this->saveFormatResult, [$primary_val, &$data, &$attributes, &$result]);
            } elseif($attributes['type'] == 'create') {
                $result = $primary_val;
            }

            $this->updateExtendHandler();
            //var_dump($model->getConnection()->getQueryLog());exit;
            
            return $result;
        }catch(Exception $e){
            $model->getConnection()->rollback();
            throw $e;
        } finally {
            $this->savePre          = null;
            $this->saveFind         = null;
            $this->saveFormatData   = null;
            $this->saveExtend       = null;
            $this->saveFormatResult = null;
        }
    }

    /**
     * 根据键值删除数据
     * @param  integer|string|array $key 键值
     * @return boolean
     */
    public function delete($key, $data = []) {
		global $auth_old_data;
		
        $model = $this->getModel();
        $builder = $model->newQuery();
        
        //获取主键
        $primary_key = $model->getKeyName();

        if ($this->deleteFormatBuilder) {
            $this->callEloquentClosure($this->deleteFormatBuilder, [&$builder, &$key, &$data]);
        } else {
            $builder->where($primary_key, $key);
        }

        $this->deleteFormatBuilder = null;
		
		$auth_old_data = $builder->get()->toArray();
		
        $result = $builder->delete();

        if ($result) {
            $this->updateExtendHandler();
        }

        return $result;
    }

    /**
     * 更新字段
     * @param  array $data 更新状态
     * @return boolean
     */
    public function toggle($data) {
        $attributes = [
            'val'   => (int)$data['val'],
            'id'    => trim($data['id']),
            'field' => trim($data['field'])
        ];

        $model = $this->getModel();
        $builder = $model->newQuery();

        //获取主键
        $primary_key = $model->getKeyName();

        if ($this->toggleFormatBuilder) {
            $this->callEloquentClosure($this->toggleFormatBuilder, [&$builder, &$attributes, $primary_key]);
        } else {
            $builder->where($primary_key, $attributes['id']);
        }

        $this->toggleFormatBuilder = null;

        $result = $builder->safeToggle($attributes['field'], $attributes['val']);

        if ($result) {
            $this->updateExtendHandler();
        }

        return $result;
    }

    protected function updateExtendHandler() {

    }
}
