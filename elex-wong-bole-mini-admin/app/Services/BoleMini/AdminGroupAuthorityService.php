<?php
	namespace App\Services\BoleMini;
    use App\Models\BoleMini\AdminGroup;
	use App\Models\BoleMini\AdminGroupAuthority;
	use App\Models\BoleMini\Menu;
	use Illuminate\Support\Facades\DB;

	class AdminGroupAuthorityService {
		public function initAuthority($adminGroupId) {
            $adminGroupData = AdminGroup::dbTable()
                                            ->select('is_super')
                                            ->where('id', $adminGroupId)
                                            ->get()
                                            ->first();

            if ($adminGroupData['is_super'] == 1) {
                $menuData = Menu::dbTable()
                            ->select('id')
                            ->get()
                            ->toArray();

                $result = array_column($menuData, 'id');
            } else {
                $adminGroupAuthorityData = AdminGroupAuthority::dbTable()
                                            ->select('menu_id')
                                            ->where('admin_group_id', $adminGroupId)
                                            ->get()
                                            ->toArray();
                $result = [];

                if ($adminGroupAuthorityData) {
                    $menuIdList = array_column($adminGroupAuthorityData, 'menu_id');

                    /*
                    $menuData = Menu::dbTable()
                                ->select('code')
                                ->whereIn('id', $menuIdList)
                                ->get()
                                ->toArray();

                    foreach ($menuData as $key => $val) {
                        $array = explode('.', $val['code']);

                        if (count($array) == 2) {
                            $result[$array[0]][$array[1]] = true;
                        } elseif (count($array) == 3) {
                            $result[$array[0]][$array[1]][$array[2]] = true;
                        }
                    }
                    */

                    $menuData = Menu::dbTable()
                                ->select('parent_id')
                                ->whereIn('id', $menuIdList)
                                ->get()
                                ->toArray();

                    foreach ($menuData as $key => $val) {
                        $string = explode(',', $val['parent_id']);

                        foreach ($string as $stringKey => $stringVal) {
                            if (!in_array($stringVal, $menuIdList)) {
                                array_push($menuIdList, (int)$stringVal);
                            }
                        }
                    }

                    $result = $menuIdList;
                }
            }

            return $result;
		}

		public function getGroupMenuList($adminGroupId) {
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

            return $result;
		}
	}
?>