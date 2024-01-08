<?php 
namespace App\Application\Proxy\Services;

use App\Services\EloquentService as BaseEloquentService;

abstract class EloquentService extends BaseService {
	use BaseEloquentService;

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

        $class_name = 'App\\Models\\Site\\'.$model;
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
}