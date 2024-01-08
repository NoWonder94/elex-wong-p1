<?php 
namespace App\Application;

use Symfony\Component\Finder\Finder;
use App\Requests\FormRequest;
use App\Utils\Page;
use App\Utils\Helper;
use Request, View, AppException, Lang, File, Time, Response;

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

    	$paths  = explode('\\', $key);
        $namespace  = $paths[3];
        $service = substr(array_pop($paths), 0, -10).'Service';
        $class_name = 'App\\Application\\'.APP_HOST_TYPE.'\\'.$namespace.'\\Services\\'.$service;
        if (class_exists($class_name)) {
            self::$services[$key] = new $class_name();
            return self::$services[$key];
        }

        $class_name = 'App\\Services\\' . APP_HOST_TYPE . '\\' . $service;
        if (class_exists($class_name)) {
            self::$services[$key] = new $class_name();
            return self::$services[$key];
        }
        $this->throwException('common.not_service');
    }

	/**
	 * 列表
	 * @return void
	 */
	protected function eloquentLists($data = []) {
		$request = Request::all();
		if (isset($request['page_size'])) {
            $request['page_size']  = $request['page_size'];
		} elseif(isset($this->pageSize)) {
            $request['page_size'] = $this->pageSize;
		} else {
            $request['page_size'] = 0;
		}

		$result = $this->getService()->lists(array_merge($request, $data));
        
		if (isset($result['lists'])) {
			$this->share('list', $result['lists']);
			//检测是否有分页
			if (isset($result['total_count'])) {
				$page_args = Request::all();
				$page_args['ca'] = APP_CONTROLLER_NAME . '/' . APP_ACTION_NAME;
				$pager = new Page($result['total_count'], $page_args, $request['page_size']);
				$this->share('pager', $pager->nums());
			}

            if (isset($result['statistic'])) {
                $this->share('statistic', $result['statistic']);
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
	protected function eloquentCreate($data = []) {
		$result = $this->getService()->create(array_merge(Request::all(), $data));
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
		$data = $this->getService()->get(Request::get('id'), Request::all());
		if ($data) {
			return $data;
		} else {
			return false;
		}
	}

    /**
     * 获取详情
     * @return void
     */
    protected function eloquentGetDetail() {
        return $this->getService()->detail(Request::all());
    }

	/**
	 * 修改
	 * @param  FanwemdRequest $request 请求
	 * @return void
	 */
	protected function eloquentUpdate($data = []) {
		$result = $this->getService()->update(array_merge(Request::all(), $data));
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
        $result = $this->getService()->delete(Request::get('id'), Request::all());
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
        $result = $this->getService()->toggle(Request::all());
		if ($result) {
			return true;
		} else {
			return false;
		}
    }

    protected function eloquentExport($data = []) {
	    $search = Request::all();
	    $file   = Request::get('file');
        $offset = Request::get('offset');
        unset($search['file'], $search['offset']);
	    return $this->getService()->export(array_merge($search, $data), $file,  $offset);
    }
}