<?php 
namespace App\Services;

use App\ThrowException;

abstract class BaseService {
    use ThrowException;

    protected static $instances = [];
    protected $isInitialize  = false;
    protected $version = 1.0;
    protected $model = null;

    public static function instance() {
        $class = get_called_class();
        if (isset(self::$instances[$class])) {
            return self::$instances[$class];
        }
        return new static;
    }

    public function __construct() {
        self::$instances[get_class()] = $this;

        if (!$this->isInitialize) {
            $this->initialize();
        }
    }

    protected function initialize($data = []) {
        $this->isInitialize  = true;
    }

    /**
     * 获/取对应模型
     * @return Model 模型对像
     */
    protected function getModel() {
        if ($this->model) {
            return new $this->model();
        }

        $paths      = explode('\\', get_class($this));
        $model      = substr(array_pop($paths), 0, -7);

        if (count($paths) > 2) {
            array_pop($paths);
            $paths      = implode('\\', $paths);

            $this->model = $class_name = $paths.'\\Models\\'.$model;
            if (class_exists($class_name)) {
                return new $class_name();
            }
        }
        
        $this->model = $class_name = 'App\\Models\\' . $model;
        if (class_exists($class_name)) {
            return new $class_name();
        }

        $this->throwException(99999, '','NOT MODEL');
    }

    /**
     * 根据编号获取模型对像
     * @param  integer|string $id 编号
     * @return Model
     */
    public function getById($id) {
        return $this->getModel()->find($id);
    }
}
