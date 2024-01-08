<?php
    namespace App\Http\Controllers\Api\Info;
    use App\Http\Controllers\Api\BaseController;
    use App\Services\BoleMini\InfoService;
    use App\Services\BoleMini\InfoCategoryService;
    use App\Models\BoleMini\Info;
    use App\Models\BoleMini\InfoCategory;
    use App\Exceptions\Response\Service\ServiceException;
    use App\Exceptions\Response\Service\ServiceCode;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Storage;
    use Cache;

    class IndexController extends BaseController {
        private $imgBannerUrl = '/img/bole_mini/upload/info/img_banner/';
        private $imgUrl = '/img/bole_mini/upload/info/img/';
        private $screenshotLocation = '/img/bole_mini/upload/screenshot/game/';
        
        public function getList() {
            $cacheData = Cache::get('cache_data_info');

            if ($cacheData) {
                //return $this->response->setResponseData($cacheData)->getResponse();
            }

            $queryList = Info::dbTable('info')
                            ->select(
                                'info.id',
                                'info.info_category_id',
                                'infoCategory.name AS info_category_name',
                                'info.img_banner',
                                'info.img',
                                'info.self_set_date',
                                'info.screenshot',
                                'info.sort',
                                'info.status',
                                'info.chinese',
                                'info.english',
                                'info.korean',
                                'info.date_create',
                                'info.date_update'
                            )
                            ->leftJoin(InfoCategory::TABLENAME.' AS infoCategory', function($join) {
                                $join->on('infoCategory.id', '=', 'info.info_category_id');
                            })
                            ->orderBy('info.id', 'desc');
            $queryCount = clone $queryList;

            $list = $queryList->get()->toArray();
            $totalCount = $queryCount->count();

            foreach ($list as $key => $val) {
                if (isset($val['img_banner']) && !empty($val['img_banner'])) {
                    $list[$key]['img_banner'] = $this->imgBannerUrl.$val['img_banner'];
                }

                if (isset($val['img']) && !empty($val['img'])) {
                    $list[$key]['img'] = $this->imgUrl.$val['img'];
                }

                if (isset($val['screenshot']) && !empty($val['screenshot'])) {
                    $index = 0;
                    $screenshotArray = [];
                    $screenshotList = json_decode($val['screenshot']);
                    foreach ($screenshotList as $screenshotListKey => $screenshotListVal) {
                        $screenshotArray[$index]['name'] = $screenshotListVal;
                        $screenshotArray[$index]['path'] = $this->screenshotLocation . $screenshotListVal;
                        ++$index;
                    }

                    $list[$key]['screenshot'] = $screenshotArray;
                } else {
                    $list[$key]['screenshot'] = [];
                }

                if (isset($val['chinese']) && !empty($val['chinese'])) {
                    $list[$key]['chinese'] = json_decode($val['chinese']);
                }

                if (isset($val['english']) && !empty($val['english'])) {
                    $list[$key]['english'] = json_decode($val['english']);
                }

                if (isset($val['korean']) && !empty($val['korean'])) {
                    $list[$key]['korean'] = json_decode($val['korean']);
                }
            }

            $infoCategoryList = InfoCategory::dbTable()
                                ->orderBy('id', 'asc')
                                ->get()
                                ->toArray();

            $result = [
                'list' => $list,
                'totalCount' => $totalCount,
                'infoCategoryList' => $infoCategoryList
            ];

            Cache::forever('cache_data_info', $result);

            return $this->response->setResponseData($result)->getResponse();
        }

        public function getDetail(Request $request) {
            $this->validate($request, [

            ]);

            $infoService = new InfoService();
            $list = $infoService->getDetail($request->id);

            $result = [
                'list' => $list
            ];

            return $this->response->setResponseData($result)->getResponse();
        }

        public function createData(Request $request) {
            $this->validate($request, [

            ]);

            $data = $request->all();

            $this->checkImgFormat($data['img']);
            $this->checkImgFormat($data['img_banner']);

            $infoService = new InfoService();
            $result = $infoService->createData($data);

            return $this->response->setResponseData($result)->getResponse();
        }

        public function updateData(Request $request) {
            $this->validate($request, [

            ]);

            $data = $request->all();

            $infoService = new InfoService();
            $result = $infoService->updateData($data);

            return $this->response->setResponseData($result)->getResponse();
        }

        public function deleteData(Request $request) {
            $this->validate($request, [

            ]);

            $data = $request->all();

            $infoService = new InfoService();
            $result = $infoService->deleteData($data['id']);

            return $this->response->setResponseData($result)->getResponse();
        }
    }
?>