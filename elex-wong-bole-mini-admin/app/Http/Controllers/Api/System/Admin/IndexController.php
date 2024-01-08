<?php
    namespace App\Http\Controllers\Api\System\Admin;
    use App\Http\Controllers\Api\Controller;
    use App\Services\BoleMini\AdminService;
    use App\Services\BoleMini\AdminGroupAuthorityService;
    use App\Models\BoleMini\Admin;
    use App\Models\BoleMini\AdminGroup;
    use App\Models\BoleMini\AdminGroupAuthority;
    use Illuminate\Http\Request;
    use Cache;
    
    class IndexController extends Controller {
        public function signIn(Request $request) {
            $this->validate($request, [
                'name' => 'required|string|min:6',
                'pwd' => 'required|string|min:6'
            ]);

            $adminService = new AdminService();
            $result = $adminService->verifyAdmin($request->post('name'), $request->post('pwd'));
            $adminService->synSessionData($this->identity(), $result);
            $adminService->synCookieData($this->identity());
            $this->identity()->deleteAuthorityData();
            
            return $this->response->getResponse();
        }

        public function initAuthority() {
            $list = $this->identity()->hasAuthorityData();

            if (!$list) {
                $adminGroupId = $this->identity()->getAdminGroupId();
                $service = new AdminGroupAuthorityService();
                $list = $service->initAuthority($adminGroupId);
                $this->identity()->setAuthorityData($list);
            }
            
            $result = [
                'list' => $list
            ];

            return $this->response->setResponseData($result)->getResponse();
        }

        public function updatePersonalData(Request $request) {
            $this->validate($request, [
                'name' => 'required|string|min:6',
                'pwd' => 'required|string|min:6'
            ]);

            $data = $request->all();
            $data['id'] = $this->identity()->getUserId();

            $adminService = new AdminService();
            $result = $adminService->updateData($data);

            return $this->response->setResponseData($result)->getResponse();
        }

        public function getList() {
            $cacheData = Cache::get('cache_data_admin');

            if ($cacheData) {
                //return $this->response->setResponseData($cacheData)->getResponse();
            }

            $queryList = Admin::dbTable('admin')
                                ->select($this->selectFieldsByList())
                                ->leftJoin(AdminGroup::TABLENAME.' AS adminGroup', function($join) {
                                    $join->on('adminGroup.id', '=', 'admin.admin_group_id');
                                })
                                ->orderBy('id', 'desc');
            $queryCount = clone $queryList;

            $list = $queryList->get()->toArray();
            $totalCount = $queryCount->count();

            $adminGroupList = AdminGroup::dbTable()
                                            ->where('status', '=', 1)
                                            ->orderBy('id', 'desc')
                                            ->get()
                                            ->toArray();

            $result = [
                'list' => $list,
                'totalCount' => $totalCount,
                'adminGroupList' => $adminGroupList
            ];

            Cache::forever('cache_data_admin', $result);

            return $this->response->setResponseData($result)->getResponse();
        }

        public function createData(Request $request) {
            $this->validate($request, [
                'name' => 'required|string|min:6',
                'pwd' => 'required|string|min:6',
                'admin_group_id' => 'required|integer|min:1',
                'status' => 'required|integer|between:0,1'
            ]);

            $adminService = new AdminService();
            $result = $adminService->createData($request->all());

            return $this->response->setResponseData($result)->getResponse();
        }

        public function updateData(Request $request) {
            $this->validate($request, [
                'id' => 'required|integer|min:1',
                'name' => 'required|string|min:6',
                'admin_group_id' => 'required|integer|min:1',
                'status' => 'required|integer|between:0,1'
            ]);

            $adminService = new AdminService();
            $result = $adminService->updateData($request->all());

            return $this->response->setResponseData($result)->getResponse();
        }

        public function deleteData(Request $request) {
            $this->validate($request, [
                'id' => 'required|integer|min:1'
            ]);
            
            $adminService = new AdminService();
            $result = $adminService->deleteData($request->post('id'));

            return $this->response->setResponseData($result)->getResponse();
        }

        public function selectFieldsByList() {
            return [
                'admin.id',
                'admin.name',
                'admin.admin_group_id',
                'adminGroup.name AS admin_group_name',
                'admin.date_create',
                'admin.date_login',
                'admin.ip_login',
                'admin.count_login',
                'admin.status'
            ];
        }
    }
?>