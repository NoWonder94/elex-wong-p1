<?php
	namespace App\Services\BoleMini;
	use App\Models\BoleMini\File;
	use Illuminate\Support\Facades\DB;
	use Cache;

	class FileService extends BaseService {
		public function createData(array $data = [], $fileResource) {
			try {
            	DB::connection()->beginTransaction();

            	$dbData['directory_id'] = $data['directory_id'];
            	$dbData['lang_id'] = $data['lang_id'];
            	$dbData['name'] = $data['name'];
            	$dbData['file'] = $this->saveFile($fileResource, 'upload_file_location');
            	$dbData['file_format'] = $this->getFileFormat($fileResource);
            	$dbData['status'] = $data['status'];
            	$dbData['date_create'] = time();
				$dbData['date_update'] = time();

            	$file = new File();
				$file->create($dbData);

				Cache::forget('cache_data_file');

				DB::connection()->commit();
			} catch(\Exception $e) { 
	            DB::connection()->rollback();
	            throw $e;
	        }

	        return true;
		}

		public function updateData(array $data = [], $fileResource) {
			try {
            	DB::connection()->beginTransaction();

            	$id = $data['id'];

            	$file = File::dbTable()
            			->where('id', $id)
            			->first();

            	$dbData['directory_id'] = $data['directory_id'];
            	$dbData['lang_id'] = $data['lang_id'];
            	$dbData['name'] = $data['name'];
            	$dbData['file'] = !empty($fileResource) ? $this->saveFile($fileResource, 'upload_file_location') : $file['file'];
            	$dbData['file_format'] = !empty($fileResource) ? $this->getFileFormat($fileResource) : $file['file_format'];
            	$dbData['status'] = $data['status'];
            	$dbData['date_create'] = time();
				$dbData['date_update'] = time();

            	$file = new File();
				$file->update($id, $dbData);

				Cache::forget('cache_data_file');

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
            	$file = new File();
				$file->delete($id);
				Cache::forget('cache_data_file');
				DB::connection()->commit();
			} catch(\Exception $e) { 
	            DB::connection()->rollback();
	            throw $e;
	        }

	        return true;
		}
	}
?>