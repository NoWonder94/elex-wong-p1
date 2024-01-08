<?php
namespace App\Application\Site\Api\Controllers;

use App\Services\Site\GamePlatformService;
use App\Application\Site\Api\Services\GamePlatformService as SiteGamePlatformService;
use App\Application\Site\Api\Services\GameService;
use Request;

class GameController extends BaseController {
	public function platforms() {
		$data = SiteGamePlatformService::instance()->all();
		$this->success($data);
	}
	
    public function search() {
        $platform_code = trim(Request::get('platform_code'));
        $cate_id = (int)Request::get('cate_id');
        $keyword = trim(Request::get('keyword'));
        $page = max(1, (int)Request::get('page'));

        $data = GameService::instance()->search($this->token['client'], $platform_code, $cate_id, $keyword, '', $page);
        $this->success($data);
    }

    public function bets() {
        if (!$this->user) {
            $this->success([]);
        }

        $result = GameService::instance()->bets(
            $this->userId, 
            $this->request('begin_time', ''), 
            $this->request('end_time', ''), 
            trim(Request::get('platform')),
            trim(Request::get('game_name')),
            (int)Request::get('page')
        );
        $this->success($result);
    }

    public function play() {
        $id       = (int)Request::get('id');
        $platform = trim(Request::get('platform'));
        $is_demo  = (int)Request::get('is_demo');
        if ($id < 1 && empty($platform)) {
            $this->throwException('common.game.not_exist');
        }

        if ($is_demo != 1 && !$this->user) {
            $this->success('');
        }

        $result = GameService::instance()->play($this->token['client'], $this->user, $id, $platform, $is_demo);
        $this->success($result);
    }

    public function balance() {
        if (!$this->user) {
            $this->success(0);
        }

        $platform = trim(Request::get('platform'));
        if (empty($platform)) {
            $this->success(0);
        }
        
        $data = GamePlatformService::instance()->getBalance($this->userId, $platform);
        $this->success($data);
    }
    
    public function hot() {
        $data = GameService::instance()->search($this->token['client'], '', 0, '', 'hot', 1, 20, false);
        $this->success($data);
    }
    
    public function recommend() {
        $data = GameService::instance()->search($this->token['client'], '', 0, '', 'recommend', 1, 20, false);
        $this->success($data);
    }
    
    public function played() {
        if (!$this->user) {
            $this->success([]);
        }
        $data = GameService::instance()->played($this->token['client'], $this->userId);
        $this->success($data);
    }
    
    public function collection() {
        if (!$this->user) {
            $this->success([]);
        }
        $data = GameService::instance()->collection($this->token['client'], $this->userId);
        $this->success($data);
    }
    
    public function addcollection() {
        $id = (int)Request::get('id');
        if (!$this->user || $id < 1) {
            $this->success();
        }
        GameService::instance()->addCollection($this->userId, $id);
        $this->success();
    }
    
    public function removecollection() {
        $id = (int)Request::get('id');
        if (!$this->user || $id < 1) {
            $this->success();
        }
        GameService::instance()->removeCollection($this->userId, $id);
        $this->success();
    }
}