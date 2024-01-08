<?php
    namespace App\Application\Api\Controllers;
    use App\Application\Api\Services\FileService;
    use Request;

    class FileController extends BaseController { 
        public function getList(Request $request) {
            $result = FileService::instance()->getList();

            return $this->success($result);
        }
    }
?>