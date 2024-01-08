<?php 
namespace App\Application;

use App\Requests\FormRequest;
use App\Utils\Page;
use Request, View, AppException, Lang;

trait EloquentController {
	private $_request = null;
	private static $services = [];

	/**
     * 根据类名称获取对应服务
     * @return string 服务类名
     */
    protected function getService() {
    	$key = get_class($this);
    	if (isset(self::$services[$key])) {
    		return self::$services[$key];
    	}

    	$paths	 = explode('\\', $key);
        $namespace  = $paths[2];
    	$service = substr(array_pop($paths), 0, -10).'Service';
        $class_name = 'App\\Application\\'.$namespace.'\\Services\\'.$service;
        if (class_exists($class_name)) {
            self::$services[$key] = new $class_name();
            return self::$services[$key];
        }

        $class_name = 'App\\Services\\'.$service;
        if (class_exists($class_name)) {
            self::$services[$key] = new $class_name();
            return self::$services[$key];
        }
        $this->throwException('root::common.not_service');
    }

    /**
     * 根据类名称获取对应验证
     * @return string 服务类名
     */
    protected function getValidatorRequest() {
        $paths      = explode('\\', get_class($this));
        $namespace  = $paths[2];
        $request	=substr($paths[4], 0, -10).'Request';

        $class_name = 'App\\Application\\'.$namespace.'\\Requests\\'.$request;
        if (class_exists($class_name)) {
            return new $class_name();
        }

        $class_name = 'App\\Requests\\'.$request;
        if (class_exists($class_name)) {
            return new $class_name();
        }
        return false;
    }

    public function _validatorRequest($action) {
    	$validatorRequest = $this->getValidatorRequest();
    	if ($validatorRequest) {
    		$request = Request::instance();

    		$files = $request->files->all();
        	$files = is_array($files) ? array_filter($files) : $files;

    		$validatorRequest->initialize(
    				 $request->query->all(), $request->request->all(), $request->attributes->all(),
    				 $request->cookies->all(), $files, $request->server->all(), $request->getContent()
    			);
    		if ($validatorRequest->validator($action)) {
    			$this->_request = $validatorRequest;
    		}
    	}
    }

    protected function getRequest() {
    	if ($this->_request === null) {
    		$this->_request = new FormRequest;

    		$request = Request::instance();
    		$files = $request->files->all();
        	$files = is_array($files) ? array_filter($files) : $files;
        	$this->_request->initialize(
    				 $request->query->all(), $request->request->all(), $request->attributes->all(),
    				 $request->cookies->all(), $files, $request->server->all(), $request->getContent()
    			);
    	}
    	return $this->_request;
    }

    protected function requestAll() {
    	return $this->getRequest()->all();
    }

    protected function requestGet($name) {
    	return $this->getRequest()->get($name);
    }

    protected function replaceRequest($data) {
    	$this->getRequest()->replace($data);
    }

	/**
	 * 列表
	 * @return void
	 */
	protected function eloquentLists($service = null, $method = 'lists') {
		$data = $this->getRequest()->formatAll();
		if (isset($data['page_size'])) {
        	$data['page_size']  = $data['page_size'];
		} elseif(isset($this->pageSize)) {
			$data['page_size'] = $this->pageSize;
		} else {
			$data['page_size'] = 0;
		}
        if (!$service) {
            $service = $this->getService();
        }
		$result = $service->$method($data);

		if (isset($result['lists'])) {
			$this->share('list', $result['lists']);
			//检测是否有分页
			if (isset($result['total_count'])) {
				$page_args = Request::all();
				$page_args['ca'] = APP_CONTROLLER_NAME . '/' . APP_ACTION_NAME;
				$pager = new Page($result['total_count'], $page_args, $data['page_size']);
				$this->share('pager', $pager->nums());
			}
		} else {
			$this->share('list', $result);
		}
		return $result;
	}

	/**
	 * 添加
	 * @return boolean
	 */
	protected function eloquentCreate() {
		$result = $this->getService()->create($this->getRequest()->formatAll());
		if ($result) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 获取
	 * @return void
	 */
	protected function eloquentGet() {
        $request = $this->getRequest();
		$data    = $this->getService()->get($request->get('id'), $request->formatAll());
		if ($data) {
			return $data;
		} else {
			return false;
		}
	}

	/**
	 * 修改
	 * @param  FanwemdRequest $request 请求
	 * @return void
	 */
	protected function eloquentUpdate() {
		$result = $this->getService()->update($this->getRequest()->formatAll());
		if ($result) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 删除
	 * @param  FanwemdRequest $request 请求
	 * @return void
	 */
	protected function eloquentDelete() {
        $request = $this->getRequest();
        $result = $this->getService()->delete($request->get('id'), $request->formatAll());
		if ($result) {
			return true;
		} else {
			return false;
		}
    }

    /**
	 * 切换状态
	 * @param  FanwemdRequest $request 请求
	 * @return void
	 */
	protected function eloquentToggle() {
        $result = $this->getService()->toggle($this->getRequest()->formatAll());
		if ($result) {
			return true;
		} else {
			return false;
		}
    }

    public function __call($method, $parameters) {
        if (strpos($method, 'eloquent') === 0 && strlen($method) > 8) {
            $service = $this->getService();
            $method  = lcfirst(substr($method, 8));
            $parameter  = $service->getParameter($method);
            $result     = $service->$method($parameter);
            if (isset($parameters[0]) && $parameters[0]) {
                return $result;
            }
            $this->outputData($result);
        }
    }
}