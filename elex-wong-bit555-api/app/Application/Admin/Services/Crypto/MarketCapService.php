<?php

namespace App\Application\Admin\Services\Crypto;
use App\Application\Admin\Models\Crypto\MarketCap;
use Config, Lang;

class MarketCapService extends \App\Services\Crypto\MarketCapService {
	public function getList($title, $status, $page = DEFAULT_PAGE, $pageSize = DEFAULT_PAGE_SIZE) {
		$where = [];
		if ($title) {
			$where[] = ['title', 'LIKE', '%' . $title . '%'];
		}

		if ($status != '') {
			$where[] = ['status', '=', $status];
		}

		$list 		= MarketCap::where($where)
							   ->orderBy('is_top','desc')
							   ->orderBy('update_time','desc')
							   ->get()
							   ->toArray();
							
		$totalList 	= $this->calulateTotalList($list);
		$list 		= $this->paginateList($list, $page, $pageSize);

		return $this->formatList($list, $totalList, $page, $pageSize);
	}

	public function getDetail($id) {
		$detail = MarketCap::findById($id);
        if (empty($detail)) {
			$this->showError([], Lang::get('lang.91003'));
        }

		return $detail;
	}
}