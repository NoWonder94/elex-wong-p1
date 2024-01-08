<?php
    namespace App\Http\Controllers\Api\Game;
    use App\Http\Controllers\Api\BaseController;
    use App\Services\BoleMini\GameService;
    use App\Models\BoleMini\Game;
    use App\Models\BoleMini\GameCategory;
    use App\Exceptions\Response\Service\ServiceException;
    use App\Exceptions\Response\Service\ServiceCode;
    use Illuminate\Http\Request;
    use Cache;

    class IndexController extends BaseController {
        private $iconUrl = '/img/bole_mini/upload/game/icon/';
        private $imgUrl = '/img/bole_mini/upload/game/img/';
        private $fileUrl = '/img/bole_mini/upload/game/file/';
        private $screenshotLocation = '/img/bole_mini/upload/screenshot/game/';

        public function getList() {
            $cacheData = Cache::get('cache_data_game');

            if ($cacheData) {
                //return $this->response->setResponseData($cacheData)->getResponse();
            }

            //获取游戏数据
            $queryList = Game::dbTable('game')
                            ->select(
                                'game.id',
                                'game.game_category_id',
                                'gameCategory.name AS game_category_name',
                                'game.icon',
                                'game.img',
                                'game.game_url',
                                'game.online_date',
                                'game.screenshot',
                                'game.max_win',
                                'game.chinese',
                                'game.english',
                                'game.korean',
                                'game.sort',
                                'game.status',
                                'game.date_create',
                                'game.date_update'
                            )
                            ->leftJoin(GameCategory::TABLENAME.' AS gameCategory', function($join) {
                                $join->on('gameCategory.id', '=', 'game.game_category_id');
                            })
                            ->orderBy('game.id', 'desc');
            $queryCount = clone $queryList;

            $list = $queryList->get()->toArray();
            $totalCount = $queryCount->count();

            foreach ($list as $key => $val) {
                if (isset($val['icon']) && !empty($val['icon'])) {
                    $list[$key]['icon'] = $this->iconUrl.$val['icon'];
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

            //获取游戏类型数据
            $gameCategoryList = $this->getGameCategoryList();

            $result = [
                'list' => $list,
                'totalCount' => $totalCount,
                'gameCategoryList' => $gameCategoryList
            ];

            Cache::forever('cache_data_game', $result);

            return $this->response->setResponseData($result)->getResponse();
        }

        public function getDetail(Request $request) {
            $this->validate($request, [

            ]);

            $gameService = new GameService();
            $list = $gameService->getDetail($request->id);

            $result = [
                'list' => $list
            ];

            return $this->response->setResponseData($result)->getResponse();
        }

        public function createData(Request $request) {
            $this->validate($request, [

            ]);

            $data = json_decode($request->form, true);
            $fileChinese = $request->fileChinese;
            $fileEnglish = $request->fileEnglish;
            $fileKorean = $request->fileKorean;

            $this->checkImgFormat($data['icon']);
            $this->checkImgFormat($data['img']);

            $gameService = new GameService();
            $result = $gameService->createData($data, $fileChinese, $fileEnglish, $fileKorean);

            return $this->response->setResponseData($result)->getResponse();
        }

        public function updateData(Request $request) {
            $this->validate($request, [

            ]);

            $data = json_decode($request->form, true);
            $fileChinese = $request->fileChinese;
            $fileEnglish = $request->fileEnglish;
            $fileKorean = $request->fileKorean;

            $gameService = new GameService();
            $result = $gameService->updateData($data, $fileChinese, $fileEnglish, $fileKorean);

            return $this->response->setResponseData($result)->getResponse();
        }

        public function deleteData(Request $request) {
            $this->validate($request, [

            ]);

            $data = json_decode($request->form, true);

            if (!isset($data['id']) && $data['id'] <= 0) {
                throw new ServiceException(ServiceCode::ERROR_ID_REQUIRE);
            }

            $gameService = new GameService();
            $result = $gameService->deleteData($data['id']);

            return $this->response->setResponseData($result)->getResponse();
        }

        public function getGameCategoryList() {
            $cacheData = Cache::get('cache_data_game_category');

            if ($cacheData) {
                return $cacheData;
            }

            $result = GameCategory::dbTable()
                        ->get()
                        ->toArray();

            Cache::forever('cache_data_game_category', $result);

            return $result;
        }
    }
?>