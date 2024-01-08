<?php
    namespace App\Application\Api\Services;
    use App\Application\Api\Models\Info;
    use Config;

    class InfoService extends BaseService {
        public function getList($categoryId, $page = 1, $pageSize = 5, $lang = 'chi') {
            $column = $this->getColumnByLang('info', $lang);

            $where = [];
            if ($categoryId > 0) {
                $where[] = ['info.info_category_id', $categoryId];
            }

            $queryList = Info::dbTable('info')
                            ->leftJoin('info_category', 'info_category.id', '=', 'info.info_category_id')
                            ->select(
                                'info.id',
                                'info.info_category_id',
                                'info_category.name AS info_category_name',
                                'info.img_banner',
                                'info.img',
                                'info.self_set_date',
                                'info.date_create',
                                $column . ' AS content'
                            )
                            ->where('info.status', 1)
                            ->where($where)
                            ->orderBy('info.sort', 'ASC')
                            ->orderBy('info.id', 'ASC');
            $queryTotalCount = clone $queryList;

            $page = max(0, $page - 1);
            $offset = $page * $pageSize;
            $list = $queryList->offset($offset)->limit($pageSize)->get()->toArray();
            $totalCount = $queryTotalCount->get()->count();

            $listNew = [];
            foreach ($list as $key => $val) {
                $listNew[$key] = (array)$val;
                $listNew[$key]['img_banner'] = Config::get('app.server_url') . Config::get('app.file_location.info.img_banner') . $listNew[$key]['img_banner'];
                $listNew[$key]['img'] = Config::get('app.server_url') . Config::get('app.file_location.info.img') . $listNew[$key]['img'];
                //$listNew[$key]['date_create'] = gmdate('d/m/Y', $listNew[$key]['date_create']);
                $listNew[$key]['date_create'] = gmdate('Y-m-d', $listNew[$key]['date_create']);
                $listNew[$key]['content'] = (array)json_decode($listNew[$key]['content']);
            }

            $result = [
                'list' => $listNew,
                'totalCount' => $totalCount
            ];

            return $result;
        }

        public function getDetail($id, $lang = 'chi') {
            $column = $this->getColumnByLang('info', $lang);

            $detail = Info::dbTable()
                        ->select(
                            'id',
                            'info_category_id',
                            'img_banner',
                            'img',
                            'self_set_date',
                            'screenshot',
                            'date_create',
                            $column . ' AS content'
                        )
                        ->where('status', 1)
                        ->where('id', $id)
                        ->get()
                        ->first();

            $otherDetail = Info::dbTable()
                            ->select(
                                'id',
                                $column . ' AS content'
                            )
                            ->get()
                            ->toArray();

            $otherDetailNew = [];
            foreach ($otherDetail as $key => $val) {
                $array = (array)$val;
                $otherDetailNew[$array['id']] = ((array)json_decode($array['content']))['title'];
            }

            $ids = array_column($otherDetail, 'id');
            $prev = 0;
            $next = 0;
            for ($i = 0; $i < count($ids); $i++) {
                if ($ids[$i] == $id) {
                    if ($i != 0) {
                        $key = $i;
                        $prev = $ids[--$key];
                    }
                    
                    if ($i != (count($ids) - 1)) {
                        $key = $i;
                        $next = $ids[++$key];
                    }

                    break;
                }
            }

            $detailNew = (array)$detail;
            $detailNew['img_banner'] = Config::get('app.server_url') . Config::get('app.file_location.info.img_banner') . $detailNew['img_banner'];
            $detailNew['img'] = Config::get('app.server_url') . Config::get('app.file_location.info.img') . $detailNew['img'];
            //$detailNew['date_create'] = gmdate('d/m/Y', $detailNew['date_create']);
            $detailNew['date_create'] = gmdate('Y-m-d', $detailNew['date_create']);
            $detailNew['content'] = (array)json_decode($detailNew['content']);
            $detailNew['prev']['id'] = $prev != 0 ? $prev : '';
            $detailNew['prev']['name'] = $prev != 0 ? $otherDetailNew[$prev] : '';
            $detailNew['next']['id'] = $next != 0 ? $next : '';
            $detailNew['next']['name'] = $next != 0 ? $otherDetailNew[$next] : '';

            $screenshotList = (array)json_decode($detailNew['screenshot']);
            $detailNew['screenshot'] = [];
            if (!empty($screenshotList)) {
                foreach ($screenshotList as $key => $val) {
                    $detailNew['screenshot'][$key] = Config::get('app.server_url') . Config::get('app.file_location.screenshot') . $val;
                }
            }

            return $detailNew;
        }
    }
?>