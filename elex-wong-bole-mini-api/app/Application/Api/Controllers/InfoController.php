<?php
    namespace App\Application\Api\Controllers;
    use App\Application\Api\Services\InfoService;
    use Illuminate\Http\Request;

    class InfoController extends BaseController { 
        public function getList(Request $request) {
        	$data = $request->all();
            $categoryId = isset($data['categoryId']) && $data['categoryId'] > 0 ? $data['categoryId'] : 0;
            $page = isset($data['page']) ? $data['page'] : 1;
            $pageSize = isset($data['pageSize']) ? $data['pageSize'] : 5;
            $lang = isset($data['lang']) ? $data['lang'] : 'chi';
            $result = InfoService::instance()->getList($categoryId, $page, $pageSize, $lang);

            return $this->success($result);
        }

        public function getDetail(Request $request) {
        	$this->validate($request, [
                'id' => 'required|integer|min:1'
            ]);

            $data = $request->all();
            $id = $data['id'];
            $lang = isset($data['lang']) ? $data['lang'] : 'chi';
            $result = InfoService::instance()->getDetail($id, $lang);
            
            return $this->success($result);
        }
    }
?>