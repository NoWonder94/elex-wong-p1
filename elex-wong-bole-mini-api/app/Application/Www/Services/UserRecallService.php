<?php 
namespace App\Application\Www\Services;

use App\Models\Site\User;
use DB, Time;

class UserRecallService extends UserService {
	protected $type = 0;
	protected $model = User::class;

	public function save($data, $type) {
		$name = $data['name'];

        $user = User::where('name', $name)->where('type', $this->type)->first();
		if (!$user) {
			return false;
		}
		$user->is_recall  = 1;
		$user->total_deposit = $data['total_deposit'];
		$user->total_withdraw = $data['total_withdraw'];
		$user->leave_days  = $data['leave_days'];
		$user->recall_import_time  = UTC_TIME;
		$user->modifier    = APP_CURRENT_ADMIN_NAME;
        $user->modify_time = UTC_TIME;

		$result = false;
		try {
			DB::connection()->beginTransaction();

			$user->type = $this->type;
            $result = $user->save();

		    DB::connection()->commit();
        } catch(\Exception $e) {
            DB::connection()->rollback();
            throw $e;
        }
        return $result;
    }

    public function delete($key, $data = []) {
		$update_data = ['is_recall' => 0, 'modifier' => APP_CURRENT_ADMIN_NAME, 'modify_time' => UTC_TIME, 'total_deposit' => 0, 'total_withdraw' => 0, 'leave_days' => 0, 'recall_import_time' => 0];
        User::where('id', $data['id'])
            ->update($update_data);
        return 1;
    }
	
	public function lists($data = []) {
		$type = $this->type;
		$is_recall = 1;

		$list = User::where('type', $type)->where('is_recall', $is_recall)->where('site_id', 5);

		$name = isset($data['name']) ? trim($data['name']) : '';
        if (!empty($name)) {
            $list->where('name', 'like', "%{$name}%");
        }

        $gender = isset($data['gender']) ? trim($data['gender']) : 'all';
        if ($gender != 'all') {
            $list->where('gender', $gender);
        }

        $reg_begin_time = isset($data['reg_begin_time']) ? Time::toTime(trim($data['reg_begin_time'])) : 0;
        if ($reg_begin_time > 0) {
            $list->where('reg_time', '>=', $reg_begin_time);
        }

        $reg_end_time = isset($data['reg_end_time']) ? Time::toTime(trim($data['reg_end_time'])) : 0;
        if ($reg_end_time > 0) {
            $list->where('reg_time', '<=', $reg_end_time);
        }

        $total_count = $list->count();

        $page = isset($data['page']) ? max((int)$data['page'], 1) : 1;
        $page_size = isset($data['page_size']) ? (int)$data['page_size'] : 0;


		$list = $list->skip(($page - 1) * $page_size)
					 ->take($page_size)
					 ->orderBy('recall_import_time','asc')
					 ->get()
					 ->toArray();

        return ['lists' => $list, 'total_count' => $total_count];
    }
	
	protected function getImportUser($sheet, $index) {
		global $auth_old_data;
		
		$name = trim($sheet->getCell('A'.$index)->getValue());
		if (empty($name)) {
			return false;
		}
		
		$user = User::where('name', $name)->where('type', $this->type)->first();
		if (!$user) {
			return $user;
		}
		$user->total_deposit = trim($sheet->getCell('B'.$index)->getValue());
		$user->total_withdraw = trim($sheet->getCell('C'.$index)->getValue());
		$user->leave_days  = trim($sheet->getCell('D'.$index)->getValue());
		$user->is_recall  = 1;

		$auth_old_data[] = [
			'is_recall' => $user->is_recall,
			'total_deposit' => $user->total_deposit,
			'total_withdraw' => $user->total_withdraw,
			'leave_days' => $user->leave_days,
			'recall_import_time' => UTC_TIME,
		];
		return $user;
	}
}