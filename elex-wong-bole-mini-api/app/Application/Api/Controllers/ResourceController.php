<?php
    namespace App\Application\Api\Controllers;
    use App\Application\Api\Services\ResourceService;
    use Illuminate\Http\Request;

    class ResourceController extends BaseController { 
        public function getList(Request $request) {
            $data = $request->all();
            $lang = isset($data['lang']) ? $data['lang'] : 'chi';
            $result = ResourceService::instance()->getList($lang);

            return $this->success($result);
        }
    }
?>