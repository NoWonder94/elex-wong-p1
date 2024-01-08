<?php

namespace App\Application\Api\Services\Crypto;
use App\Application\Api\Models\Crypto\PriceTracker;
use Config, Lang;

class PriceTrackerService extends \App\Services\Crypto\PriceTrackerService {
	public function getList($title, $status, $page = DEFAULT_PAGE, $pageSize = DEFAULT_PAGE_SIZE) {
		$where = [];
		if ($title) {
			$where[] = ['title', 'LIKE', '%' . $title . '%'];
		}

		if ($status != '') {
			$where[] = ['status', '=', $status];
		}

		$list 		= PriceTracker::where($where)->orderBy('is_top','desc')
							      ->orderBy('update_time','desc')
							      ->get()
							      ->toArray();

        if (!empty($list)) {
            foreach ($list as $key => $val) {
                if (isset($val['description']) && !empty($val['description'])) {
                    $list[$key]['description'] = strip_tags($this->formatHtml($val['description']));
                }
            }
        }

		$totalList 	= $this->calulateTotalList($list);
		$list 		= $this->paginateList($list, $page, $pageSize);

		return $this->formatList($list, $totalList, $page, $pageSize);
	}

	public function getDetail($id) {
		$detail = PriceTracker::findById($id);
        if (empty($detail)) {
			return [];
        }

        if (!empty($detail['description'])){
            $detail['description'] = $this->formatHtml($detail['description']);
        }

		return $detail;
	}
}
