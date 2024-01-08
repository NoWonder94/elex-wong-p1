<?php

namespace App\Services\Crypto;
use App\Models\Crypto\Podcast;
use DB, Config, Lang;

class PodcastService extends \App\Services\BaseService {
	public function create($img, $title, $description, $status = 1, $isTop = 0) {
		try {
			DB::connection()->beginTransaction();

			$this->checkIsTop($isTop);
			$podcastModel 			    	= new Podcast();
			$podcastModel->img 				= $this->formatImg($img);
			$podcastModel->title 			= $title;
			$podcastModel->description 		= $description;
			$podcastModel->status 			= $status;
			$podcastModel->is_top 			= $isTop;
			$podcastModel->create_time   	= UTC_CURRENT_TIME;
			$podcastModel->update_time   	= UTC_CURRENT_TIME;
			$podcastModel->save();

			DB::connection()->commit();
			return $podcastModel;
		} catch(\Exception $e) {
			DB::connection()->rollback();
			throw $e;
		}
	}

	public function update($id, $img, $title, $description, $status = 1, $isTop = 0) {
		$podcastModel = Podcast::findById($id);
		if (empty($podcastModel)) {
			$this->showError([], Lang::get('lang.91003'));
		}

		try {
			DB::connection()->beginTransaction();

			$this->checkIsTop($isTop, $id);
			$podcastModel->img 		    	= $this->formatImg($img);
			$podcastModel->title 			= $title;
			$podcastModel->description   	= $description;
			$podcastModel->status 			= $status;
			$podcastModel->is_top 			= $isTop;
			$podcastModel->update_time   	= UTC_CURRENT_TIME;
			$podcastModel->save();

			DB::connection()->commit();
			return $podcastModel;
		} catch(\Exception $e) {
			DB::connection()->rollback();
			throw $e;
		}
	}

	public function delete($id) {
		$podcastModel = Podcast::findById($id);
		if (empty($podcastModel)) {
			$this->showError([], Lang::get('lang.91003'));
		}

		$podcastModel->delete();
		
		return $podcastModel;
	}

	private function checkIsTop($isTop, $id = 0){
		$where		= [];
		$where[]	= ['is_top', '=' ,$isTop];
		if ($id > 0) {
			$where[] 	= ['id', '!=', $id];
		}

		switch ($isTop) {
			case 1:
				$detail = Podcast::where($where)->get()->toArray();
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