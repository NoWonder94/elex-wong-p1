<?php
	namespace App\Services\BoleMini;
	use App\Models\BoleMini\Info;
	use Illuminate\Support\Facades\DB;
	use Cache;

	class InfoService extends BaseService {
		public function getDetail($id) {
			$list = Info::dbTable()
					->select('chinese', 'english', 'korean')
					->where('id', $id)
					->get()
					->first();

			return $list;
		}

		public function createData(array $data = []) {
			try {
            	DB::connection()->beginTransaction();

            	$dbData['info_category_id'] = $data['info_category_id'];
            	$dbData['img_banner'] = $this->saveImg($data['img_banner'], 'upload_info_img_banner_location');
            	$dbData['img'] = $this->saveImg($data['img'], 'upload_info_img_location');
            	$dbData['chinese']['title'] = $data['chinese']['title'];
            	$dbData['chinese']['summary'] = $data['chinese']['summary'];
            	$dbData['chinese']['description'] = $data['chinese']['description'];
            	$dbData['english']['title'] = $data['english']['title'];
            	$dbData['english']['summary'] = $data['english']['summary'];
            	$dbData['english']['description'] = $data['english']['description'];
            	$dbData['korean']['title'] = $data['korean']['title'];
            	$dbData['korean']['summary'] = $data['korean']['summary'];
            	$dbData['korean']['description'] = $data['korean']['description'];
            	$dbData['chinese'] = json_encode($dbData['chinese']);
				$dbData['english'] = json_encode($dbData['english']);
				$dbData['korean'] = json_encode($dbData['korean']);
				$dbData['self_set_date'] = $data['self_set_date'];
				$dbData['screenshot'] = (isset($data['screenshot']) && !empty($data['screenshot'])) ? json_encode($data['screenshot']) : null;
				$dbData['sort'] = $data['sort'];
				$dbData['status'] = $data['status'];
				$dbData['date_create'] = time();
				$dbData['date_update'] = time();

            	$info = new Info();
				$info->create($dbData);

				Cache::forget('cache_data_info');

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

            	$info = Info::dbTable()
            			->where('id', $id)
            			->first();

            	$dbData['info_category_id'] = $data['info_category_id'];
            	$dbData['img_banner'] = (!empty($data['img_banner']) && preg_match('/^data:image\/(\w+);base64,/', $data['img_banner'])) ? $this->saveImg($data['img_banner'], 'upload_info_img_banner_location') : $info['img_banner'];
            	$dbData['img'] = (!empty($data['img']) && preg_match('/^data:image\/(\w+);base64,/', $data['img'])) ? $this->saveImg($data['img'], 'upload_info_img_location') : $info['img'];
            	$dbData['chinese']['title'] = $data['chinese']['title'];
            	$dbData['chinese']['description'] = $data['chinese']['description'];
            	$dbData['chinese']['summary'] = $data['chinese']['summary'];
            	$dbData['english']['title'] = $data['english']['title'];
            	$dbData['english']['description'] = $data['english']['description'];
            	$dbData['english']['summary'] = $data['english']['summary'];
            	$dbData['korean']['title'] = $data['korean']['title'];
            	$dbData['korean']['description'] = $data['korean']['description'];
            	$dbData['korean']['summary'] = $data['korean']['summary'];
            	$dbData['chinese'] = json_encode($dbData['chinese']);
				$dbData['english'] = json_encode($dbData['english']);
				$dbData['korean'] = json_encode($dbData['korean']);
				$dbData['self_set_date'] = $data['self_set_date'];
				$dbData['screenshot'] = (isset($data['screenshot']) && !empty($data['screenshot'])) ? json_encode($data['screenshot']) : null;
				$dbData['sort'] = $data['sort'];
				$dbData['status'] = $data['status'];
				$dbData['date_update'] = time();

            	$info = new Info();
				$info->update($id, $dbData);

				Cache::forget('cache_data_info');

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

            	$info = new Info();
				$info->delete($id);

				Cache::forget('cache_data_info');
				
				DB::connection()->commit();
			} catch(\Exception $e) { 
	            DB::connection()->rollback();
	            throw $e;
	        }

	        return true;
		}
	}
?>