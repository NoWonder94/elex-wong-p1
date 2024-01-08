<?php 
namespace App\Application\Site\Api\Services;

use App\Application\Site\Api\Models\Game;
use App\Application\Site\Api\Models\UserGameBet;
use App\Application\Site\Api\Models\UserGameWin;
use App\Models\Site\UserGameStatistic;
use App\Models\Site\UserGameCollection;
use App\Services\Site\UserGameService;
use App\Services\Site\GamePlatformService;
use Time;

class GameService extends BaseService {
    /**
     * [search description]
     * @param  string      $client       客户端类型
     * @param  string      $platformCode 游戏平台代码
     * @param  int         $cateId       分类编号
     * @param  string      $keyword      搜索的关键字
     * @param  int         $page         页码
     * @param  int|integer $pageSize     分页大小
     * @return [Game]                 
     */
    public function search(string $client, string $platformCode, int $cateId, string $keyword, string $type, int $page, int $pageSize = 20, bool $isPage = true) {
        $list = Game::with('statistic')
                    ->where('status', 1)
                    ->orderBy('sort', 'ASC')
                    ->orderBy('id', 'DESC');

        if (in_array($client, CLIENT_MOBILE_TYPES)) {
            $list->where('is_html5', 1);
        } else {
            $list->where('is_flash', 1);
        }

        if (!empty($platformCode)) {
            $list->where('game_platform_code', $platformCode);
        }

        if ($cateId > 0) {
            $list->whereRaw("FIND_IN_SET({$cateId}, game_cates)");
        }

        if (!empty($keyword)) {
            $list->where('name', 'like', '%' . $keyword . '%');
        }

        if (!empty($type)) {
            switch ($type) {
                case 'new':
                    $list->where('is_new', 1);
                    break;
                
                case 'hot':
                    $list->where('is_hot', 1);
                    break;

                case 'recommend':
                    $list->where('is_recommend', 1);
                    break;
            }
        }
        
        $page = max(0, $page - 1);
        $offset = $page * $pageSize;
        
        if ($isPage) {
            $count = $list->count();
            $list = $list->offset($offset)->limit($pageSize)->get();
            return ['count' => $count, 'list' => $list];
        } else {
            return $list->offset($offset)->limit($pageSize)->get();
        }
    }

    public function bets(int $userId, string $beginTime, string $endTime, string $platform, string $goodsName, int $page = 1, int $pageSize = 20) {

        $list = UserGameBet::with('platform')->where('user_id', $userId)->orderBy('create_time', 'DESC');

        $beginTime = Time::toTime($beginTime);
        $endTime   = Time::toTime($endTime);

        if ($beginTime > 0) {
            $list->where('create_time', '>=', $beginTime);
        }

        if ($endTime > 0) {
            $list->where('create_time', '<', $endTime + 86400);
        }

        if (!empty($platform)) {
            $list->where('game_platform_code', $platform);
        }

        if (!empty($goodsName)) {
            $list->where('game_name', 'like', '%' . $goodsName . '%');
        }

        $max_count = 10000;
        $count = $list->count();
        
        if ($count > $max_count) {
            $count = $max_count;
        }

        $page = max(0, $page - 1);
        $offset = $page * $pageSize;
        if ($offset + $pageSize > $max_count) {
            $offset = $max_count - $pageSize;
        }

        $list = $list->offset($offset)->limit($pageSize)->get();
        return ['count' => $count, 'list' => $list];

    }

    public function played(string $client, int $userId) {
        $list = Game::with('statistic')
                    ->select('game.*')
                    ->where('game.status', 1);

        if (in_array($client, CLIENT_MOBILE_TYPES)) {
            $list->where('game.is_html5', 1);
        } else {
            $list->where('game.is_flash', 1);
        }
        return $list->join('user_game_statistic', function($join) use ($userId) {
                        $join->on('user_game_statistic.game_id', '=', 'game.id')
                             ->where('user_game_statistic.user_id', '=', $userId);
                    })
                    ->orderBy('user_game_statistic.play_time', 'DESC')
                    ->orderBy('game.sort', 'ASC')
                    ->orderBy('game.id', 'DESC')
                    ->offset(0)
                    ->limit(20) 
                    ->get();
    }

    public function collection(string $client, int $userId) {
        $list = Game::with('statistic')
                    ->select('game.*')
                    ->where('game.status', 1);

        if (in_array($client, CLIENT_MOBILE_TYPES)) {
            $list->where('game.is_html5', 1);
        } else {
            $list->where('game.is_flash', 1);
        }
        return $list->join('user_game_collection', function($join) use ($userId) {
                        $join->on('user_game_collection.game_id', '=', 'game.id')
                             ->where('user_game_collection.user_id', '=', $userId);
                    })
                    ->orderBy('user_game_collection.update_time', 'DESC')
                    ->orderBy('game.sort', 'ASC')
                    ->orderBy('game.id', 'DESC')
                    ->offset(0)
                    ->limit(20) 
                    ->get();
    }
    
    public function addCollection(int $userId, int $id) {
        $data = UserGameCollection::where('user_id', $userId)
                                  ->where('game_id', $id)
                                  ->first();
        if (!$data) {
            $data = new UserGameCollection;
            $data->user_id = $userId;
            $data->game_id = $id;
        }
        $data->update_time = UTC_TIME;
        $data->save();
    }
    
    public function removeCollection(int $userId, int $id) {
        UserGameCollection::where('user_id', $userId)
                          ->where('game_id', $id)
                          ->delete();
    }

    public function play(string $client, $user, int $gameId, $platform, int $isDemo) {
        $user_game = null;

        if ($gameId > 0) {
            $game = Game::where('id', $gameId)
                    ->where('status', 1)
                    ->first();
            if (!$game) {
                $this->throwException('common.game.not_exist');
            }

            if ($client == 'pc' && $game->is_flash != 1) {
                $this->throwException('common.game.not_support_client');
            } elseif (in_array($client, CLIENT_MOBILE_TYPES) && $game->is_html5 != 1) {
                $this->throwException('common.game.not_support_client');
            }

            $platform_lib = GamePlatformService::instance()->getEnablePlatformByCode($game->game_platform_code);
            if ($isDemo != 1) {
                $user_game = UserGameService::instance()->getUserGame($user->id, $game->game_platform_code);
                if (!$user_game) {
                    $this->throwException('common.game.platform_not_reg');
                }
            }

            return $platform_lib->getPlay($client, $user, $user_game, $game, $isDemo);
        } else {
            $platform_lib = GamePlatformService::instance()->getEnablePlatformByCode($platform);

            if ($isDemo != 1) {
                $user_game = UserGameService::instance()->getUserGame($user->id, $platform);
                if (!$user_game) {
                    $this->throwException('common.game.platform_not_reg');
                }
            }

            return $platform_lib->getPlay($client, $user, $user_game, $game, $isDemo);
        }
        
    }

    public function getWins($client, $size = 20) {
        $query = UserGameWin::orderBy('win_time', 'DESC');
        if (in_array($client, CLIENT_MOBILE_TYPES)) {
            $query->where('client', 'mobile');
        } else {
            $query->where('client', 'pc');
        }
        return $query->offset(0)
                     ->limit($size) 
                     ->get();
    }
}