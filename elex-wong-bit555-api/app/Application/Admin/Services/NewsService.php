<?php

namespace App\Application\Admin\Services;
use App\Application\Admin\Models\News;
use Config, Lang;

class NewsService extends \App\Services\NewsService {
	public function getList($title, $status, $page = DEFAULT_PAGE, $pageSize = DEFAULT_PAGE_SIZE) {
		$where = [];
		if ($title) {
			$where[] = ['title', 'LIKE', '%' . $title . '%'];
		}

		if ($status != '') {
			$where[] = ['status', '=', $status];
		}

		$list 		= News::where($where)->orderBy('is_top','desc')
							->orderBy('update_time','desc')
							->get()
							->toArray();

        if (!empty($list)) {
            foreach ($list as $key => $val) {
                if (isset($val['description']) && !empty($val['description'])) {
                    $list[$key]['description'] = $this->formatHtml($val['description']);
                }
            }
        }

		$totalList 	= $this->calulateTotalList($list);
		$list 		= $this->paginateList($list, $page, $pageSize);

		return $this->formatList($list, $totalList, $page, $pageSize);
	}

	public function getDetail($id) {
		$detail = News::findById($id);
        if (empty($detail)) {
			$this->showError([], Lang::get('lang.91003'));
        }

        if (!empty($detail['description'])){
            $detail['description'] = $this->formatHtml($detail['description']);
        }

		return $detail;
	}
}
