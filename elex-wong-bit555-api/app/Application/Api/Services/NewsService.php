<?php

namespace App\Application\Api\Services;
use App\Application\Api\Models\News;

class NewsService extends \App\Services\NewsService {
    public function getList($page = DEFAULT_PAGE, $pageSize = DEFAULT_PAGE_SIZE, $status = 1) {
        $list           = News::where('status', '=', $status)
                                ->orderBy('is_top','desc')
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

        $totalList      = $this->calulateTotalList($list);
        $list           = $this->paginateList($list, $page, $pageSize);

        return $this->formatList($list, $totalList, $page, $pageSize);
    }

    public function getDetail($id) {
        $detail = News::findById($id);;
        if(empty($detail)) {
            return [];
        }

        if (!empty($detail['description'])){
            $detail['description'] = $this->formatHtml($detail['description']);
        }

        return $detail;
    }
}

?>
