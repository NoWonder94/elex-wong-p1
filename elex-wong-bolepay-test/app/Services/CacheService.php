<?php 
namespace App\Services;

use Event, SystemCache, AgentCache;

trait CacheService {
    protected static $resetCacheStatus = [];

    protected static function checkCacheStatus($class) {
        return isset(self::$resetCacheStatus[get_class($class)]);
    }

    protected static function setCacheStatus($class) {
        self::$resetCacheStatus[get_class($class)] = true;
    }

    public function getCacheByCode($code) {
        switch ($this->catchType) {
            case 'system':
                return $this->getSystemCacheByCode($code);
                break;

            case 'agent':
                return $this->getAgentCacheByCode($code);
                break;

            default:
                return null;
                break;
        }
    }

    protected function getSystemCacheByCode($code) {
        $data = SystemCache::get($code);
        if (!$data) {
            $this->setCache();
            return SystemCache::get($code);
        }
        return $data;
    }

    protected function getAgentCacheByCode($code) {
        $data = AgentCache::get($code);
        if (!$data) {
            $this->setCache();
            return AgentCache::get($code);
        }
        return $data;
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

    /**
     * 根据缓存数据进行分页
     */
    protected function getListsByPage($list, $page, $page_size, $total_count) {
        $result = ['lists' => [], 'total_count' => $total_count];
        if ($total_count > 0) {
            $total_page = ceil($total_count/$page_size);
            if ($page <= $total_page && $page >= 1) {
                $result['lists'] = array_slice($list, ($page - 1) * $page_size, $page_size); 
            }
        }
        return $result;
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
