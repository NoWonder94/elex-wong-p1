<?php
	namespace App\Services\BoleMini;
	use App\Models\BoleMini\Member;
	use Illuminate\Support\Facades\DB;
	use Cache;

	class MemberService {
		public function createData(array $data = []) {
			$data['date_create'] = time();
			$data['date_update'] = time();

			try {
            	DB::connection()->beginTransaction();
            	$member = new Member();
				$member->create($data);
				Cache::forget('cache_data_member');
				DB::connection()->commit();
			} catch(\Exception $e) { 
	            DB::connection()->rollback();
	            throw $e;
	        }

	        return true;
		}

		public function updateData(array $data = []) {
			$id = $data['id'];
			$data['date_update'] = time();

			try {
            	DB::connection()->beginTransaction();
            	$member = new Member();
				$member->update($id, $data);
				Cache::forget('cache_data_member');
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
            	$member = new Member();
				$member->delete($id);
				Cache::forget('cache_data_member');
				DB::connection()->commit();
			} catch(\Exception $e) { 
	            DB::connection()->rollback();
	            throw $e;
	        }

	        return true;
		}
	}
?>