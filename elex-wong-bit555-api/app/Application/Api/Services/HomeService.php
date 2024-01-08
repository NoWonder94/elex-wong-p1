<?php

namespace App\Application\Api\Services;
use App\Application\Api\Models\Home;

class HomeService extends \App\Services\HomeService {
    public function getList($page = DEFAULT_PAGE, $pageSize = DEFAULT_PAGE_SIZE, $status = 1) {

        $isTopPin               = Home::where('status', '=', $status)
                                        ->where('is_top', '=', 2)
                                        ->get()
                                        ->toArray();

        $isMiddlePin            = Home::where('status', '=', $status)
                                        ->where('is_top', '=', 1)
                                        ->orderBy('update_time', 'desc')
                                        ->get()
                                        ->toArray();

        $list                   = Home::where('status', '=', $status)
                                        ->where('is_top', '=', 0)
                                        ->orderBy('is_top', 'desc')
                                        ->orderBy('update_time', 'desc')
                                        ->get()
                                        ->toArray();

        if (!empty($isTopPin)) {
            foreach ($isTopPin as $key => $val) {
                if (isset($val['description']) && !empty($val['description'])) {
                    $isTopPin[$key]['description'] = strip_tags($this->formatHtml($val['description']));
                }
            }
        }

        if (!empty($isMiddlePin)) {
            foreach ($isMiddlePin as $key => $val) {
                if (isset($val['description']) && !empty($val['description'])) {
                    $isMiddlePin[$key]['description'] = strip_tags($this->formatHtml($val['description']));
                }
            }
        }

        if (!empty($list)) {
            foreach ($list as $key => $val) {
                if (isset($val['description']) && !empty($val['description'])) {
                    $list[$key]['description'] = strip_tags($this->formatHtml($val['description']));
                }
            }
        }

        $totalList              = $this->calulateTotalList($list);
        $list                   = $this->paginateList($list, $page, $pageSize);

        $result                 = $this->formatList($list, $totalList, $page, $pageSize);
        return [
            'list'              => [
                'top_list'      => $isTopPin,
                'middle_list'   => $isMiddlePin,
                'bottom_list'   => $result['list'],
            ],

            'total_list'        => $totalList,
            'total_page'        => ceil($totalList / $pageSize),
            'page'              => (int)$page,
            'page_size'         => (int)$pageSize,
        ];

    }

    public function getDetail($id) {
        $detail                 = Home::findById($id);

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
