<?php
    namespace App\Http\Controllers\Api\Resource\File;
    use App\Http\Controllers\Api\BaseController;
    use App\Services\BoleMini\FileService;
    use App\Models\BoleMini\File;
    use App\Models\BoleMini\Directory;
    use App\Models\BoleMini\Lang;
    use App\Exceptions\Response\Service\ServiceException;
    use App\Exceptions\Response\Service\ServiceCode;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Storage;
    use Cache;
    
    class IndexController extends BaseController {
        private $imgUrl = '/img/bole_mini/upload/file/';

        public function getList() {
            $cacheData = Cache::get('cache_data_file');

            if ($cacheData) {
                //return $this->response->setResponseData($cacheData)->getResponse();
            }

            $queryList = File::dbTable('file')
                                ->select(
                                    'file.id',
                                    'file.directory_id',
                                    'directory.chinese AS directory_name',
                                    'file.lang_id',
                                    'lang.name AS lang_name',
                                    'file.name',
                                    'file.file',
                                    'file.file_format',
                                    'file.status',
                                    'file.date_create',
                                    'file.date_update'
                                )
                                ->leftJoin(Directory::TABLENAME.' AS directory', function($join) {
                                    $join->on('directory.id', '=', 'file.directory_id');
                                })
                                ->leftJoin(Lang::TABLENAME.' AS lang', function($join) {
                                    $join->on('lang.id', '=', 'file.lang_id');
                                })
                                ->orderBy('id', 'desc');
            $queryCount = clone $queryList;

            $list = $queryList->get()->toArray();
            $totalCount = $queryCount->count();

            foreach ($list as $key => $val) {
                if (isset($val['file']) && !empty($val['file'])) {
                    $list[$key]['file'] = $this->imgUrl.$val['file'];
                }
            }

            $directoryList = Directory::dbTable()
                                        ->select(
                                            'id',
                                            'chinese AS name'
                                        )
                                        ->where('status', '=', 1)
                                        ->orderBy('id', 'asc')
                                        ->get()
                                        ->toArray();

            $langList = Lang::dbTable()
                        ->select('id', 'name')
                        ->get()
                        ->toArray();

            $result = [
                'list' => $list,
                'totalCount' => $totalCount,
                'directoryList' => $directoryList,
                'langList' => $langList
            ];

            Cache::forever('cache_data_file', $result);

            return $this->response->setResponseData($result)->getResponse();
        }

        public function createData(Request $request) {
            /*
            $this->validate($request, [
                'file' => 'required',
                'name' => 'required|string|min:1',
                'directory_id' => 'required|integer|min:1',
                'status' => 'required|integer|between:0,1'
            ]);
            */

            $data = json_decode($request->form, true);
            $file = $request->file;

            $fileService = new FileService();
            $result = $fileService->createData($data, $file);

            return $this->response->setResponseData($result)->getResponse();
        }

        public function updateData(Request $request) {
            /*
            $this->validate($request, [
                'id' => 'required|integer|min:1',
                'name' => 'required|string|min:1',
                'directory_id' => 'required|integer|min:1',
                'status' => 'required|integer|between:0,1'
            ]);
            */

            $data = json_decode($request->form, true);
            $file = $request->file;

            $fileService = new FileService();
            $result = $fileService->updateData($data, $file);

            return $this->response->setResponseData($result)->getResponse();
        }

        public function deleteData(Request $request) {
            /*
            $this->validate($request, [
                'id' => 'required|integer|min:1'
            ]);
            */

            $data = json_decode($request->form, true);

            if (!isset($data['id']) && $data['id'] <= 0) {
                throw new ServiceException(ServiceCode::ERROR_ID_REQUIRE);
            }

            $fileService = new FileService();
            $result = $fileService->deleteData($data['id']);

            return $this->response->setResponseData($result)->getResponse();
        }
    }
?>