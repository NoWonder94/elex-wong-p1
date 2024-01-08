<?php
    namespace App\Http\Controllers\Api\System\AdminGroup;
    use App\Http\Controllers\Api\Controller;
    use App\Services\BoleMini\AdminGroupService;
    use App\Models\BoleMini\AdminGroup;
    use App\Models\BoleMini\AdminGroupAuthority;
    use App\Models\BoleMini\Menu;
    use Illuminate\Http\Request;
    use Cache;

    class IndexController extends Controller {
        public function getList() {
            $cacheData = Cache::get('cache_data_admin_group');

            if ($cacheData) {
                return $this->response->setResponseData($cacheData)->getResponse();
            }

            $queryList = AdminGroup::dbTable()
                            ->select($this->selectFieldsByList())
                            ->where('is_super', '!=', 1)
                            ->orderBy('id', 'desc');
            $queryCount = clone $queryList;

            $list = $queryList->get()->toArray();
            $totalCount = $queryCount->count();

            //获取菜单列表
            $menuList = $this->getMenuList();

            $result = [
                'list' => $list,
                'totalCount' => $totalCount,
                'menuList' => $menuList
            ];

            Cache::forever('cache_data_admin_group', $result);

            return $this->response->setResponseData($result)->getResponse();
        }

        public function getMenuList() {
            $cacheData = Cache::get('cache_data_menu');

            if ($cacheData) {
                return $cacheData;
            }

            $menuList = Menu::dbTable()
                        ->orderBy('id', 'asc')
                        ->get()
                        ->toArray();

            $menuListNew1 = [];
            $menuListNew2 = [];

            if ($menuList) {
                foreach ($menuList as $key => $val) {
                    $array1 = [];
                    $array1['id'] = $val['id'];
                    $array1['label'] = $val['name'];
                    $array1['has_child'] = $val['has_child'];

                    if ($val['has_child'] == 1 && $val['parent_id'] == 0) {
                        $menuListNew1[$val['id']] = $array1;
                    } elseif ($val['has_child'] == 1 && $val['parent_id'] != 0) {
                        $menuListNew1[$val['parent_id']]['children'][$val['id']] = $array1;
                    } elseif ($val['has_child'] == 0 && $val['parent_id'] != 0) {
                        $array2 = explode(',', $val['parent_id']);
                        $count = count($array2);

                        if ($count == 1) {
                            $menuListNew1[$array2[0]]['children'][] = $array1;
                        } elseif ($count == 2) {
                            $menuListNew1[$array2[0]]['children'][$array2[1]]['children'][] = $array1;
                        }
                    }
                }

                //中和VueJS的"Expected Array, got Object"错误
                $array3 = [];
                $array3['id'] = 0;
                $array3['label'] = '全部';
                $array3['has_child'] = 1;
                $array3['children'] = [];
                $i = 0;

                foreach ($menuListNew1 as $key1 => $val1) {
                    $array3['children'][$i]['id'] = $val1['id'];
                    $array3['children'][$i]['label'] = $val1['label'];
                    $array3['children'][$i]['has_child'] = $val1['has_child'];

                    if (isset($val1['children'])) {
                        foreach ($val1['children'] as $key2 => $val2) {
                            $array3['children'][$i]['children'][] = $val2;
                        }
                    }

                    $i++;
                }

                $menuListNew2[] = $array3;
                //中和VueJS的"Expected Array, got Object"错误
            }

            Cache::forever('cache_data_menu', $menuListNew2);

            return $menuListNew2;
        }

        public function getGroupMenuList(Request $request) {
            $this->validate($request, [
                'group_id' => 'required|integer|min:1'
            ]);

            $adminGroupId = $request->group_id;

            $queryList = AdminGroupAuthority::dbTable()
                            ->select('menu_id')
                            ->where('admin_group_id', $adminGroupId)
                            ->get()
                            ->toArray();
            $result = [];

            if ($queryList) {
                $result = [
                    'list' => array_column($queryList, 'menu_id')
                ];
            }
            
            return $this->response->setResponseData($result)->getResponse();
        }

        public function createData(Request $request) {
            $this->validate($request, [
                'name' => 'required|string|min:1',
                'status' => 'required|integer|between:0,1',
                'menu' => 'required|array'
            ]);

            $adminGroupService = new AdminGroupService();
            $result = $adminGroupService->createData($request->all());

            return $this->response->setResponseData($result)->getResponse();
        }

        public function updateData(Request $request) {
            /*
            $this->validate($request, [
                'id' => 'required|integer|min:1',
                'name' => 'required|string|min:1',
                'status' => 'required|integer|between:0,1',
                'menu' => 'required|array'
            ]);
            */
            
            $adminGroupService = new AdminGroupService();
            $result = $adminGroupService->updateData($request->all());

            return $this->response->setResponseData($result)->getResponse();
        }

        public function deleteData(Request $request) {
            $this->validate($request, [
                'id' => 'required|integer|min:1'
            ]);
            
            $adminGroupService = new AdminGroupService();
            $result = $adminGroupService->deleteData($request->post('id'));

            return $this->response->setResponseData($result)->getResponse();
        }

        public function selectFieldsByList() {
            return [
                'id',
                'name',
                'is_super',
                'status',
                'date_create',
                'date_update'
            ];
        }
    }
?>