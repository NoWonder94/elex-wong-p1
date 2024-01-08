<?php 
namespace App\Application\Www\Services;

use App\Models\Site\User;
use App\Models\Site\Proxy;
use Time, DB;

class UserService extends EloquentService {
	protected $type = 0;
	
	public function get($key, $data = []) {
		$type = $this->type;
        $this->getFormatBuilder = function(&$builder, &$key, &$data) use($type) {
			return $builder->where('id', $key)->where('type', $type)->first();
        };
        return parent::get($key, $data);
    }
	
    public function save($data, $type) {
    	$that = $this;
		if ($type == 'update') {
			$this->saveFind = function($model, &$data, &$attributes) use ($that) {
				return User::where('id', $attributes['id'])->where('type', $that->type)->first();
			};
		}
		
        $this->saveFormatData = function(&$model, &$data, &$attributes) use ($type, $that) {
            if ($type == 'update') {
                unset($data['name']);
                if (empty($data['mobile'])) {
                    unset($data['mobile']);
                }
                if (empty($data['email'])) {
                    unset($data['email']);
                }
                $data['modifier'] = APP_CURRENT_ADMIN_NAME;
                $data['modify_time'] = UTC_TIME;
            } else {
            	if (User::where('name', $data['name'])->count() > 0) {
            		$that->throwException('common.site_user.name_exist');
        		}

            	$data['creator'] = APP_CURRENT_ADMIN_NAME;
                $data['create_time'] = UTC_TIME;
				$data['reg_time'] = UTC_TIME;
            }
            $data['real_name'] = $data['last_name'] . $data['first_name'];
			$data['type'] = $that->type;
        };
        return parent::save($data, $type);
    }
	
    public function lists($data = []) {
		$type = $this->type;
        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) use($type) {
			$builder->where('type', $type);
			
            $name = isset($data['name']) ? trim($data['name']) : '';
            if (!empty($name)) {
                $builder->where('name', 'like', "%{$name}%");
            } 

            $proxy = isset($data['proxy']) ? trim($data['proxy']) : '';
            if (!empty($proxy)) {
                $proxy_data = Proxy::where('name', $proxy)->first(); 
                $builder->where('proxy_id', isset( $proxy_data->id ) ?  $proxy_data->id : '');
            }

            $real_name = isset($data['real_name']) ? trim($data['real_name']) : '';
            if (!empty($real_name)) {
                $builder->where('real_name', 'like', "%{$real_name}%");
            }

            $gender = isset($data['gender']) ? trim($data['gender']) : 'all';
            if ($gender != 'all') {
                $builder->where('gender', $gender);
            }

            $reg_begin_time = isset($data['reg_begin_time']) ? Time::toTime(trim($data['reg_begin_time'])) : 0;
            if ($reg_begin_time > 0) {
                $builder->where('reg_time', '>=', $reg_begin_time);
            }

            $reg_end_time = isset($data['reg_end_time']) ? Time::toTime(trim($data['reg_end_time'])) : 0;
            if ($reg_end_time > 0) {
                $builder->where('reg_time', '<=', $reg_end_time);
            }

            $login_begin_time = isset($data['login_begin_time']) ? Time::toTime(trim($data['login_begin_time'])) : 0;
            if ($login_begin_time > 0) {
                $builder->where('login_time', '>=', $login_begin_time);
            }

            $login_end_time = isset($data['login_end_time']) ? Time::toTime(trim($data['login_end_time'])) : 0;
            if ($login_end_time > 0) {
                $builder->where('login_time', '<=', $login_end_time);
            }

            $deposit_begin_time = isset($data['deposit_begin_time']) ? Time::toTime(trim($data['deposit_begin_time'])) : 0;
            if ($deposit_begin_time > 0) {
                $builder->where('last_deposit_time', '>=', $deposit_begin_time);
            }

            $deposit_end_time = isset($data['deposit_end_time']) ? Time::toTime(trim($data['deposit_end_time'])) : 0;
            if ($deposit_end_time > 0) {
                $builder->where('last_deposit_time', '<=', $deposit_end_time);
            }
        };
        return parent::lists($data);
    }
	
	public function delete($key, $data = []) {
		$type = $this->type;
        $this->deleteFormatBuilder = function(&$builder, &$key, &$data) use($type) {
			$builder->where('id', $key)->where('type', $type);
        };
        return parent::delete($key, $data);
    }
	
	public function import($file) {
		global $auth_old_data;
		
        if (!$file) {
            $this->throwException('common.user.import_file_required');
        }
	
		$auth_old_data = [];
		
        try {
            $execlType = \PHPExcel_IOFactory::identify($file->getRealPath());
            $execlReader = \PHPExcel_IOFactory::createReader($execlType);
            $excel = $execlReader->load($file->getRealPath());
            $sheet = $excel->getSheet(0);
            $row_count = $sheet->getHighestRow();
            if($row_count < 2){
                $this->throwException('common.user.import_data_empty');
            } elseif($row_count > 1001) {
                $this->throwException('common.user.import_data_max');
            }
            set_time_limit(0);
            DB::connection()->beginTransaction();
            for($i = 2; $i <= $row_count; $i++){
                $user = $this->getImportUser($sheet, $i);
				if (!$user) {
					continue;
				}
				
                if ($user->id > 0) {
					$user->modifier    = APP_CURRENT_ADMIN_NAME;
                    $user->modify_time = UTC_TIME;
                } else {
                    $user->creator     = APP_CURRENT_ADMIN_NAME;
                    $user->reg_time    = UTC_TIME;
					$user->create_time = UTC_TIME;
                }
				$user->type = $this->type;
                $user->save();
            }
            DB::connection()->commit();
        } catch(\Exception $e) {
            DB::connection()->rollback();
            throw $e;
        }
    }
	
	protected function getImportUser($sheet, $index) {
		global $auth_old_data;
		$name  = trim($sheet->getCell('A'.$index)->getValue());
		if (empty($name)) {
			return false;
		}
		
		$user = User::where('name', $name)->first();
		if (!$user) {
			$user = new User;
			$user->name = $name;
		}
		$user->real_name = trim($sheet->getCell('B'.$index)->getValue());
		if (!empty($user->real_name)) {
			$user->last_name  = mb_substr($user->real_name, 0, 1, 'UTF-8');
			$user->first_name = mb_substr($user->real_name, 1, NULL, 'UTF-8');
		}
		$user->gender = trim($sheet->getCell('C'.$index)->getValue());
		$user->mobile = trim($sheet->getCell('D'.$index)->getValue());
		$user->email  = trim($sheet->getCell('E'.$index)->getValue());
		
		$auth_old_data[] = [
			'name' => $user->name,
			'real_name' => $user->real_name,
			'gender' => $user->gender,
			'mobile' => $user->mobile,
			'email'  => $user->email
		];
		return $user;
	}
}