<?php 
namespace App\Services;

use OSS\OssClient;
use Exception,Lang, Config, Time, Helper;

trait EloquentService {
    protected static $models = [];
    protected $model;

    protected $listFormatBuilder;
    protected $listFormatPager;
    protected $listFormatOrder;
    protected $listFormatResult;
    protected $listFormatStatistic;

    protected $getFormatBuilder;
    protected $getFormatResult;

    protected $saveFormatModel;
    protected $saveFormatData;
    protected $saveExtend;
    protected $saveModelExtend;
    protected $saveFormatResult;

    protected $deleteFormatBuilder;
    protected $deleteExtend;
    
    protected $toggleFormatBuilder;

    protected $exportFormatBuilder;
    protected $exportFormatPager;
    protected $exportFormatResult;
    protected $exportFormatContent;

    protected $checkAuth;

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
        $type       = $paths[2];
        $namespace  = $paths[3];
        $model      = substr(array_pop($paths), 0, -7);

        $class_name = 'App\\Application\\' . $type . '\\' . $namespace . '\\Models\\' . $model;
        if (class_exists($class_name)) {
            self::$models[$key] = new $class_name();
            return self::$models[$key];
        }

        $class_name = 'App\\Models\\' . $type . '\\'.$model;
        if (class_exists($class_name)) {
            self::$models[$key] = new $class_name();
            return self::$models[$key];
        }

