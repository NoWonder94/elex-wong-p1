<?php
	namespace App\Services\BoleMini;
	use App\Models\BoleMini\AdminGroup;
	use App\Models\BoleMini\AdminGroupAuthority;
	use Illuminate\Support\Facades\DB;
	use Cache;

	class AdminGroupService {
		public function createData(array $data = []) {
			$data['date_create'] = time();
			$data['date_update'] = time();

			try {
            	DB::connection()->beginTransaction();

            	$menuIdList = $data['menu'];
            	unset($data['menu']);
            	
            	//创建权限组数据
            	$adminGroup = new AdminGroup();
				$adminGroupId = $adminGroup->create($data);

				//创建权限组权限数据
            	$menuData = [];
            	$adminGroupAuthority = new AdminGroupAuthority();

            	foreach ($menuIdList as $key => $val) {
            		$menuData['admin_group_id'] = $adminGroupId;
            		$menuData['menu_id'] = $val;
            		$menuData['date_create'] = time();
            		$adminGroupAuthority->create($menuData);
            	}

				Cache::forget('cache_data_admin_group');
				DB::connection()->commit();
			} catch(\Exception $e) { 
	            DB::connection()->rollback();
	            throw $e;
	        }

	        return true;
		}

		public function updateData(array $data = []) {
			$id = $data['id'];
			$data['date_update'] = time();

			try {
            	DB::connection()->beginTransaction();

            	$menuIdList = $data['menu'];
            	unset($data['menu']);

            	//更新权限组数据
            	$adminGroup = new AdminGroup();
				$adminGroup->update($id, $data);

				//更新权限组权限数据
            	$menuData = [];
            	$adminGroupAuthority = new AdminGroupAuthority();
            	$adminGroupAuthority->deleteByGroupId($id);

            	foreach ($menuIdList as $key => $val) {
            		$menuData['admin_group_id'] = $id;
            		$menuData['menu_id'] = $val;
            		$menuData['date_create'] = time();
            		$adminGroupAuthority->create($menuData);
            	}

				Cache::forget('cache_data_admin_group');
				DB::connection()->commit();
			} catch(\Exception $e) { 
	            DB::connection()->rollback();
	            throw $e;
	        }

	        return true;
		}

		public function deleteData(int $id) {
			try {
            	DB::connection()->beginTransaction();

            	//删除权限组数据
            	$adminGroup = new AdminGroup();
				$adminGroup->delete($id);

				//删除权限组权限数据
				$adminGroupAuthority = new AdminGroupAuthority();
            	$adminGroupAuthority->deleteByGroupId($id);

            	//删除权限组管理员数据？？？
            	
				Cache::forget('cache_data_admin_group');
				DB::connection()->commit();
			} catch(\Exception $e) { 
	            DB::connection()->rollback();
	            throw $e;
	        }

	        return true;
		}
	}
?>