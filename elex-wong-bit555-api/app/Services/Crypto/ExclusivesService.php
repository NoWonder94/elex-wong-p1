<?php

namespace App\Services\Crypto;
use App\Models\Crypto\Exclusives;
use DB, Config, Lang;

class ExclusivesService extends \App\Services\BaseService {
	public function create($img, $title, $description, $status = 1, $isTop = 0) {
		try {
			DB::connection()->beginTransaction();

			$this->checkIsTop($isTop);
			$exclusivesModel 			    = new Exclusives();
			$exclusivesModel->img 			= $this->formatImg($img);
			$exclusivesModel->title 		= $title;
			$exclusivesModel->description 	= $description;
			$exclusivesModel->status 		= $status;
			$exclusivesModel->is_top 		= $isTop;
			$exclusivesModel->create_time   = UTC_CURRENT_TIME;
			$exclusivesModel->update_time   = UTC_CURRENT_TIME;
			$exclusivesModel->save();

			DB::connection()->commit();
			return $exclusivesModel;
		} catch(\Exception $e) {
			DB::connection()->rollback();
			throw $e;
		}
	}

	public function update($id, $img, $title, $description, $status = 1, $isTop = 0) {
		$exclusivesModel = Exclusives::findById($id);
		if (empty($exclusivesModel)) {
			$this->showError([], Lang::get('lang.91003'));
		}

		try {
			DB::connection()->beginTransaction();

			$this->checkIsTop($isTop, $id);
			$exclusivesModel->img 		    = $this->formatImg($img);
			$exclusivesModel->title 		= $title;
			$exclusivesModel->description   = $description;
			$exclusivesModel->status 		= $status;
			$exclusivesModel->is_top 		= $isTop;
			$exclusivesModel->update_time   = UTC_CURRENT_TIME;
			$exclusivesModel->save();

			DB::connection()->commit();
			return $exclusivesModel;
		} catch(\Exception $e) {
			DB::connection()->rollback();
			throw $e;
		}
	}

	public function delete($id) {
		$exclusivesModel = Exclusives::findById($id);
		if (empty($exclusivesModel)) {
			$this->showError([], Lang::get('lang.91003'));
		}

		$exclusivesModel->delete();
		
		return $exclusivesModel;
	}

	private function checkIsTop($isTop, $id = 0){
		$where		= [];
		$where[]	= ['is_top', '=' ,$isTop];
		if ($id > 0) {
			$where[] 	= ['id', '!=', $id];
		}

		switch ($isTop) {
			case 1:
				$detail = Exclusives::where($where)->get()->toArray();
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