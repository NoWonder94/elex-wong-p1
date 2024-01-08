<?php

namespace App\Services\Crypto;
use App\Models\Crypto\MarketCap;
use DB, Config, Lang;

class MarketCapService extends \App\Services\BaseService {
	public function create($img, $title, $description, $status = 1, $isTop = 0) {
		try {
			DB::connection()->beginTransaction();

			$this->checkIsTop($isTop);
			$marketCapModel 			    = new MarketCap();
			$marketCapModel->img 			= $this->formatImg($img);
			$marketCapModel->title 			= $title;
			$marketCapModel->description 	= $description;
			$marketCapModel->status 		= $status;
			$marketCapModel->is_top 		= $isTop;
			$marketCapModel->create_time   	= UTC_CURRENT_TIME;
			$marketCapModel->update_time   	= UTC_CURRENT_TIME;
			$marketCapModel->save();

			DB::connection()->commit();
			return $marketCapModel;
		} catch(\Exception $e) {
			DB::connection()->rollback();
			throw $e;
		}
	}

	public function update($id, $img, $title, $description, $status = 1, $isTop = 0) {
		$marketCapModel = MarketCap::findById($id);
		if (empty($marketCapModel)) {
			$this->showError([], Lang::get('lang.91003'));
		}

		try {
			DB::connection()->beginTransaction();

			$this->checkIsTop($isTop, $id);
			$marketCapModel->img 		    = $this->formatImg($img);
			$marketCapModel->title 			= $title;
			$marketCapModel->description   	= $description;
			$marketCapModel->status 		= $status;
			$marketCapModel->is_top 		= $isTop;
			$marketCapModel->update_time   	= UTC_CURRENT_TIME;
			$marketCapModel->save();

			DB::connection()->commit();
			return $marketCapModel;
		} catch(\Exception $e) {
			DB::connection()->rollback();
			throw $e;
		}
	}

	public function delete($id) {
		$marketCapModel = MarketCap::findById($id);
		if (empty($marketCapModel)) {
			$this->showError([], Lang::get('lang.91003'));
		}

		$marketCapModel->delete();
		
		return $marketCapModel;
	}

	private function checkIsTop($isTop, $id = 0){
		$where		= [];
		$where[]	= ['is_top', '=' ,$isTop];
		if ($id > 0) {
			$where[] 	= ['id', '!=', $id];
		}

		switch ($isTop) {
			case 1:
				$detail = MarketCap::where($where)->get()->toArray();
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