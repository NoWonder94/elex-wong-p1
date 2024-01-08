<?php 
namespace App\Application\Www\Services;

use App\Models\Site\User;

class SalesUserService extends UserService {
	protected $type = 1;
	protected $model = User::class;
	
	public function save($data, $type) {
		if (!empty($data['mobile'])) {
			$data['name'] = $data['mobile'];
		}
		
		$data['last_name'] = '';
		$data['first_name'] = '';
		if (!empty($data['real_name'])) {
			$data['last_name'] = mb_substr($data['real_name'], 0, 1, 'UTF-8');
			$data['first_name'] = mb_substr($data['real_name'], 1, NULL, 'UTF-8');
		}
        return parent::save($data, $type);
    }
	
	protected function getImportUser($sheet, $index) {
		global $auth_old_data;
		
		$name = $mobile = trim($sheet->getCell('C'.$index)->getValue());
		if (empty($mobile)) {
			return false;
		}
		
		$user = User::where('name', $name)->where('type', $this->type)->first();
		if (!$user) {
			$user = new User;
			$user->name        = $name;
		}
		$user->mobile    = $mobile;
		$user->real_name = trim($sheet->getCell('A'.$index)->getValue());
		if (!empty($user->real_name)) {
			$user->last_name  = mb_substr($user->real_name, 0, 1, 'UTF-8');
			$user->first_name = mb_substr($user->real_name, 1, NULL, 'UTF-8');
		}
		$user->gender = trim($sheet->getCell('B'.$index)->getValue());
		$user->email  = trim($sheet->getCell('D'.$index)->getValue());
		
		$auth_old_data[] = [
			'real_name' => $user->real_name,
			'gender' => $user->gender,
			'mobile' => $user->mobile,
			'email'  => $user->email
		];
		return $user;
	}
	
	public function getBigImportUser($data) {
		$name = $mobile = trim($data['mobile']);
		if (empty($mobile)) {
			return false;
		}
		$user = User::where('name', $name)->where('type', $this->type)->first();
		if (!$user) {
			$user = new User;
			$user->name        = $name;
		}
		$user->mobile    = $mobile;
		$user->real_name = trim($data['name']);
		if (!empty($user->real_name)) {
			$user->last_name  = mb_substr($user->real_name, 0, 1, 'UTF-8');
			$user->first_name = mb_substr($user->real_name, 1, NULL, 'UTF-8');
		}
		$user->gender = '先生';
		$user->type   = $this->type;
		return $user;
    }
}