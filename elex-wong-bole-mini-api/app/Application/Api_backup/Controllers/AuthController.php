<?php
namespace App\Application\Site\Api\Controllers;

use App\Utils\Encrypter;
use Request, SiteCache, Helper, Lang;

abstract class AuthController extends BaseController {
	/**
	 * 检测请求
	 * @return boolean 检测状态
	 */
	protected function checkToken() {
		parent::checkToken();
		
		if ($this->userId < 1) {
			$this->resetToken(0);
			$this->error(Lang::get('common.user_token_error'));
		}

		if (!$this->user) {
			$this->resetToken(0);
			$this->error(Lang::get('common.user_token_error'));
		}

		if ($this->user->status != 1) {
			$this->resetToken(-3);
			$this->error(Lang::get('common.user_status_error'));
		}

		$encrypter = new Encrypter($this->user->id . ':' . $this->user->login_time, $this->user->pwd);
		try {
			$data = $encrypter->decrypt($this->token['data']);
		} catch(\Exception $e){
			$this->resetToken(-2);
			$this->error(Lang::get('common.user_token_error'));
		}
		
		if (!isset($data['rand']) || !isset($data['name']) || !isset($data['time'])) {
			$this->resetToken(-2);
			$this->error(Lang::get('common.user_token_error'));
		}
		return true;
	}
}