<?php
	namespace App\Application\Api\Controllers;
	use App\Application\Api\Services\MemberService;
	use Request, Helper, Lang, Encrypter;

	abstract class BaseController extends \App\Application\BaseController {
    	protected $token  = null;
    	protected $user = null;
    	protected $userId = 0;
    	protected $userLoginStatus  = 0;
    	protected $userToken = null;

    	protected function refreshToken($user = null) {
    		$this->userToken = $this->setToken($user);
    	}

    	protected function setToken($user = null) {
			$this->token['rand'] = mt_rand();
			$this->token['ip'] = CLIENT_IP;
			$this->token['time'] = UTC_TIME;

			if ($user) {
				$this->token['uid'] = $user->id;
				//$encrypter = new Encrypter($user->id . ':' . $user->getUnformattedData('date_login'), $user->customer_pwd);
				$encrypter = new Encrypter($user->id . ':' . $user->date_login, $user->customer_pwd);
		        $this->token['data'] = $encrypter->encrypt([
		            'rand' => mt_rand(),
		            'name' => $user->customer_name,
		            'time' => UTC_TIME
		        ]);

		        $this->userLoginStatus = 1;
			}

	        return Helper::encryptData($this->token);
    	}

	    public function __construct() {
	    	parent::__construct();
	    	//$this->checkToken();
		}

		public function checkToken() {
    		$authorization = Request::header("Authorization");
    		if (empty($authorization)) {
				$this->error(Lang::get('common.error_token'));
			}

			//$data = Helper::decryptData(substr($authorization, 7));

			try {
				$this->token = Helper::decryptData(substr($authorization, 7));
			} catch(\Exception $e){
				$this->error(Lang::get('common.error_token'));
			}

			if (!isset($this->token['ip']) || !isset($this->token['uid']) || !isset($this->token['sid']) || !isset($this->token['time'])) {
				$this->error(Lang::get('common.error_token'));
			}

			/*
			if (UTC_TIME - $this->token['time'] > TOKEN_EXPIRED_TIME) {
				$this->error(Lang::get('common.token_expire_error'));
			}
			*/

			$this->userId = (int)$this->token['uid'];
			if ($this->userId > 0) {
				$this->user = MemberService::instance()->getInfo($this->userId);
				$this->userLoginStatus = 1;
			}

			//define('APP_CURRENT_USER_ID', $this->userId);

			return true;
    	}

		public function success($data = null, $msg = '') {
			$info = [
				'status' => true,
				'data' 	 => $data,
				'msg'	 => $msg
			];
			$this->output($info);
		}

		public function error($msg = '', $data = null) {
			$info = [
				'status' => false,
				'data' 	 => $data,
				'msg'	 => $msg
			];
			$this->output($info);
		}

		protected function output($info) {
			if ($info['data']) {
				if (is_object($info['data']) || is_array($info['data'])) {
					$info['data'] = $this->dataToArray($info['data']);
				}
			}

			$info['loginStatus'] = $this->userLoginStatus;
			if (!empty($this->userToken)) {
				$info['token'] = $this->userToken;
			}

			die(json_encode($info));
		}

		protected function dataToArray($data, $level = 0) {
			if (is_object($data)) {
				$data = $data->toArray();
			}

			if (is_array($data)) {
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
?>