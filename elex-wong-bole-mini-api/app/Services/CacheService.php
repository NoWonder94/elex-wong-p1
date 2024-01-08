<?php 
namespace App\Services;

use Event;

trait CacheService {
    protected static $resetCacheStatus = [];

    protected static function checkCacheStatus($class) {
        return isset(self::$resetCacheStatus[get_class($class)]);
    }

    protected static function setCacheStatus($class) {
        self::$resetCacheStatus[get_class($class)] = true;
    }

    protected function resetCache() {
        if ($this->setCache()) {
            $paths      = explode('\\', get_class($this));
            $event      = substr(array_pop($paths), 0, -7).'ResetCacheEvent';
            $namespace  = array_pop($paths);
            $class_name = 'App\\Events\\'.$namespace.'\\'.$event;
            if (class_exists($class_name)) {
                Event::fire(new $class_name());
                return;
            }

            $class_name = 'App\\Events\\'.$event;
            if (class_exists($class_name)) {
                Event::fire(new $class_name());
                return;
            }
        }
    }

    protected function setCache() {
        return true;
    }

    public function save($data, $type) {
        $status = parent::save($data, $type);
        if ($status) {
            $this->resetCache();
        }
        return $status;
    }

    public function delete($key, $data = []) {
        $status = parent::delete($key, $data);
        if ($status) {
            $this->resetCache();
        }
        return $status;
    }

    public function toggle($data) {
        $status = parent::toggle($data);
        if ($status) {
            $this->resetCache();
        }
        return $status;
    }
}
