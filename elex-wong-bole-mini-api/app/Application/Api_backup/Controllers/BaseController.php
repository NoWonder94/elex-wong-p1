<?php
namespace App\Application\Site\Api\Controllers;

use App\Application\Site\BaseController as SiteBaseController;
use App\Services\SiteService;
use App\Application\Site\Api\Services\UserService;
use App\Application\Site\Api\Services\ChatService;
use App\Utils\Encrypter;
use App\Events\RequestErrorEvent;
use Config, Request, Lang, Helper, Event;

abstract class BaseController extends \App\Application\BaseController {
	use SiteBaseController;

	protected $userId = 0;
	protected $user   = null;
	protected $token  = null;
	protected $resetToken  = null;
	/**
	 * 登录状态 0:未登录 1:登录 -1:过期 -2:其他地方登录 -3:禁用或其他错误
	 * @var integer
	 */
	protected $loginStatus  = 0;
    
    public function __construct() {
        parent::__construct();
        $controller = $this;
        Event::listen(RequestErrorEvent::class, function($event) use ($controller) {
            $error  = $event->getError();
            $url    = isset($error['url']) ? $error['url'] : '';
            $field  = isset($error['field']) ? $error['field'] : '';
            $response = $controller->error($error['msg'], $field);
            die($response);
        });

        $this->setSite();
        $this->checkToken();
    }

	/**
	 * 检测请求
	 * @return boolean 检测状态
	 */
	protected function checkToken() {
		$authorization = Request::header("Authorization");
		if (empty($authorization)) {
			$this->error(Lang::get('common.token_error'));
		}

		try {
			$this->token = Helper::decryptData(substr($authorization, 7));
		} catch(\Exception $e){
			$this->error(Lang::get('common.token_error'));
		}
		
		if (!isset($this->token['ip']) || !isset($this->token['uid']) || 
			!isset($this->token['sid']) || !isset($this->token['time'])) {
			$this->error(Lang::get('common.token_error'));
		}

		if (isset($this->token['host']) && !empty($this->token['host'])) {
			define('SITE_HOST', $this->token['host']);
		}

		if (UTC_TIME - $this->token['time'] > TOKEN_EXPIRED_TIME) {
			//$this->error(Lang::get('common.token_expire_error'));
		}

		$this->userId = (int)$this->token['uid'];
		if ($this->userId > 0) {
			$this->loginStatus = 1;
			$this->user = UserService::instance()->get($this->userId);
		}
		return true;
	}

	protected function getToken($user = null) {
		$this->token['rand'] = mt_rand();
		$this->token['ip'] = CLIENT_IP;
		$this->token['time'] = UTC_TIME;

		if ($user) {
			$this->loginStatus = 1;
			$this->token['uid'] = $user->id;
			$encrypter = new Encrypter($user->id . ':' . $user->login_time, $user->pwd);
	        $this->token['data'] = $encrypter->encrypt([
	            'rand' => mt_rand(),
	            'name' => $user->name,
	            'time' => UTC_TIME
	        ]);
		}

        return Helper::encryptData($this->token);
    }

    protected function refreshToken($user = null) {
    	$this->resetToken = $this->getToken($user);
    }

    protected function resetToken($status) {
    	$this->userId = 0;
		$this->user   = null;
		$this->token['uid'] = 0;
		unset($this->token['data']);
		$this->loginStatus = $status;
		$this->refreshToken();
    }

	/**
	 * 输出状态码
	 * @param  int $code 状态码
	 * @return void
	 */
	public function error($msg = '', $data = null) {
		$info = [
			'status' => false,
			'data' 	 => $data,
			'msg'	 => Helper::langFormat($msg)
		];
		$this->output($info);
	}

	/**
	 * 输出数据
	 * @param  array $data 数据
	 * @return void
	 */
	public function success($data = null, $msg = '') {
		$info = [
			'status' => true,
			'data' 	 => $data,
			'msg'	 => Helper::langFormat($msg)
		];
		$this->output($info);
	}

	/**
	 * 输出API数据
	 * @param  array $info 输出信息
	 * @return void
	 */
	protected function output($info) {
		if ($info['data']) {
			if (is_object($info['data']) || is_array($info['data'])) {
				$info['data'] = $this->dataToArray($info['data']);
			}
		}

		$info['loginStatus'] = $this->loginStatus;
		if (!empty($this->resetToken)) {
			$info['token'] = $this->resetToken;
		}
		die(json_encode($info));
	}

	protected function dataToArray($data, $level = 0) {
		if (is_object($data)) {
			$data = $data->toArray();
		}

		if(is_array($data)) {
			$level++;
			foreach ($data as $key => $value) {
				if (is_object($value) || is_array($value) && $level < 6) {
					$data[$key] = $this->dataToArray($value, $level);
				}
			}
		}

		return $data;
	}
}