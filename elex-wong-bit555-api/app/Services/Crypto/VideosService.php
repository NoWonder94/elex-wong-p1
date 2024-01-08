<?php

namespace App\Services\Crypto;
use App\Models\Crypto\Videos;
use DB, Config, Lang;

class VideosService extends \App\Services\BaseService {
	public function create($img, $title, $description, $status = 1, $isTop = 0) {
		try {
			DB::connection()->beginTransaction();

			$this->checkIsTop($isTop);
			$videosModel 			    = new Videos();
			$videosModel->img 			= $this->formatImg($img);
			$videosModel->title 		= $title;
			$videosModel->description 	= $description;
			$videosModel->status 		= $status;
			$videosModel->is_top 		= $isTop;
			$videosModel->create_time   = UTC_CURRENT_TIME;
			$videosModel->update_time   = UTC_CURRENT_TIME;
			$videosModel->save();

			DB::connection()->commit();
			return $videosModel;
		} catch(\Exception $e) {
			DB::connection()->rollback();
			throw $e;
		}
	}

	public function update($id, $img, $title, $description, $status = 1, $isTop = 0) {
		$videosModel = Videos::findById($id);
		if (empty($videosModel)) {
			$this->showError([], Lang::get('lang.91003'));
		}

		try {
			DB::connection()->beginTransaction();

			$this->checkIsTop($isTop, $id);
			$videosModel->img 		    = $this->formatImg($img);
			$videosModel->title 		= $title;
			$videosModel->description   = $description;
			$videosModel->status 		= $status;
			$videosModel->is_top 		= $isTop;
			$videosModel->update_time   = UTC_CURRENT_TIME;
			$videosModel->save();

			DB::connection()->commit();
			return $videosModel;
		} catch(\Exception $e) {
			DB::connection()->rollback();
			throw $e;
		}
	}

	public function delete($id) {
		$videosModel = Videos::findById($id);
		if (empty($videosModel)) {
			$this->showError([], Lang::get('lang.91003'));
		}

		$videosModel->delete();
		
		return $videosModel;
	}

	private function checkIsTop($isTop, $id = 0){
		$where		= [];
		$where[]	= ['is_top', '=' ,$isTop];
		if ($id > 0) {
			$where[] 	= ['id', '!=', $id];
		}

		switch ($isTop) {
			case 1:
				$detail = Videos::where($where)->get()->toArray();
				if(!empty($detail)){
					if(count($detail) >= 3){
						$this->showError([], Lang::get('lang.91010'));
					}
				}
				break;
			case 0:
				break;
			default:
				break;
		}
	}
}