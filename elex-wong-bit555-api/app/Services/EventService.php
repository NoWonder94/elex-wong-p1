<?php

namespace App\Services;
use App\Models\Event;
use App\Services\ResourceService;
use DB,Lang;

class EventService extends BaseService {
    public function create($img, $title, $description, $status = 1, $isTop = 0 ) {
		try {
			DB::connection()->beginTransaction();
				$this->checkIsTop($isTop);
				$eventModel 			    = new Event();
				$eventModel->img 		    = $this->formatImg($img);
				$eventModel->title 		    = $title;
				$eventModel->description    = ResourceService::instance()->upload('html', $description);
				$eventModel->status 		= $status;
				$eventModel->is_top 		= $isTop;
				$eventModel->create_time    = UTC_CURRENT_TIME;
				$eventModel->update_time    = UTC_CURRENT_TIME;
				$eventModel->save();

			DB::connection()->commit();
			return $eventModel;
		} catch(\Exception $e) {
			DB::connection()->rollback();
			throw $e;
		}

	}
	public function update($id,$img, $title, $description, $status = 1, $isTop = 0 ) {
        $eventModel         = Event::findById($id);
        $descriptionFile    = $eventModel['description'];

        if(empty($eventModel)){
			$this->showError([], Lang::get('lang.91003'));
        }

		try {
			DB::connection()->beginTransaction();
				$this->checkIsTop($isTop,$id);
				$eventModel->img 		    = $this->formatImg($img);
				$eventModel->title 		    = $title;
				$eventModel->description    = ResourceService::instance()->upload('html', $description);
				$eventModel->status 		= $status;
				$eventModel->is_top 		= $isTop;
				$eventModel->update_time    = UTC_CURRENT_TIME;
				$eventModel->save();
                $this->removeHtml($descriptionFile);

			DB::connection()->commit();
			return $eventModel;
		} catch(\Exception $e) {
			DB::connection()->rollback();
			throw $e;
		}
	}
    public function delete($id){
        $eventModel = Event::findById($id);

        if(empty($eventModel)){
			$this->showError([], Lang::get('lang.91003'));
        }

        $eventModel->delete();

        return $eventModel;
    }
	private function checkIsTop($isTop, $id = 0){
		$where		= [];
		$where[]	= ['is_top', '=' ,$isTop];
		if ($id > 0) {
			$where[] 	= ['id', '!=', $id];
		}

		switch ($isTop) {
			case 1:
				$detail =Event::where($where)->get()->toArray();
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