        $class_name = 'App\\Models\\'.$model;
        if (class_exists($class_name)) {
            self::$models[$key] = new $class_name();
            return self::$models[$key];
        }
        $this->throwException('common.not_model');
    }

    protected function getQuery() {
        return $this->getModel()->newQuery();
    }

    protected function getSort($val, $default) {
        $val = strtolower($val);
        $allows = ['asc', 'desc'];
        if (in_array($val, $allows)) {
            return $val;
        }
        return $default;
    }

    private function callEloquentClosure($closures, $args) {
        if (!is_array($closures)) {
            $closures = [$closures];
        }

        foreach ($closures as $closure) {
            $result = call_user_func_array($closure, $args);
        }
        return $result;
    }

    public function lists($data = []) {

        $model = $this->getModel();

        //$model->getConnection()->enableQueryLog();
        //\DB::connection('elasticsearch')->enableQueryLog();
        
        $data           = self::formatData($data);
        $attributes     = [
            'statistic' => isset($data['statistic']) ? $data['statistic'] : [],
            'page'      => isset($data['page']) ? max((int)$data['page'], 1) : 1,
            'page_size' => isset($data['page_size']) ? (int)$data['page_size'] : 0,
            'order'     => isset($data['order']) ? $data['order'] : $model->getKeyName(),
            'sort'      => isset($data['sort']) ? $data['sort'] : 'desc'
        ];
        unset($data['page'], $data['page_size'], $data['order'], $data['sort']);
        
        $builder = $model->newQuery();
        if ($this->listFormatBuilder) {
            $this->callEloquentClosure($this->listFormatBuilder, [&$builder, &$data, &$attributes]);
        }

        if (isset($attributes['empty_data'])) {
            if ($attributes['page_size'] > 0) {
                return ['lists' => [], 'total_count' => 0, 'statistic' => []];
            } else {
                return [];
            }
        }

        if (!empty($attributes['statistic']) || $this->listFormatStatistic) {
            $builder_statistic = clone $builder;
        }

        $total_count = 0;
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
            $list = $builder->get();
        }
        
        if ($total_count > 0 && (!empty($attributes['statistic']) || $this->listFormatStatistic)) {
            $builder_statistic = $builder_statistic->setEagerLoads([]);
            if ($this->listFormatStatistic) {
                $this->callEloquentClosure($this->listFormatStatistic, [&$builder_statistic, $data]);
            } else {
                foreach ($attributes['statistic'] as $item) {
                    $builder_statistic->addSelect("sum({$item}) as total_{$item}");
                }
            }
            $statistic = $builder_statistic->first();
        } else {
            $statistic = [];
        }


        $this->listFormatBuilder = null;
        $this->listFormatPager   = null;
        $this->listFormatOrder   = null;
        $this->listFormatResult  = null;
        $this->listFormatStatistic  = null;

        //var_dump($model->getConnection()->getQueryLog());exit;
        //print_r(\DB::connection('elasticsearch')->getQueryLog());exit;
        if ($attributes['page_size'] > 0) {
            $result = ['lists' => $list, 'total_count' => $total_count];
            if ($statistic) {
                $result['statistic'] = $statistic; 
            }
            return $result;
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

        //获取主键
        $primary_key = $model->getKeyName();

        if ($this->getFormatBuilder) {
            $this->callEloquentClosure($this->getFormatBuilder, [&$builder, $key, &$data]);
        }

        $result = $builder->where($primary_key, $key)->first();

        if ($this->getFormatResult) {
            $this->callEloquentClosure($this->getFormatResult, [&$result, &$builder, &$data]);
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

        $extends = [];
        if (isset($data['extends'])) {
            $extends = $data['extends'];
            unset($data['extends']);
        }

        $attributes = [
            'id'      => $primary_val,
            'type'    => $type,
            'extends' => $extends
        ];

        $connection = $model->getConnection();
        //开启事务
        $connection->beginTransaction();
        try{
            //如果为更新操作
            if ($type == 'update') {
                //没有相关编号时
                if (empty($primary_val)) {
                    $this->throwException('common.not_data');
                }

                if ($this->saveFormatModel) {
                    $this->callEloquentClosure($this->saveFormatModel, [&$model, &$data, &$attributes]);
                }

                $model = $model->where($primary_key, $primary_val)->first();
				
                if (!$model) {
                    $this->throwException('common.not_data');
                }
            }

            //$connection->enableQueryLog();
            if ($this->saveFormatData) {
                $this->callEloquentClosure($this->saveFormatData, [&$model, &$data, &$attributes]);
            }

            if ($model->isUpdateTime) {
                $data['update_time'] = UTC_TIME;
            }

            if ($model->isSetAdmin && defined('APP_CURRENT_ADMIN_ID')) {
                $data['admin_id'] = APP_CURRENT_ADMIN_ID;
                $data['admin_name'] = APP_CURRENT_ADMIN_NAME;
            }

            //如果为更新操作
            if ($attributes['type'] == 'update') {
				$auth_old_data = $model->toArray();
				
                $result = $model->safeUpdate($data);
            } else {
                if ($model->isCreateTime) {
                    $data['create_time'] = UTC_TIME;
                }
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

            if ($this->saveModelExtend) {
                $model = $model->find($primary_val);
                $this->callEloquentClosure($this->saveModelExtend, [$model, &$data, &$attributes]);
            }

            if ($this->saveFormatResult) {
                $this->callEloquentClosure($this->saveFormatResult, [$primary_val, &$data, &$attributes, &$result]);
            } elseif($attributes['type'] == 'create') {
                $result = $primary_val;
            }

            $this->updateExtendHandler();
            //var_dump($connection->getQueryLog());exit;
            //
            $connection->commit();
            
            return $result;
        }catch(Exception $e){
            $connection->rollback();
            throw $e;
        } finally {
            $this->saveFormatModel  = null;
            $this->saveFormatData   = null;
            $this->saveExtend       = null;
            $this->saveModelExtend  = null;
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
        }

        $builder->where($primary_key, $key);

        $connection = $model->getConnection();
        //开启事务
        $connection->beginTransaction();
        try{
		    $model = $builder->first();
            if ($model) {
                $auth_old_data = $model->toArray();
                $result = $builder->delete();
                if ($result) {
                    if ($this->deleteExtend) {
                        $this->callEloquentClosure($this->deleteExtend, [&$model, &$key, &$data]);
                    }
                    $this->updateExtendHandler();
                }
            } else {
                $result = true;
            }
            
            $connection->commit();
            return $result;
        }catch(Exception $e){
            $connection->rollback();
            throw $e;
        } finally {
            $this->deleteFormatBuilder = null;
            $this->deleteExtend        = null;
        }
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
        }

        $builder->where($primary_key, $attributes['id']);

        $this->toggleFormatBuilder = null;

        $result = $builder->safeToggle($attributes['field'], $attributes['val']);

        if ($result) {
            $this->updateExtendHandler();
        }

        return $result;
    }

    public function export($data = [], $file = '', $offset = 0, $limit = 1000) {
        $model = $this->getModel();

        //$model->getConnection()->enableQueryLog();
        //\DB::connection('elasticsearch')->enableQueryLog();

        $data = self::formatData($data);

        $builder = $model->newQuery();
        if ($this->exportFormatBuilder) {
            $this->callEloquentClosure($this->exportFormatBuilder, [&$builder, &$data]);
        }

        if (isset($attributes['empty_data'])) {
            return [];
        }

        if ($this->exportFormatPager) {
            $total_count = $this->callEloquentClosure($this->exportFormatPager, [&$builder, &$data]);
        } else {
            $total_count = $builder->count();
        }

        $result = [
            'total_count' => $total_count,
            'offset' => $offset + $limit
        ];

        if ($this->exportFormatResult) {
            $list = $this->callEloquentClosure($this->exportFormatResult, [&$builder, &$result, $limit]);
        } else {
            $list = $builder->offset($offset)->limit($limit)->get();
        }

        $is_complete = false;
        if ($offset + $limit >= $total_count) {
            $is_complete = true;
        }

        $config = Config::get('filesystems.disks.s3');
        $client = new OssClient($config['key'], $config['secret'], $config['endpoint']);

        $content = $this->callEloquentClosure($this->exportFormatContent, [$list, $offset]);

        if ($offset == 0) {
            $file = 'resources/export/' . Time::toDate(UTC_TIME, 'Y-m-d') . '/' . Helper::getSn() . '.csv';
            $client->appendObject($config['bucket'], $file, $content, 0);
        } else {
            $file = Helper::decryptData($file);
            $meta = $client->getObjectMeta($config['bucket'], $file);
            $position = $meta['x-oss-next-append-position'];
            $client->appendObject($config['bucket'], $file, $content, $position);
        }

        $this->exportFormatBuilder = null;
        $this->exportFormatPager   = null;
        $this->exportFormatResult  = null;
        $this->exportFormatContent = null;

        $result['is_complete'] = $is_complete;
        if ($is_complete) {
            $result['file'] = $config['url'] . '/' . $file;
        } else {
            $result['file'] = Helper::encryptData($file);
        }

        return $result;
    }

    protected function safeExtend($type, &$builder, &$data) {

    }

    protected function updateExtendHandler() {

    }
}
