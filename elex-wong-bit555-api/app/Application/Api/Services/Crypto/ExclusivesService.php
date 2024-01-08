<?php

namespace App\Application\Api\Services\Crypto;
use App\Application\Api\Models\Crypto\Exclusives;
use Config, Lang;

class ExclusivesService extends \App\Services\Crypto\ExclusivesService {
	public function getList($title, $status, $page = DEFAULT_PAGE, $pageSize = DEFAULT_PAGE_SIZE) {
		$where = [];
		if ($title) {
			$where[] = ['title', 'LIKE', '%' . $title . '%'];
		}

		if ($status != '') {
			$where[] = ['status', '=', $status];
		}

		$list 		= Exclusives::where($where)->orderBy('is_top','desc')
								->orderBy('update_time','desc')
								->get()
								->toArray();
							
		$totalList 	= $this->calulateTotalList($list);
		$list 		= $this->paginateList($list, $page, $pageSize);

		return $this->formatList($list, $totalList, $page, $pageSize);
	}

	public function getDetail($id) {
		$detail = Exclusives::findById($id);
        if (empty($detail)) {
			return [];
        }

		return $detail;
	}
}
