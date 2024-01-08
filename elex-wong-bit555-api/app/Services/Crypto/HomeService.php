<?php

namespace App\Services\Crypto;
use App\Models\Crypto\Home;
use App\Services\ResourceService;
use DB, Lang;

class HomeService extends \App\Services\BaseService {
	public function create($img, $title, $description, $status = 1, $isTop = 0) {
		try {
			DB::connection()->beginTransaction();

			$this->checkIsTop($isTop);
			$homeModel 				= new Home();
			$homeModel->img 		= $this->formatImg($img);
			$homeModel->title 		= $title;
			$homeModel->description = ResourceService::instance()->upload('html', $description);
			$homeModel->is_top      = $isTop;
			$homeModel->status 		= $status;
			$homeModel->create_time = UTC_CURRENT_TIME;
			$homeModel->update_time = UTC_CURRENT_TIME;
			$homeModel->save();

			DB::connection()->commit();
			return $homeModel;
		} catch(\Exception $e) {
			DB::connection()->rollback();
			throw $e;
		}

	}

	public function update($id, $img, $title, $description, $status = 1, $isTop = 0) {
        try {
            $homeModel          = Home::findById($id);
            $descriptionFile    = $homeModel['description'];
            if (empty($homeModel)) {
                $this->showError([], Lang::get('lang.91003'));
            }

			DB::connection()->beginTransaction();

			$this->checkIsTop($isTop, $id);
			$homeModel->img 		= $this->formatImg($img);
			$homeModel->title 		= $title;
			$homeModel->description = ResourceService::instance()->upload('html', $description);
			$homeModel->is_top 		= $isTop;
			$homeModel->status 		= $status;
			$homeModel->update_time = UTC_CURRENT_TIME;
			$homeModel->save();
            $this->removeHtml($descriptionFile);

			DB::connection()->commit();
			return $homeModel;
		} catch(\Exception $e) {
			DB::connection()->rollback();
			throw $e;
		}
	}

    public function delete($id){
        $homeModel = Home::findById($id);

        if(empty($homeModel)){
			$this->showError([], Lang::get('lang.91003'));
        }
        $homeModel->delete();

        return $homeModel;
    }

	private function checkIsTop($isTop, $id = 0) {
		$where 			= [];
		$where[] 		= ['is_top', '=', $isTop];
		if ($id > 0) {
			$where[] 	= ['id', '!=', $id];
		}

		switch ($isTop) {
			case 2:
				$detail = Home::where($where)->get()->first();
				if (!empty($detail)) {
					$detail->is_top 		= 0;
					$detail->update_time 	= UTC_CURRENT_TIME;
					$detail->save();
				}
				break;
			case 1:
				$list = Home::where($where)->get()->toArray();
				if (!empty($list)) {
					if (count($list) >= 2) {
						$this->showError([],Lang::get('lang.91009'));
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
