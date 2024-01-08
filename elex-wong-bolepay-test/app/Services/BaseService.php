<?php 
namespace App\Services;

use App\Traits\ThrowException;
use Validator, Rule;

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
            if (count($paths) <= 3) {
                $paths[1] = 'Models';
                $paths = implode('\\', $paths);
            } else {
                array_pop($paths);
                $paths = implode('\\', $paths) . '\Models';
            }
            $this->model = $class_name = $paths.'\\'.$model;
            if (class_exists($class_name)) {
                return new $class_name();
            }
        }
        
        $this->model = $class_name = 'App\\Models\\' . APP_HOST_TYPE . '\\' . $model;
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

    protected function formatIps(&$data, $num = 50) {
        $rules = ['ip' => ['ip']];

        $admin_ips = [];
        if (isset($data['admin_ips'])) {
            $ips = explode(',', str_replace('，', ',', trim($data['admin_ips'])));
            foreach ($ips as $ip) {
                $ip = trim($ip);
                if (empty($ips)) {
                    continue;
                }
                $validator = Validator::make(['ip' => $ip], $rules);
                if ($validator->fails()) {
                    $this->throwException(['admin.ip_error', $ip], 'admin_ips');
                }

                if (array_search($ip, $admin_ips) === false) {
                    $admin_ips[] = $ip;
                }

                if ($num > 0 && count($admin_ips) >= $num) {
                    break;
                }
            }
        }

        $api_ips = [];
        if (isset($data['api_ips'])) {
            $ips = explode(',', str_replace('，', ',', trim($data['api_ips'])));
            foreach ($ips as $ip) {
                $ip = trim($ip);
                if (empty($ips)) {
                    continue;
                }
                $validator = Validator::make(['ip' => $ip], $rules);
                if ($validator->fails()) {
                    $this->throwException(['admin.ip_error', $ip], 'api_ips');
                }

                if (array_search($ip, $api_ips) === false) {
                    $api_ips[] = $ip;
                }

                if ($num > 0 && count($api_ips) >= $num) {
                    break;
                }
            }
        }

        if (isset($data['bad_client_ips'])) {
            $bad_client_ips = [];
            $ips = explode(',', str_replace('，', ',', trim($data['bad_client_ips'])));
            foreach ($ips as $ip) {
                $ip = trim($ip);
                if (empty($ips)) {
                    continue;
                }
                $validator = Validator::make(['ip' => $ip], $rules);
                if ($validator->fails()) {
                    $this->throwException(['admin.ip_error', $ip], 'bad_client_ips');
                }

                if (array_search($ip, $api_ips) === false) {
                    $bad_client_ips[] = $ip;
                }
            }
            $data['bad_client_ips'] = count($bad_client_ips) > 0 ? implode(',', $bad_client_ips) : '';
        }

        $data['admin_ips'] = count($admin_ips) > 0 ? implode(',', $admin_ips) : '';
        $data['api_ips'] = count($api_ips) > 0 ? implode(',', $api_ips) : '';
    }
}
