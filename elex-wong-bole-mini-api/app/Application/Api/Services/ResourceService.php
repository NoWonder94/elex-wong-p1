<?php
    namespace App\Application\Api\Services;
    use App\Application\Api\Models\Resource;
    use App\Application\Api\Models\File;
    use Config;

    class ResourceService extends BaseService {
        public function getList($lang) {
            $column = $this->getColumnByLang('directory', $lang);

            $queryList = Resource::dbTable()
                            ->select(
                                'id',
                                'img',
                                $column . ' AS name'
                            )
                            ->where('status', 1)
                            ->orderBy('sort', 'ASC')
                            ->orderBy('id', 'ASC');
            $queryTotalCount = clone $queryList;

            $list = $queryList->get()->toArray();
            $totalCount = $queryTotalCount->get()->count();

            $listNew = [];
            foreach ($list as $key => $val) {
                $val->img = Config::get('app.server_url') . Config::get('app.file_location.directory') . $val->img;
                $listNew[$val->id] = (array)$val;
                $listNew[$val->id]['content'] = [];
            }

            $lang_id = 1;
            switch ($lang) {
                case 'chi':
                    $lang_id = 1;
                    break;
                case 'eng':
                    $lang_id = 2;
                    break;
                case 'kr':
                    $lang_id = 3;
                    break;
                default:
                    $lang_id = 1;
                    break;
            }

            $resourceIds = array_column($list, 'id');
            $fileList = File::dbTable()
                        ->select(
                            'directory_id',
                            'name',
                            'file',
                            'file_format'
                        )
                        ->whereIn('directory_id', $resourceIds)
                        ->where('lang_id', $lang_id)
                        ->where('status', 1)
                        ->get()
                        ->toArray();

            foreach ($fileList as $key => $val) {
                $val->file = Config::get('app.server_url') . Config::get('app.file_location.file') . $val->file;
                $listNew[$val->directory_id]['content'][] = (array)$val;
            }

            $result = [
                'list' => array_values($listNew),
                'totalCount' => $totalCount
            ];

            return $result;
        }
    }
?>