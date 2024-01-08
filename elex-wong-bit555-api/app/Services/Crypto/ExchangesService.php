<?php

namespace App\Services\Crypto;
use App\Models\Crypto\Exchanges;
use App\Services\ResourceService;
use DB, Config, Lang;

class ExchangesService extends \App\Services\BaseService {
	public function create($img, $title, $description, $status = 1, $isTop = 0) {
		try {
			DB::connection()->beginTransaction();

			$this->checkIsTop($isTop);
			$exchangesModel 			    = new Exchanges();
			$exchangesModel->img 			= $this->formatImg($img);
			$exchangesModel->title 			= $title;
			$exchangesModel->description 	= ResourceService::instance()->upload('html', $description);
			$exchangesModel->status 		= $status;
			$exchangesModel->is_top 		= $isTop;
			$exchangesModel->create_time   	= UTC_CURRENT_TIME;
			$exchangesModel->update_time   	= UTC_CURRENT_TIME;
			$exchangesModel->save();

			DB::connection()->commit();
			return $exchangesModel;
		} catch(\Exception $e) {
			DB::connection()->rollback();
			throw $e;
		}
	}

	public function update($id, $img, $title, $description, $status = 1, $isTop = 0) {
		$exchangesModel     = Exchanges::findById($id);
        $descriptionFile    = $exchangesModel['description'];
		if (empty($exchangesModel)) {
			$this->showError([], Lang::get('lang.91003'));
		}

		try {
			DB::connection()->beginTransaction();

			$this->checkIsTop($isTop, $id);
			$exchangesModel->img 		    = $this->formatImg($img);
			$exchangesModel->title 			= $title;
			$exchangesModel->description    = ResourceService::instance()->upload('html', $description);
			$exchangesModel->status 		= $status;
			$exchangesModel->is_top 		= $isTop;
			$exchangesModel->update_time   	= UTC_CURRENT_TIME;
			$exchangesModel->save();
            $this->removeHtml($descriptionFile);

			DB::connection()->commit();
			return $exchangesModel;
		} catch(\Exception $e) {
			DB::connection()->rollback();
			throw $e;
		}
	}

	public function delete($id) {
		$exchangesModel = Exchanges::findById($id);
		if (empty($exchangesModel)) {
			$this->showError([], Lang::get('lang.91003'));
		}

		$exchangesModel->delete();

		return $exchangesModel;
	}

	private function checkIsTop($isTop, $id = 0){
		$where		= [];
		$where[]	= ['is_top', '=' ,$isTop];
		if ($id > 0) {
			$where[] 	= ['id', '!=', $id];
		}

		switch ($isTop) {
			case 1:
				$detail = Exchanges::where($where)->get()->toArray();
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
