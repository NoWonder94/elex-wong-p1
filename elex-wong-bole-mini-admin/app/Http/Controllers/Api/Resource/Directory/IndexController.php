<?php
    namespace App\Http\Controllers\Api\Resource\Directory;
    use App\Http\Controllers\Api\BaseController;
    use App\Services\BoleMini\DirectoryService;
    use App\Models\BoleMini\Directory;
    use App\Exceptions\Response\Service\ServiceException;
    use App\Exceptions\Response\Service\ServiceCode;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Storage;
    use Cache;
    
    class IndexController extends BaseController {
        private $imgUrl = '/img/bole_mini/upload/directory/';

        public function getList() {
            $cacheData = Cache::get('cache_data_directory');

            if ($cacheData) {
                //return $this->response->setResponseData($cacheData)->getResponse();
            }

            $queryList = Directory::dbTable()
                                ->select(
                                    'id',
                                    'chinese',
                                    'english',
                                    'korean',
                                    'img',
                                    'sort',
                                    'status',
                                    'date_create',
                                    'date_update'
                                )
                                ->orderBy('sort', 'asc');
            $queryCount = clone $queryList;

            $list = $queryList->get()->toArray();
            $totalCount = $queryCount->count();

            foreach ($list as $key => $val) {
                if (isset($val['img']) && !empty($val['img'])) {
                    $list[$key]['img'] = $this->imgUrl.$val['img'];
                }
            }

            $result = [
                'list' => $list,
                'totalCount' => $totalCount
            ];

            Cache::forever('cache_data_directory', $result);

            return $this->response->setResponseData($result)->getResponse();
        }

        public function createData(Request $request) {
            $this->validate($request, [
                //'name' => 'required|string|min:1',
                //'img' => 'required',
                //'sort' => 'required|integer|min:1',
                'status' => 'required|integer|between:0,1'
            ]);

            $data = $request->all();

            $this->checkImgFormat($data['img']);

            $directoryService = new DirectoryService();
            $result = $directoryService->createData($data);

            return $this->response->setResponseData('abc')->getResponse();
        }

        public function updateData(Request $request) {
            $this->validate($request, [
                'id' => 'required|integer|min:1',
                //'name' => 'required|string|min:1',
                //'img' => 'required',
                //'sort' => 'required|integer|min:1',
                'status' => 'required|integer|between:0,1'
            ]);

            $data = $request->all();

            $directoryService = new DirectoryService();
            $result = $directoryService->updateData($data);

            return $this->response->setResponseData($result)->getResponse();
        }

        public function deleteData(Request $request) {
            $this->validate($request, [
                'id' => 'required|integer|min:1'
            ]);

            $data = $request->all();

            $directoryService = new DirectoryService();
            $result = $directoryService->deleteData($data['id']);

            return $this->response->setResponseData($result)->getResponse();
        }
    }
?>