<?php

namespace App\Services\Crypto;
use App\Models\Crypto\PriceTracker;
use App\Services\ResourceService;
use DB, Config, Lang;

class PriceTrackerService extends \App\Services\BaseService {
	public function create($img, $title, $description, $status = 1, $isTop = 0) {
		try {
			DB::connection()->beginTransaction();

			$this->checkIsTop($isTop);
			$priceTrackerModel 			    	= new PriceTracker();
			$priceTrackerModel->img 			= $this->formatImg($img);
			$priceTrackerModel->title 			= $title;
			$priceTrackerModel->description 	= ResourceService::instance()->upload('html', $description);
			$priceTrackerModel->status 			= $status;
			$priceTrackerModel->is_top 			= $isTop;
			$priceTrackerModel->create_time   	= UTC_CURRENT_TIME;
			$priceTrackerModel->update_time   	= UTC_CURRENT_TIME;
			$priceTrackerModel->save();

			DB::connection()->commit();
			return $priceTrackerModel;
		} catch(\Exception $e) {
			DB::connection()->rollback();
			throw $e;
		}
	}

	public function update($id, $img, $title, $description, $status = 1, $isTop = 0) {
		$priceTrackerModel  = PriceTracker::findById($id);
        $descriptionFile    = $priceTrackerModel['description'];
		if (empty($priceTrackerModel)) {
			$this->showError([], Lang::get('lang.91003'));
		}

		try {
			DB::connection()->beginTransaction();

			$this->checkIsTop($isTop, $id);
			$priceTrackerModel->img 		    = $this->formatImg($img);
			$priceTrackerModel->title 			= $title;
			$priceTrackerModel->description   	= ResourceService::instance()->upload('html', $description);
			$priceTrackerModel->status 			= $status;
			$priceTrackerModel->is_top 			= $isTop;
			$priceTrackerModel->update_time   	= UTC_CURRENT_TIME;
			$priceTrackerModel->save();
            $this->removeHtml($descriptionFile);

			DB::connection()->commit();
			return $priceTrackerModel;
		} catch(\Exception $e) {
			DB::connection()->rollback();
			throw $e;
		}
	}

	public function delete($id) {
		$priceTrackerModel = PriceTracker::findById($id);
		if (empty($priceTrackerModel)) {
			$this->showError([], Lang::get('lang.91003'));
		}

		$priceTrackerModel->delete();

		return $priceTrackerModel;
	}

	private function checkIsTop($isTop, $id = 0){
		$where		= [];
		$where[]	= ['is_top', '=' ,$isTop];
		if ($id > 0) {
			$where[] 	= ['id', '!=', $id];
		}

		switch ($isTop) {
			case 1:
				$detail = PriceTracker::where($where)->get()->toArray();
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
