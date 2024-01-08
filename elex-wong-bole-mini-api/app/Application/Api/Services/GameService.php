<?php
    namespace App\Application\Api\Services;
    use App\Application\Api\Models\Game;
    use Config;

    class GameService extends BaseService {
        public function getList($gameCategoryId, $lang = 'chi') {
            $column = $this->getColumnByLang('game', $lang);

            $where = [];
            if ($gameCategoryId > 0) {
                $where[] = ['game.game_category_id', $gameCategoryId];
            }

            $queryList = Game::dbTable('game')
                            ->leftJoin('game_category', 'game_category.id', '=', 'game.game_category_id')
                            ->select(
                                'game.id',
                                'game.game_category_id',
                                'game_category.name AS game_category_name',
                                'game.icon',
                                'game.img',
                                'game.game_url',
                                'game.online_date',
                                'game.status',
                                $column . ' AS content'
                            )
                            ->where($where)
                            ->where('game.status', '!=', 0)
                            ->orderBy('game.sort', 'ASC')
                            ->orderBy('game.id', 'ASC');
            $queryTotalCount = clone $queryList;

            $list = $queryList->get()->toArray();
            $totalCount = $queryTotalCount->get()->count();

            $listNew = [];
            foreach ($list as $key => $val) {
                $listNew[$key] = (array)$val;
                $listNew[$key]['icon'] = Config::get('app.server_url') . Config::get('app.file_location.game.icon') .  $listNew[$key]['icon'];
                $listNew[$key]['img'] = Config::get('app.server_url') . Config::get('app.file_location.game.img') . $listNew[$key]['img'];
                $listNew[$key]['content'] = (array)json_decode($listNew[$key]['content']);
            }

            $result = [
                'list' => $listNew,
                'totalCount' => $totalCount
            ];

            return $result;
        }

        public function getDetail($id, $lang = 'chi') {
            $column = $this->getColumnByLang('game', $lang);

            $detail = Game::dbTable()
                        ->select(
                            'id',
                            'game_category_id',
                            'icon',
                            'img',
                            'online_date',
                            'max_win',
                            'screenshot',
                            $column . ' AS content'
                        )
                        ->where('status', '!=', 0)
                        ->where('id', $id)
                        ->get()
                        ->first();

            $detail = (array)$detail;
            $detail['icon'] = Config::get('app.server_url') . Config::get('app.file_location.game.icon') . $detail['icon'];
            $detail['img'] = Config::get('app.server_url') . Config::get('app.file_location.game.img') . $detail['img'];
            $detail['content'] = (array)json_decode($detail['content']);
            $detail['content']['fileFormat'] = (isset($detail['content']['file']) && !empty($detail['content']['file'])) ? $this->getFileFormat($detail['content']['file']) : '';
            $detail['content']['fileUrl'] = (isset($detail['content']['file']) && !empty($detail['content']['file'])) ? Config::get('app.server_url') . Config::get('app.file_location.game.file') . $detail['content']['file'] : '';
            
            $screenshotList = (array)json_decode($detail['screenshot']);
            $detail['screenshot'] = [];
            if (!empty($screenshotList)) {
                foreach ($screenshotList as $key => $val) {
                    $detail['screenshot'][$key] = Config::get('app.server_url') . Config::get('app.file_location.screenshot') . $val;
                }
            }

            return $detail;
        }
    }
?>