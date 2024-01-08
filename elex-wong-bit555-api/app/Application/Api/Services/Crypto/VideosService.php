<?php

namespace App\Application\Api\Services\Crypto;
use App\Application\Api\Models\Crypto\Videos;
use Config, Lang;

class VideosService extends \App\Services\Crypto\VideosService {
	public function getList($title, $status, $page = DEFAULT_PAGE, $pageSize = DEFAULT_PAGE_SIZE) {
		$where = [];
		if ($title) {
			$where[] = ['title', 'LIKE', '%' . $title . '%'];
		}

		if ($status != '') {
			$where[] = ['status', '=', $status];
		}

		$list 		= Videos::where($where)->orderBy('is_top','desc')
							->orderBy('update_time','desc')
							->get()
							->toArray();
							
		$totalList 	= $this->calulateTotalList($list);
		$list 		= $this->paginateList($list, $page, $pageSize);

		return $this->formatList($list, $totalList, $page, $pageSize);
	}

	public function getDetail($id) {
		$detail = Videos::findById($id);
        if (empty($detail)) {
			return [];
        }

		return $detail;
	}
}
