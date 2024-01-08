<?php
	namespace App\Services\BoleMini;
	use App\Models\BoleMini\Directory;
	use Illuminate\Support\Facades\DB;
	use Cache;

	class DirectoryService extends BaseService {
		public function createData(array $data = []) {
			try {
            	DB::connection()->beginTransaction();

            	$dbData['chinese'] = $data['chinese'];
            	$dbData['english'] = $data['english'];
            	$dbData['korean'] = $data['korean'];
            	$dbData['img'] = $this->saveImg($data['img'], 'upload_directory_img_location');
            	$dbData['sort'] = $data['sort'];
            	$dbData['status'] = $data['status'];
            	$dbData['date_create'] = time();
				$dbData['date_update'] = time();

            	$directory = new Directory();
				$directory->create($dbData);

				Cache::forget('cache_data_directory');

				DB::connection()->commit();
			} catch(\Exception $e) { 
	            DB::connection()->rollback();
	            throw $e;
	        }

	        return true;
		}

		public function updateData(array $data = []) {
			try {
            	DB::connection()->beginTransaction();

            	$id = $data['id'];

            	$directory = Directory::dbTable()
            			->where('id', $id)
            			->first();

            	$dbData['chinese'] = $data['chinese'];
            	$dbData['english'] = $data['english'];
            	$dbData['korean'] = $data['korean'];
            	$dbData['img'] = (!empty($data['img']) && preg_match('/^data:image\/(\w+);base64,/', $data['img'])) ? $this->saveImg($data['img'], 'upload_directory_img_location') : $directory['img'];
            	$dbData['sort'] = $data['sort'];
            	$dbData['status'] = $data['status'];
				$dbData['date_update'] = time();

            	$directory = new Directory();
				$directory->update($id, $dbData);

				Cache::forget('cache_data_directory');

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

            	$directory = new Directory();
				$directory->delete($id);

				Cache::forget('cache_data_directory');

				DB::connection()->commit();
			} catch(\Exception $e) { 
	            DB::connection()->rollback();
	            throw $e;
	        }

	        return true;
		}
	}
?>