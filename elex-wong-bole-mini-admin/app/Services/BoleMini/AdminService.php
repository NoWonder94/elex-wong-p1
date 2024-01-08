<?php
	namespace App\Services\BoleMini;
	use App\Models\BoleMini\Admin;
	use App\Core\Entity\Cookie\UserEntity as CookieUserEntity;
	use App\Core\Entity\Session\UserEntity as SessionUserEntity;
	use App\Exceptions\Response\Service\ServiceException;
    use App\Exceptions\Response\Service\ServiceCode;
	use Illuminate\Support\Facades\DB;
	use Illuminate\Support\Facades\Hash;
	use Cache;

	class AdminService {
		public function verifyAdmin(string $name, string $pwd) {
			$admin = new Admin();

			$result = $admin->dbTable()
						->select('id', 'name', 'pwd', 'admin_group_id', 'count_login', 'status')
						->where('name', $name)
						->get()
						->first();

			if (!$result) {
				throw new ServiceException(ServiceCode::ERROR_ADMIN_NO_EXIST);
			}

			//$pwd = 原密码
			//$result['pwd'] = 加密过的原密码
			if (!Hash::check($pwd, $result['pwd'])) {
            	throw new ServiceException(ServiceCode::ERROR_ADMIN_PASSWORD_INCORRECT);
        	}

        	if ($result['status'] != 1) {
				throw new ServiceException(ServiceCode::ERROR_ADMIN_NO_PERMIT);
			}

        	$data = [
        		'date_login' => time(),
        		'ip_login' => $this->getClientIp(),
        		'count_login' => ++$result['count_login']
        	];

        	$admin->update($result['id'], $data);

			return $result;
		}

		public function createData(array $data = []) {
			$data['pwd'] = $this->makePassword($data['pwd']);
			$data['date_create'] = time();
			$data['date_update'] = time();

			try {
            	DB::connection()->beginTransaction();
            	$admin = new Admin();
				$admin->create($data);
				Cache::forget('cache_data_admin');
				DB::connection()->commit();
			} catch(\Exception $e) { 
	            DB::connection()->rollback();
	            throw $e;
	        }

	        return true;
		}

		public function updateData(array $data = []) {
			if (isset($data['pwd']) && !empty($data['pwd'])) {
				$data['pwd'] = $this->makePassword($data['pwd']);
			}
			
			$id = $data['id'];
			$data['date_update'] = time();

			//暂时
			unset($data['admin_group_name']);

			try {
            	DB::connection()->beginTransaction();
            	$admin = new Admin();
				$admin->update($id, $data);
				Cache::forget('cache_data_admin');
				DB::connection()->commit();
			} catch(\Exception $e) { 
	            DB::connection()->rollback();
	            throw $e;
	        }

	        return true;
		}

		public function deleteData(int $id) {
			try {
            	DB::connection()->beginTransaction();
            	$admin = new Admin();
				$admin->delete($id);
				Cache::forget('cache_data_admin');
				DB::connection()->commit();
			} catch(\Exception $e) { 
	            DB::connection()->rollback();
	            throw $e;
	        }

	        return true;
		}

		private function getClientIp()
	    {
	        static $ip = NULL;

	        if ($ip !== NULL) {
	            return $ip;
	        }

	        if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
	            $arr = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
	            $pos = array_search('unknown', $arr);

	            if (false !== $pos) {
	                unset($arr[$pos]);
	            }

	            $ip = trim($arr[0]);
	        } elseif (isset($_SERVER['HTTP_X_REAL_IP'])) {
	            $ip = $_SERVER['HTTP_X_REAL_IP'];
	        }  elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
	            $ip = $_SERVER['HTTP_CLIENT_IP'];
	        } elseif (isset($_SERVER['REMOTE_ADDR'])) {
	            $ip = $_SERVER['REMOTE_ADDR'];
	        }
	        
	        // IP地址合法验证
	        $long = sprintf("%u", ip2long($ip));
	        $ip   = $long ? $ip : '0.0.0.0';

	        return $ip;
	    }

	    public function synSessionData(SessionUserEntity $userEntity, array $user = []) {
	    	$data = $this->makeSessionData($user);
	    	$userEntity->initData($data)->save();

	    	return $this;
	    }

	    private function makeSessionData(array $user = []) {
        	return collect($user)->only('id', 'name', 'admin_group_id')->all();
    	}

    	public function synCookieData(SessionUserEntity $userEntity) {
        	(new CookieUserEntity($userEntity))->save();
        
        	return $this;
    	}

	    private function makePassword($pwd) {
			return Hash::make($pwd);
		}
	}
?>