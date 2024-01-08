<?php
    namespace App\Application\Api\Controllers;
    use App\Application\Api\Services\GameService;
    use Illuminate\Http\Request;

    class GameController extends BaseController { 
        public function getList(Request $request) {
        	$data = $request->all();
        	$lang = isset($data['lang']) ? $data['lang'] : 'chi';
            $gameCategoryId = isset($data['gameCategoryId']) && $data['gameCategoryId'] > 0 ? $data['gameCategoryId'] : 0;
            $result = GameService::instance()->getList($gameCategoryId, $lang);

            return $this->success($result);
        }

        public function getDetail(Request $request) {
        	$this->validate($request, [
                'id' => 'required|integer|min:1'
            ]);

        	$data = $request->all();
            $id = $data['id'];
            $lang = isset($data['lang']) ? $data['lang'] : 'chi';
            $result = GameService::instance()->getDetail($id, $lang);
            
            return $this->success($result);
        }
    }
?>