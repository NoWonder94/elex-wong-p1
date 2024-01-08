<?php

namespace App\Services\Crypto;
use App\Models\Crypto\News;
use App\Services\ResourceService;
use DB, Config, Lang;

class NewsService extends \App\Services\BaseService {
	public function create($img, $title, $description, $status = 1, $isTop = 0) {
		try {
			DB::connection()->beginTransaction();

			$this->checkIsTop($isTop);
			$newsModel 			    	= new News();
			$newsModel->img 			= $this->formatImg($img);
			$newsModel->title 			= $title;
			$newsModel->description 	= ResourceService::instance()->upload('html', $description);
			$newsModel->status 			= $status;
			$newsModel->is_top 			= $isTop;
			$newsModel->create_time    	= UTC_CURRENT_TIME;
			$newsModel->update_time    	= UTC_CURRENT_TIME;
			$newsModel->save();

			DB::connection()->commit();
			return $newsModel;
		} catch(\Exception $e) {
			DB::connection()->rollback();
			throw $e;
		}
	}

	public function update($id, $img, $title, $description, $status = 1, $isTop = 0) {
		$newsModel          = News::findById($id);
        $descriptionFile    = $newsModel['description'];
		if (empty($newsModel)) {
			$this->showError([], Lang::get('lang.91003'));
		}

		try {
			DB::connection()->beginTransaction();

			$this->checkIsTop($isTop, $id);
			$newsModel->img 		    = $this->formatImg($img);
			$newsModel->title 		    = $title;
			$newsModel->description    	= ResourceService::instance()->upload('html', $description);
			$newsModel->status 			= $status;
			$newsModel->is_top 			= $isTop;
			$newsModel->update_time    	= UTC_CURRENT_TIME;
			$newsModel->save();
            $this->removeHtml($descriptionFile);

			DB::connection()->commit();
			return $newsModel;
		} catch(\Exception $e) {
			DB::connection()->rollback();
			throw $e;
		}
	}

	public function delete($id) {
		$newsModel = News::findById($id);
		if (empty($newsModel)) {
			$this->showError([], Lang::get('lang.91003'));
		}

		$newsModel->delete();

		return $newsModel;
	}

	private function checkIsTop($isTop, $id = 0){
		$where		= [];
		$where[]	= ['is_top', '=' ,$isTop];
		if ($id > 0) {
			$where[] 	= ['id', '!=', $id];
		}

		switch ($isTop) {
			case 1:
				$detail = News::where($where)->get()->toArray();
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
