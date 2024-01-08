<?php

namespace App\Services\Crypto;
use App\Models\Crypto\Guides;
use App\Services\ResourceService;
use DB, Config, Lang;

class GuidesService extends \App\Services\BaseService {
	public function create($img, $title, $description, $status = 1, $isTop = 0) {
		try {
			DB::connection()->beginTransaction();

			$this->checkIsTop($isTop);
			$guidesModel 			    = new Guides();
			$guidesModel->img 			= $this->formatImg($img);
			$guidesModel->title 		= $title;
			$guidesModel->description 	= ResourceService::instance()->upload('html', $description);
			$guidesModel->status 		= $status;
			$guidesModel->is_top 		= $isTop;
			$guidesModel->create_time   = UTC_CURRENT_TIME;
			$guidesModel->update_time   = UTC_CURRENT_TIME;
			$guidesModel->save();

			DB::connection()->commit();
			return $guidesModel;
		} catch(\Exception $e) {
			DB::connection()->rollback();
			throw $e;
		}
	}

	public function update($id, $img, $title, $description, $status = 1, $isTop = 0) {
		$guidesModel        = Guides::findById($id);
        $descriptionFile    = $guidesModel['description'];
		if (empty($guidesModel)) {
			$this->showError([], Lang::get('lang.91003'));
		}

		try {
			DB::connection()->beginTransaction();

			$this->checkIsTop($isTop, $id);
			$guidesModel->img 		    = $this->formatImg($img);
			$guidesModel->title 		= $title;
			$guidesModel->description   = ResourceService::instance()->upload('html', $description);
			$guidesModel->status 		= $status;
			$guidesModel->is_top 		= $isTop;
			$guidesModel->update_time   = UTC_CURRENT_TIME;
			$guidesModel->save();
            $this->removeHtml($descriptionFile);

			DB::connection()->commit();
			return $guidesModel;
		} catch(\Exception $e) {
			DB::connection()->rollback();
			throw $e;
		}
	}

	public function delete($id) {
		$guidesModel = Guides::findById($id);
		if (empty($guidesModel)) {
			$this->showError([], Lang::get('lang.91003'));
		}

		$guidesModel->delete();

		return $guidesModel;
	}

	private function checkIsTop($isTop, $id = 0){
		$where		= [];
		$where[]	= ['is_top', '=' ,$isTop];
		if ($id > 0) {
			$where[] 	= ['id', '!=', $id];
		}

		switch ($isTop) {
			case 1:
				$detail = Guides::where($where)->get()->toArray();
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
